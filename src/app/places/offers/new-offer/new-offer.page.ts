import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PlacesService } from "../../places.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-new-offer",
  templateUrl: "./new-offer.page.html",
  styleUrls: ["./new-offer.page.scss"]
})
export class NewOfferPage implements OnInit {
  constructor(private placesService: PlacesService, private router: Router) {}
  form: FormGroup;
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      description: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.maxLength(180)]
      }),
      price: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required, Validators.min(1)]
      }),
      startDate: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),
      endDate: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      })
    });
  }

  onCreateOffer() {
    console.log("onCreateOffer");
    console.log(this.form.value);

    console.log(this.form.value);
    if (!this.form.valid) {
      return;
    }
    // call the service
    this.placesService.addNewPlace(
      this.form.value.title,
      this.form.value.description,
      this.form.value.price,
      this.form.value.startDate,
      this.form.value.endDate
    );
  }
}
