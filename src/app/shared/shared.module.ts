import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MapModalComponent } from "./map-modal/map-modal.component";
import { LocationPikerComponent } from "./pickers/location-piker/location-piker.component";
import { IonicModule } from "@ionic/angular";
import { ImagePickerComponent } from "./image-picker/image-picker/image-picker.component";

@NgModule({
  imports: [CommonModule, IonicModule],
  declarations: [
    MapModalComponent,
    LocationPikerComponent,
    ImagePickerComponent
  ],
  exports: [MapModalComponent, LocationPikerComponent, ImagePickerComponent],
  entryComponents: [MapModalComponent]
})
export class SharedModule {}
