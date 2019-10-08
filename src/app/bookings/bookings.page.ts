import { Component, OnInit } from "@angular/core";
import { BookingsService } from "./bookings.service";
import { Booking } from "./booking.model";
import { LoadingController, IonItemSliding } from "@ionic/angular";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.page.html",
  styleUrls: ["./bookings.page.scss"]
})
export class BookingsPage implements OnInit {
  bookings: Booking[];
  isLoading: boolean = false;
  constructor(
    private bookingsService: BookingsService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.getBooking();
  }

  ionViewWillEnter() {
    this.getBooking();
  }

  onDelete(id) {
    this.loadingController
      .create({ message: "Cancel Booking ..." })
      .then(ele => {
        ele.present();
        this.bookingsService.cancelBooking(id).subscribe(() => {
          this.getBooking();
          ele.dismiss();
        });
      });
  }
  getBooking() {
    this.isLoading = true;
    this.bookingsService.getAllBookings().subscribe(bookings => {
      this.isLoading = false;
      this.bookings = bookings;
    });
  }
}
