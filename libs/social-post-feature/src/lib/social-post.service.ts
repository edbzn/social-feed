import { Injectable } from "@angular/core";
import { Camera, CameraResultType } from '@capacitor/camera';


@Injectable({ providedIn: 'root' })
export class SocialPostService {
  async takePicture(): Promise<string | undefined> {
    const image = await Camera.getPhoto({
      quality: 100,
      allowEditing: false,
      resultType: CameraResultType.Uri
    });

    return image.webPath;
  }
}
