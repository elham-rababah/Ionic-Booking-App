import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";
import {
  ModalController,
  ActionSheetController,
  AlertController
} from "@ionic/angular";
import { MapModalComponent } from "../../map-modal/map-modal.component";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../../../environments/environment";
import { map, switchMap } from "rxjs/operators";
import { PlaceLocation, Coordinates } from "src/app/places/location.model";
import { of } from "rxjs";
import { Plugins, Capacitor } from "@capacitor/core";
@Component({
  selector: "app-location-piker",
  templateUrl: "./location-piker.component.html",
  styleUrls: ["./location-piker.component.scss"]
})
export class LocationPikerComponent implements OnInit {
  @Output() pickedLocationEvent: any = new EventEmitter<PlaceLocation>();
  selectedLocationUrl: string;
  isLoading = false;
  @Input() showPreview = false;

  constructor(
    private modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private http: HttpClient,
    public alertController: AlertController
  ) {}

  ngOnInit() {}
  onPickLocation() {
    this.actionSheetController
      .create({
        header: "Please Choose",
        buttons: [
          {
            text: "Auto-Locate",
            handler: () => {
              this.locateUser();
            }
          },
          {
            text: "Pick On Map",
            handler: () => {
              this.openMap();
            }
          },
          { text: "Cancel", role: "cancel" }
        ]
      })
      .then(actionEle => {
        actionEle.onDidDismiss().then(() => {
          this.isLoading = false;
        });
        actionEle.present();
      });
  }

  private openMap() {
    this.modalController.create({ component: MapModalComponent }).then(ele => {
      ele.onDidDismiss().then(result => {
        if (!result.data) {
          return;
        }

        const coordinates: Coordinates = {
          lat: result.data.lat,
          lng: result.data.lng
        };
        this.createPlace(coordinates.lat, coordinates.lng);
      });
      ele.present();
    });
  }

  private locateUser() {
    //Geolocation
    if (!Capacitor.isPluginAvailable("Geolocation")) {
      this.showError();
      return;
    }
    Plugins.Geolocation.getCurrentPosition()
      .then(position => {
        const coordinates: Coordinates = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        this.createPlace(coordinates.lat, coordinates.lng);
        // this.isLoading = false;
      })
      .catch(() => {
        this.showError();
      });
  }

  private createPlace(lat, lng) {
    const pickedLocation: PlaceLocation = {
      lat: lat,
      lng: lng,
      address: null,
      staticMapImageUrl: null
    };
    this.getAddress(lat, lng)
      .pipe(
        switchMap((address: any) => {
          pickedLocation.address = address;
          return of(
            this.getMapImage(pickedLocation.lat, pickedLocation.lng, 14)
          );
        })
      )
      .subscribe(staticUrl => {
        this.isLoading = false;
        pickedLocation.staticMapImageUrl = staticUrl;
        this.selectedLocationUrl = staticUrl;
        console.log(pickedLocation);
        this.pickedLocationEvent.emit(pickedLocation);
      });
  }

  showError() {
    this.alertController
      .create({
        header: "Could not fetch Location",
        message: "Please use the map to pick the the location ",
        buttons: ["Okay"]
      })
      .then(ele => {
        this.isLoading = false;
        ele.present();
      });
  }

  private getAddress(lat, lng) {
    return this.http
      .get<any>(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${environment.googleMapKey}`
      )
      .pipe(
        map(geoData => {
          console.log(geoData);
          if (!geoData || !geoData.results || geoData.results.length === 0) {
            return null;
          }
          return geoData.results[0].formatted_address;
        })
      );
  }
  private getMapImage(lat, lng, zoom) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=${zoom}&size=600x300&maptype=roadmap&markers=color:red%7Clabel:C%${lat},${lng}
    &key=${environment.googleMapKey}`;
  }
}
