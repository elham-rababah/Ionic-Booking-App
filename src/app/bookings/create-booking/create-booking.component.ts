import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { Place } from "src/app/places/places.model";
import { ModalController } from "@ionic/angular";
import { FormGroup, NgForm } from "@angular/forms";

@Component({
  selector: "app-create-booking",
  templateUrl: "./create-booking.component.html",
  styleUrls: ["./create-booking.component.scss"]
})
export class CreateBookingComponent implements OnInit {
  @Input() selectedPlace: Place;
  @Input() selectedMode: "select" | "random";
  @ViewChild("f", { static: false }) from: NgForm;
  startDate;
  endDate;
  constructor(private modalCtrl: ModalController) {}

  ngOnInit() {
    const availableFrom = new Date(this.selectedPlace.availableFrom);
    const availableTo = new Date(this.selectedPlace.availableTo);
    if (this.selectedMode == "random") {
      this.startDate = new Date(
        availableFrom.getTime() +
          Math.random() *
            (availableTo.getTime() -
              7 * 24 * 60 * 60 * 1000 -
              availableFrom.getTime())
      ).toISOString();

      this.endDate = new Date(
        new Date(this.startDate).getTime() +
          Math.random() *
            (new Date(this.startDate).getTime() +
              6 * 24 * 60 * 60 * 1000 -
              new Date(this.startDate).getTime())
      ).toISOString();
    }
  }
  onClose() {
    this.modalCtrl.dismiss(null, "cancel");
  }
  onBooking(f: NgForm) {
    console.log("sdsd", f.value);
    if (!f.valid /*  || !this.dateValid() */) {
      return;
    }
    this.modalCtrl.dismiss({ bookingData: this.from.value }, "Confirm");
  }
  dateValid() {
    console.log(this.from.value);
    const startDate = new Date(this.from.value["from-date"]);
    const endDate = new Date(this.from.value["to-date"]);
    return startDate > endDate;
  }
}
