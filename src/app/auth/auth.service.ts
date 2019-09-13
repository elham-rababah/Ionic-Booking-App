import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private userIsAuthenticate = false;
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
}
