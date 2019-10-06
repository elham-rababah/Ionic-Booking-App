import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { ModalController } from "@ionic/angular";
import { ActivatedRoute } from "@angular/router";
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
  constructor(
    private modalCtrl: ModalController,
    private activatedRoute: ActivatedRoute,
    private placesService: PlacesService
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      if (!paramMap.has("id")) {
        //redirect
      } else {
        this.placesService
          .getPlaceById(paramMap["params"]["id"])
          .subscribe(place => {
            this.offer = place;
          });
      }
    });
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
  }

  onEditOffer() {
    console.log(this.form.value);
    if (!this.form.valid) {
      return;
    }
    // call the service
  }
}
