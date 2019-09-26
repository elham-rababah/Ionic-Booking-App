import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  NavController,
  ModalController,
  ActionSheetController
} from "@ionic/angular";
import { CreateBookingComponent } from "src/app/bookings/create-booking/create-booking.component";
import { PlacesService } from "../../places.service";
import { Place } from "../../places.model";

@Component({
  selector: "app-place-details",
  templateUrl: "./place-details.page.html",
  styleUrls: ["./place-details.page.scss"]
})
export class PlaceDetailsPage implements OnInit {
  place: Place;
  constructor(
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private actionSheetCtrl: ActionSheetController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("id")) {
        //redirect
      } else {
        this.place = this.placesService.getPlaceById(paramMap["params"]["id"]);
      }
    });
  }
  onBookPlace() {
    this.actionSheetCtrl
      .create({
        header: "Choose Action Sheet",
        buttons: [
          {
            text: "Select Date",
            handler: () => {
              this.openBookingModal("select");
            }
          },
          {
            text: "Random Date",
            handler: () => {
              this.openBookingModal("random");
            }
          },
          { text: "Cancel", role: "cancel" }
        ]
      })
      .then(actionSheet => {
        actionSheet.present();
      });
  }

  openBookingModal(mode: "select" | "random") {
    this.modalCtrl
      .create({
        component: CreateBookingComponent,
        componentProps: {
          selectedPlace: this.place,
          selectedMode: mode
        }
      })
      .then(ele => {
        ele.present();
        return ele.onDidDismiss();
      })
      .then(data => {
        console.log(data);
      });
    // this.navCtrl.navigateBack("/places/tabs/discover");
  }
}
