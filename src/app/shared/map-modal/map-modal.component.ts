import {
  Component,
  ElementRef,
  OnInit,
  Renderer2,
  ViewChild,
  OnDestroy,
  Input
} from "@angular/core";
import { ModalController } from "@ionic/angular";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-map-modal",
  templateUrl: "./map-modal.component.html",
  styleUrls: ["./map-modal.component.scss"]
})
export class MapModalComponent implements OnInit, OnDestroy {
  googleMaps: any;
  clickListener: any;
  @Input() center = { lat: 32.01409939578494, lng: 35.9373713497273 };
  @Input() selectable = true;
  @Input() closeButtonText = "Cancel";
  @Input() title = "Select Location";
  constructor(
    private modalController: ModalController,
    private renderer2: Renderer2
  ) {}
  @ViewChild("map", { static: false }) mapRef: ElementRef;
  ngOnInit() {}
  onCancel() {
    this.modalController.dismiss();
  }
  ngAfterViewInit(): void {
    this.getGoogleMap()
      .then(googleMaps => {
        this.googleMaps = googleMaps;
        const mapEle = this.mapRef.nativeElement;
        const map = new googleMaps.Map(mapEle, {
          center: this.center,
          zoom: 16
        });
        googleMaps.event.addListenerOnce(map, "idle", () => {
          this.renderer2.addClass(mapEle, "visible");
        });

        if (this.selectable) {
          this.clickListener = map.addListener("click", event => {
            console.log(event);
            const selectCoords = {
              lat: event.latLng.lat(),
              lng: event.latLng.lng()
            };
            this.modalController.dismiss(selectCoords);
          });
        } else {
          const marker = new googleMaps.Marker({
            position: this.center,
            map: map,
            title: this.title
          });
          marker.setMap(map);
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
  private getGoogleMap() {
    const win = window as any;
    const googleModule = win.google;
    if (googleModule && googleModule.maps) {
      return Promise.resolve(googleModule.maps);
    }
    return new Promise((resolve, reject) => {
      console.log(environment);
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${environment.googleMapKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      document.body.append(script);
      script.onload = () => {
        const googleModule = win.google;
        if (googleModule && googleModule.maps) {
          resolve(googleModule.maps);
        } else {
          reject("Google map not avilable");
        }
      };
    });
  }
  ngOnDestroy() {
    if (this.clickListener) {
      this.googleMaps.event.removeListener(this.clickListener);
    }
  }
}
