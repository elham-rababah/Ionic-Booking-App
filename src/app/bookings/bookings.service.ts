import { Injectable } from "@angular/core";
import { Booking } from "./booking.model";
import { BehaviorSubject } from "rxjs";
import { AuthService } from "../auth/auth.service";
import { take, delay, tap } from "rxjs/operators";
@Injectable({
  providedIn: "root"
})
export class BookingsService {
  bookings = new BehaviorSubject<Booking[]>([]);
  constructor(private authService: AuthService) {}
  getAllBookings() {
    return this.bookings.asObservable();
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
    const newBooking = new Booking(
      Math.random.toString(),
      placeId,
      this.authService.getUserId(),
      placeTitle,
      placeImg,
      FName,
      LName,
      guestNum,
      dateTo,
      dateFrom
    );

    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap(bookings => {
        this.bookings.next(bookings.concat(newBooking));
      })
    );
  }
  cancelBooking(id: string) {
    return this.bookings.pipe(
      take(1),
      delay(1000),
      tap(bookings => {
        this.bookings.next(bookings.filter(b => b.id !== id));
      })
    );
  }
}
