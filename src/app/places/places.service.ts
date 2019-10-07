import { Injectable } from "@angular/core";
import { Place } from "./places.model";
import { BehaviorSubject, Observable } from "rxjs";
import { take, map, tap, delay, switchMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: "root"
})
export class PlacesService {
  private places = new BehaviorSubject<Place[]>([
    // new Place(
    //   "1",
    //   "place1",
    //   "Description1",
    //   "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26230815/5050815.jpg",
    //   1,
    //   new Date("2019-01-01"),
    //   new Date("2019-12-31"),
    //   "2017"
    // ),
    // new Place(
    //   "2",
    //   "place2",
    //   "Description",
    //   "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26230815/5050815.jpg",
    //   2,
    //   new Date("2019-01-01"),
    //   new Date("2019-12-31"),
    //   "2017"
    // ),
    // new Place(
    //   "3",
    //   "place3",
    //   "Description3",
    //   "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26230815/5050815.jpg",
    //   3,
    //   new Date("2019-01-01"),
    //   new Date("2019-12-31"),
    //   "2017"
    // ),
    // new Place(
    //   "4",
    //   "place4",
    //   "Description4",
    //   "https://static.onecms.io/wp-content/uploads/sites/44/2019/08/26230815/5050815.jpg",
    //   4,
    //   new Date("2019-01-01"),
    //   new Date("2019-12-31"),
    //   "2017"
    // )
  ]);
  constructor(private authService: AuthService, private http: HttpClient) {}
  getAllPlaces() {
    return this.http
      .get("https://ionic-a4d3c.firebaseio.com/offered-places.json")
      .pipe(
        map(res => {
          const places = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              places.push(
                new Place(
                  key,
                  res[key].title,
                  res[key].descriptions,
                  res[key].url,
                  res[key].price,
                  new Date(res[key].availableFrom),
                  new Date(res[key].availableTo),
                  res[key].userId
                )
              );
            }
          }
          return places;
        }),
        tap(places => {
          this.places.next(places);
        })
      );
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
    let generatedId: string;
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
    return this.http
      .post<{ name: string }>(
        "https://ionic-a4d3c.firebaseio.com/offered-places.json",
        {
          ...newPlace,
          id: null
        }
      )
      .pipe(
        switchMap(res => {
          generatedId = res.name;
          return this.places;
        }),
        take(1),
        tap(places => {
          newPlace["id"] = generatedId;
          this.places.next(places.concat(newPlace));
        })
      );
  }

  updatePlace(placeId: string, title: string, description: string) {
    let updatedPlaces: Place[];
    return this.places.pipe(
      take(1),
      switchMap(places => {
        const updatedPlaceIndex = places.findIndex(pl => pl.id === placeId);
        updatedPlaces = [...places];
        const oldPlace = updatedPlaces[updatedPlaceIndex];
        updatedPlaces[updatedPlaceIndex] = new Place(
          oldPlace.id,
          title,
          description,
          oldPlace.url,
          oldPlace.price,
          oldPlace.availableFrom,
          oldPlace.availableTo,
          oldPlace.userId
        );
        return this.http.put(
          `https://ionic-a4d3c.firebaseio.com/offered-places/${placeId}.json`,
          { ...updatedPlaces[updatedPlaceIndex], id: null }
        );
      }),
      tap(() => {
        this.places.next(updatedPlaces);
      })
    );
  }
}
