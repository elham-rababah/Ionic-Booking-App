import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PlacesService } from "../../places.service";
import { Router } from "@angular/router";
import { LoadingController } from "@ionic/angular";
import { PlaceLocation } from "../../location.model";
import { switchMap } from "rxjs/operators";

function base64toBlob(base64Data, contentType) {
  contentType = contentType || "";
  const sliceSize = 1024;
  const byteCharacters = window.atob(base64Data);
  const bytesLength = byteCharacters.length;
  const slicesCount = Math.ceil(bytesLength / sliceSize);
  const byteArrays = new Array(slicesCount);

  for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
    const begin = sliceIndex * sliceSize;
    const end = Math.min(begin + sliceSize, bytesLength);

    const bytes = new Array(end - begin);
    for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
      bytes[i] = byteCharacters[offset].charCodeAt(0);
    }
    byteArrays[sliceIndex] = new Uint8Array(bytes);
  }
  return new Blob(byteArrays, { type: contentType });
}
@Component({
  selector: "app-new-offer",
  templateUrl: "./new-offer.page.html",
  styleUrls: ["./new-offer.page.scss"]
})
export class NewOfferPage implements OnInit {
  constructor(
    private placesService: PlacesService,
    private router: Router,
    private loadingController: LoadingController
  ) {}
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
      }),
      location: new FormControl(null, {
        updateOn: "blur",
        validators: [Validators.required]
      }),

      img: new FormControl(null, {})
    });
  }

  onCreateOffer() {
    if (!this.form.valid || !this.form.value.img) {
      return;
    }

    console.log(!this.form.value);
    var that = this;
    this.loadingController
      .create({ message: "Creating Place" })
      .then(loadingEl => {
        loadingEl.present();
        this.placesService
          .uploadImage(this.form.get("img").value)
          .pipe(
            switchMap(uploadRes => {
              return this.placesService.addNewPlace(
                this.form.value.title,
                this.form.value.description,
                this.form.value.price,
                this.form.value.startDate,
                this.form.value.endDate,
                this.form.value.location,
                uploadRes["imageUrl"]
              );
            })
          )
          .subscribe(() => {
            loadingEl.dismiss();
            this.form.reset();
            that.router.navigateByUrl("/places/tabs/offers");
          });
      });
  }

  pickedLocation(location: PlaceLocation) {
    console.log(location);
    this.form.patchValue({
      location: location
    });
  }

  imagePicked(event) {
    console.log(event);
    if (typeof event == "string") {
      try {
        const imageFile = base64toBlob(
          event.replace("data:image/jpeg;base64,", ""),
          "image/jpeg"
        );
        this.form.patchValue({ img: imageFile });
      } catch (error) {
        alert(error);
      }
    } else {
      this.form.patchValue({ img: event });
    }
  }
}
