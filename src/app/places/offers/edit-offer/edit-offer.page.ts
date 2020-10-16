import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import {
  ModalController,
  LoadingController,
  AlertController
} from "@ionic/angular";
import { ActivatedRoute, Router } from "@angular/router";
import { PlacesService } from "../../places.service";
import { Place } from "../../places.model";

@Component({
  selector: "app-edit-offer",
  templateUrl: "./edit-offer.page.html",
  styleUrls: ["./edit-offer.page.scss"]
})
export class EditOfferPage implements OnInit {
  form: FormGroup;
  offer: any;
  isLoading = false;
  placeId;
  constructor(
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService,
    public loadingController: LoadingController,
    private router: Router,
    private alertController: AlertController
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("id")) {
        //redirect
      } else {
        this.placeId = paramMap["params"]["id"];
        this.isLoading = true;
        this.placesService.getPlaceById(paramMap["params"]["id"]).subscribe(
          place => {
            this.offer = place;

            this.form = new FormGroup({
              title: new FormControl(this.offer.title, {
                updateOn: "blur",
                validators: [Validators.required]
              }),
              description: new FormControl(this.offer.descriptions, {
                updateOn: "blur",
                validators: [Validators.required, Validators.maxLength(180)]
              })
            });
            this.isLoading = false;
          },
          error => {
            this.alertController
              .create({
                header: " An Error occurred",
                message: "Some thing error happend",
                buttons: [
                  {
                    text: "Okay",
                    handler: () => {
                      this.router.navigate(["/places/tabs/offers"]);
                    }
                  }
                ]
              })
              .then(ele => {
                ele.present();
              });
          }
        );
      }
    });
  }

  onEditOffer() {
    console.log(this.form.value);
    if (!this.form.valid) {
      return;
    }
    this.loadingController.create({ message: "Updating Place" }).then(ele => {
      ele.present();
      this.placesService
        .updatePlace(
          this.offer.id,
          this.form.value.title,
          this.form.value.description
        )
        .subscribe(() => {
          ele.dismiss();
          this.form.reset();
          this.router.navigateByUrl("/places/tabs/offers");
        });
    });
  }
}
