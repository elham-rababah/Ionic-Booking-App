import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  ViewChild,
  ElementRef,
  Input
} from "@angular/core";
import { AlertController, Platform } from "@ionic/angular";
import {
  Plugins,
  Capacitor,
  CameraSource,
  CameraResultType
} from "@capacitor/core";

@Component({
  selector: "app-image-picker",
  templateUrl: "./image-picker.component.html",
  styleUrls: ["./image-picker.component.scss"]
})
export class ImagePickerComponent implements OnInit {
  selectedImage: string;
  usePicker = false;
  isLoading: boolean = false;
  @ViewChild("filePicker", { static: false }) filePickerRef: ElementRef<
    HTMLInputElement
  >;
  @Output() imagePickedEvent = new EventEmitter();
  @Input() showPreview = false;
  constructor(
    public alertController: AlertController,
    private platform: Platform
  ) {}

  ngOnInit() {
    console.log(this.platform.is("mobile"));
    console.log(this.platform.is("hybrid"));
    console.log(this.platform.is("desktop"));
    console.log(this.platform.is("ios"));
    console.log(this.platform.is("android"));
    if (
      (this.platform.is("mobile") && !this.platform.is("hybrid")) ||
      this.platform.is("desktop")
    ) {
      this.usePicker = true;
    }
  }

  onPickImage() {
    this.isLoading = true;
    if (!Capacitor.isPluginAvailable("Camera")) {
      this.filePickerRef.nativeElement.click();
      return;
    }
    Plugins.Camera.getPhoto({
      quality: 50,
      source: CameraSource.Prompt,
      correctOrientation: true,
      height: 320,
      width: 200,
      resultType: CameraResultType.Base64
    })
      .then(image => {
        this.selectedImage = "data:image/jpeg;base64," + image.base64String;
        this.imagePickedEvent.emit(this.selectedImage);
        this.isLoading = false;
      })
      .catch(err => {
        if (this.usePicker) {
          this.filePickerRef.nativeElement.click();
        }
        console.log(err);
        this.isLoading = false;
      });
  }

  fileChosen(event) {
    console.log((event.target as HTMLInputElement).files[0]);
    const pickedfile = (event.target as HTMLInputElement).files[0];
    if (!pickedfile) {
      return;
    }
    const fr = new FileReader();
    fr.onload = () => {
      const dataUrl = fr.result.toString();
      this.selectedImage = dataUrl;
      this.imagePickedEvent.emit(dataUrl);
    };
    fr.readAsDataURL(pickedfile);
  }
}
