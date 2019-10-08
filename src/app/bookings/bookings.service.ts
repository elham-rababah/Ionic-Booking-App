import { Injectable } from "@angular/core";
import { Booking } from "./booking.model";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { take, delay, tap, map, switchMap } from "rxjs/operators";
import { HttpClient } from "@angular/common/http";
@Injectable({
  providedIn: "root"
})
export class BookingsService {
  bookings = new BehaviorSubject<Booking[]>([]);
  constructor(private authService: AuthService, private http: HttpClient) {}
  getAllBookings() {
    return this.http
      .get(
        `https://ionic-a4d3c.firebaseio.com/bookings.json?orderBy="userId"&equalTo="${this.authService.getUserId()}"`
      )
      .pipe(
        map(res => {
          const bookings = [];
          for (const key in res) {
            if (res.hasOwnProperty(key)) {
              bookings.push(
                new Booking(
                  key,
                  res[key].placeId,
                  res[key].userId,
                  res[key].placeTitle,
                  res[key].placeImg,
                  res[key].FName,
                  res[key].LName,
                  res[key].guestNum,
                  new Date(res[key].dateTo),
                  new Date(res[key].dateFrom)
                )
              );
            }
          }
          return bookings;
        }),
        tap(bookings => {
          this.bookings.next(bookings);
        })
      );
  }

  addBooking(
    placeId: string,
    placeTitle: string,
    placeImg: string,
    FName: string,
    LName: string,
    guestNum: number,
    dateTo: Date,
    dateFrom: Date
  ) {
    let generatedId: string;
    const newBooking = new Booking(
      Math.random.toString(),
      this.authService.getUserId(),
      placeId,
      placeTitle,
      placeImg,
      FName,
      LName,
      guestNum,
      dateTo,
      dateFrom
    );
    return this.http
      .post<{ name: string }>(
        "https://ionic-a4d3c.firebaseio.com/bookings.json",
        {
          ...newBooking,
          id: null
        }
      )
      .pipe(
        switchMap(res => {
          generatedId = res.name;
          return this.bookings;
        }),
        take(1),
        tap(places => {
          newBooking["id"] = generatedId;
          this.bookings.next(places.concat(newBooking));
        })
      );
  }
  cancelBooking(id: string) {
    return this.http
      .delete(`https://ionic-a4d3c.firebaseio.com/bookings/${id}.json`)
      .pipe(
        switchMap(() => {
          return this.bookings;
        }),
        take(1),
        tap(bookings => {
          this.bookings.next(bookings.filter(b => b.id !== id));
        })
      );
  }
}
