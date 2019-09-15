import { Injectable } from "@angular/core";
import { Booking } from "./booking.model";
@Injectable({
  providedIn: "root"
})
export class BookingsService {
  bookings: Booking[] = [
    new Booking("xyz1", "place1", "Description1", 1),
    new Booking("xyz2", "place2", "Description", 2),
    new Booking("xyz3", "place3", "Description3", 3),
    new Booking("xyz4", "place4", "Description4", 4)
  ];
  constructor() {}
  getAllBookings() {
    return [...this.bookings];
  }

  getBookingById(id) {
    return {
      ...this.bookings.find(recipe => {
        return recipe.id == id;
      })
    };
  }
  deleteRecipeById(id) {
    this.bookings = this.bookings.filter(recipe => {
      return recipe.id !== id;
    });
  }
}
