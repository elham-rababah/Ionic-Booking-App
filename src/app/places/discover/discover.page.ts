import { Component, OnInit } from "@angular/core";
import { Place } from "../places.model";
import { PlacesService } from "../places.service";
import { SegmentChangeEventDetail } from "@ionic/core";

@Component({
  selector: "app-discover",
  templateUrl: "./discover.page.html",
  styleUrls: ["./discover.page.scss"]
})
export class DiscoverPage implements OnInit {
  loadedPlaces: Place[];
  listedLoadedPlaces: Place[];
  constructor(private placesService: PlacesService) {}

  ngOnInit() {
    this.placesService.getAllPlaces().subscribe(places => {
      this.loadedPlaces = places;
      this.listedLoadedPlaces = this.loadedPlaces.slice(1);
    });
  }

  segmentChanged(event: CustomEvent<SegmentChangeEventDetail>) {
    console.log(event.detail);
  }
}
