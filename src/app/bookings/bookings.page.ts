import { Component, OnInit } from "@angular/core";
import { BookingsService } from "./bookings.service";
import { Booking } from "./booking.model";
import { LoadingController } from "@ionic/angular";

@Component({
  selector: "app-bookings",
  templateUrl: "./bookings.page.html",
  styleUrls: ["./bookings.page.scss"]
})
export class BookingsPage implements OnInit {
  bookings: Booking[];
  constructor(
    private bookingsService: BookingsService,
    private loadingController: LoadingController
  ) {}

  ngOnInit() {
    this.bookingsService.getAllBookings().subscribe(bookings => {
      this.bookings = bookings;
    });
  }

  onDelete(id) {
    this.loadingController
      .create({ message: "Cancel Booking ..." })
      .then(ele => {
        ele.present();
        this.bookingsService.cancelBooking(id).subscribe(() => {
          console.log("Done");
          ele.dismiss();
        });
      });
  }
}
