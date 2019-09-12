import { Injectable } from "@angular/core";
import { Place } from "./places.model";

@Injectable({
  providedIn: "root"
})
export class PlacesService {
  private places: Place[] = [
    new Place(
      "1",
      "place1",
      "Description1",
      "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26230815/5050815.jpg",
      1
    ),
    new Place(
      "2",
      "place2",
      "Description",
      "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26230815/5050815.jpg",
      2
    ),
    new Place(
      "3",
      "place3",
      "Description3",
      "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26230815/5050815.jpg",
      3
    ),
    new Place(
      "4",
      "place4",
      "Description4",
      "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26230815/5050815.jpg",
      4
    )
  ];
  constructor() {}
  getAllPlaces() {
    return [...this.places];
  }

  getPlaceById(id) {
    return {
      ...this.places.find(recipe => {
        return recipe.id == id;
      })
    };
  }
  deleteRecipeById(id) {
    this.places = this.places.filter(recipe => {
      return recipe.id !== id;
    });
  }
}
