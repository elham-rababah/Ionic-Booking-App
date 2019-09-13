import { NgModule } from "@angular/core";
import { PreloadAllModules, RouterModule, Routes } from "@angular/router";
import { AuthGuard } from "./auth/auth.guard";

const routes: Routes = [
  { path: "", redirectTo: "places", pathMatch: "full", canLoad: [AuthGuard] },
  { path: "auth", loadChildren: "./auth/auth.module#AuthPageModule" },
  {
    path: "places",
    loadChildren: "./places/places.module#PlacesPageModule",
    canLoad: [AuthGuard]
  },
  // {
  //   path: "discover",
  //   loadChildren: "./places/discover/discover.module#DiscoverPageModule"
  // },
  // {
  //   path: "offers",
  //   loadChildren: "./places/offers/offers.module#OffersPageModule"
  // },
  // {
  //   path: "new-offer",
  //   loadChildren:
  //     "./places/offers/new-offer/new-offer.module#NewOfferPageModule"
  // },
  // {
  //   path: "edit-offer",
  //   loadChildren:
  //     "./places/offers/edit-offer/edit-offer.module#EditOfferPageModule"
  // },
  // {
  //   path: "place-details",
  //   loadChildren:
  //     "./places/discover/place-details/place-details.module#PlaceDetailsPageModule"
  // },
  // {
  //   path: "offer-booking",
  //   loadChildren:
  //     "./places/offers/offer-booking/offer-booking.module#OfferBookingPageModule"
  // },
  {
    path: "bookings",
    loadChildren: "./bookings/bookings.module#BookingsPageModule",
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
