import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private userIsAuthenticate = true;
  private userId = "eee";
  constructor() {}
  login() {
    this.userIsAuthenticate = true;
  }
  logout() {
    this.userIsAuthenticate = false;
  }

  getUserIsAuthenticate() {
    return this.userIsAuthenticate;
  }
  getUserId() {
    return this.userId;
  }
}
