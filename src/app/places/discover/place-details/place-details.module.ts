import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { PlaceDetailsPage } from "./place-details.page";
import { CreateBookingComponent } from "src/app/bookings/create-booking/create-booking.component";
import { SharedModule } from "src/app/shared/shared.module";

const routes: Routes = [
  {
    path: "",
    component: PlaceDetailsPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [PlaceDetailsPage, CreateBookingComponent],
  entryComponents: [CreateBookingComponent]
})
export class PlaceDetailsPageModule {}
