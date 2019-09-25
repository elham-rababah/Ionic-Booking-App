import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";
import { LoadingController } from "@ionic/angular";
import { dismiss } from "@ionic/core/dist/types/utils/overlays";
import { NgForm } from "@angular/forms";

@Component({
  selector: "app-auth",
  templateUrl: "./auth.page.html",
  styleUrls: ["./auth.page.scss"]
})
export class AuthPage implements OnInit {
  isLogin: boolean = true;
  constructor(
    private authService: AuthService,
    private router: Router,
    private loadingCtrl: LoadingController
  ) {}
  ngOnInit() {}
  login() {
    this.loadingCtrl
      .create({ keyboardClose: true, message: "Logging in ...." })
      .then(lc => {
        lc.present();
        this.authService.login();
        setTimeout(() => {
          lc.dismiss();
          this.router.navigateByUrl("/places/tabs/discover");
        }, 1000);
      });
  }

  onSubmit(f: NgForm) {
    console.log(f);
    if (!f.valid) {
      return;
    }
    if (this.isLogin) {
      //send to loign service
      this.login();
    } else {
      //send to sign up service
    }
  }

  onChangeAuthMode() {
    this.isLogin = !this.isLogin;
  }
}
