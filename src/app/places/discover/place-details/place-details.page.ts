import { Component, OnInit } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import {
  NavController,
  ModalController,
  ActionSheetController,
  LoadingController,
  AlertController
} from "@ionic/angular";
import { CreateBookingComponent } from "src/app/bookings/create-booking/create-booking.component";
import { PlacesService } from "../../places.service";
import { Place } from "../../places.model";
import { Booking } from "src/app/bookings/booking.model";
import { BookingsService } from "src/app/bookings/bookings.service";

@Component({
  selector: "app-place-details",
  templateUrl: "./place-details.page.html",
  styleUrls: ["./place-details.page.scss"]
})
export class PlaceDetailsPage implements OnInit {
  place: any;
  isLoading: boolean = false;
  constructor(
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    private actionSheetCtrl: ActionSheetController,
    private bookingsService: BookingsService,
    private router: Router,
    private loadingController: LoadingController,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("id")) {
        //redirect
      } else {
        this.isLoading = true;
        this.placesService.getPlaceById(paramMap["params"]["id"]).subscribe(
          place => {
            this.place = place;
            this.isLoading = false;
          },
          error => {
            this.alertController
              .create({
                header: " An Error occurred",
                message: "Some thing error happend",
                buttons: [
                  {
                    text: "Okay",
                    handler: () => {
                      this.router.navigate(["/places/tabs/discover"]);
                    }
                  }
                ]
              })
              .then(ele => {
                ele.present();
              });
          }
        );
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
        var bookingData = data.data["bookingData"];
        if (data.role == "Confirm") {
          this.loadingController
            .create({ message: "Creating Booking" })
            .then(ele => {
              ele.present();
              this.bookingsService
                .addBooking(
                  this.place.id,
                  this.place.title,
                  this.place.url,
                  bookingData["first-name"],
                  bookingData["last-name"],
                  bookingData["guest-num"],
                  bookingData["from-date"],
                  bookingData["to-date"]
                )
                .subscribe(() => {
                  ele.dismiss();
                  this.router.navigateByUrl("/bookings");
                });
            });
        }
      });
  }
}
