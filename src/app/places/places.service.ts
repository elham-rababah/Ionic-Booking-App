import { Injectable } from "@angular/core";
import { Place } from "./places.model";
import { BehaviorSubject, Observable, of } from "rxjs";
import { take, map, tap, delay, switchMap } from "rxjs/operators";
import { AuthService } from "../auth/auth.service";
import { HttpClient } from "@angular/common/http";
import { PlaceLocation } from "./location.model";

@Injectable({
  providedIn: "root"
})
export class PlacesService {
  private places = new BehaviorSubject<Place[]>([]);
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
                  res[key].userId,
                  res[key].location
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
    return this.http
      .get<Place>(
        `https://ionic-a4d3c.firebaseio.com/offered-places/${id}.json`
      )
      .pipe(
        map(res => {
          return new Place(
            id,
            res.title,
            res.descriptions,
            res.url,
            res.price,
            new Date(res.availableFrom),
            new Date(res.availableTo),
            res.userId,
            res.location
          );
        })
      );
  }

  uploadImage(img: File) {
    const uploadData = new FormData();
    uploadData.append("image", img);
    return this.http.post(
      "https://us-central1-ionic-a4d3c.cloudfunctions.net/storeImage",
      uploadData
    );
  }

  addNewPlace(
    title: string,
    descriptions: string,
    price: number,
    availableFrom: Date,
    availableTo: Date,
    location: PlaceLocation,
    imgUrl: string
  ) {
    let generatedId: string;
    let newPlace = new Place(
      Math.random().toString(),
      title,
      descriptions,
      imgUrl,
      price,
      availableFrom,
      availableTo,
      this.authService.getUserId(),
      location
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
        if (!places || places.length <= 0) {
          return this.getAllPlaces();
        } else {
          return of(places);
        }
      }),
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
          oldPlace.userId,
          oldPlace.location
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
