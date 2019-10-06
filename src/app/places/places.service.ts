import { Injectable } from "@angular/core";
import { Place } from "./places.model";
import { BehaviorSubject, Observable } from "rxjs";
import { take, map, tap, delay } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";

@Injectable({
  providedIn: "root"
})
export class PlacesService {
  private places = new BehaviorSubject<Place[]>([
    new Place(
      "1",
      "place1",
      "Description1",
      "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26230815/5050815.jpg",
      1,
      new Date("2019-01-01"),
      new Date("2019-12-31"),
      "2017"
    ),
    new Place(
      "2",
      "place2",
      "Description",
      "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26230815/5050815.jpg",
      2,
      new Date("2019-01-01"),
      new Date("2019-12-31"),
      "2017"
    ),
    new Place(
      "3",
      "place3",
      "Description3",
      "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26230815/5050815.jpg",
      3,
      new Date("2019-01-01"),
      new Date("2019-12-31"),
      "2017"
    ),
    new Place(
      "4",
      "place4",
      "Description4",
      "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26230815/5050815.jpg",
      4,
      new Date("2019-01-01"),
      new Date("2019-12-31"),
      "2017"
    )
  ]);
  constructor(private authService: AuthService) {}
  getAllPlaces() {
    return this.places.asObservable();
  }

  getPlaceById(id) {
    return this.places.pipe(
      take(1),
      map(places => {
        return { ...places.find(p => p.id === id) };
      })
    );
  }

  addNewPlace(
    title: string,
    descriptions: string,
    price: number,
    availableFrom: Date,
    availableTo: Date
  ) {
    let newPlace = new Place(
      Math.random().toString(),
      title,
      descriptions,
      "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26230815/5050815.jpg",
      price,
      availableFrom,
      availableTo,
      this.authService.getUserId()
    );
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        this.places.next(places.concat(newPlace));
      })
    );
  }

  updatePlace(placeId: string, title: string, descriptions: string) {
    return this.places.pipe(
      take(1),
      delay(1000),
      tap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        const updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          descriptions,
          oldPlace.url,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        this.places.next(updatedPlaces);
      })
    );
  }
}
