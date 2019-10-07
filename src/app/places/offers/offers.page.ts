import { Component, OnInit } from "@angular/core";
import { Place } from "../places.model";
import { PlacesService } from "../places.service";
import { IonItemSliding } from "@ionic/angular";
import { Router } from "@angular/router";

@Component({
  selector: "app-offers",
  templateUrl: "./offers.page.html",
  styleUrls: ["./offers.page.scss"]
})
export class OffersPage implements OnInit {
  loadedOffers: Place[];
  isLoading: boolean = false;
  constructor(private placesService: PlacesService, private router: Router) {}

  ngOnInit() {
    this.placesService.getAllPlaces().subscribe(places => {
      this.loadedOffers = places;
    });
  }

  ionViewWillEnter() {
    this.isLoading = true;
    this.placesService.getAllPlaces().subscribe(offers => {
      this.loadedOffers = offers;
      this.isLoading = false;
    });
  }

  onEdit(id, ref: IonItemSliding) {
    ref.close();
    this.router.navigateByUrl("/places/tabs/offers/edit/" + id);
  }
}
