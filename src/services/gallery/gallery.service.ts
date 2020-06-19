import { Injectable } from "@angular/core";

import { Plugins, CameraResultType, CameraSource } from "@capacitor/core";
const { Camera } = Plugins;

@Injectable({
  providedIn: "root"
})
export class GalleryService {
  constructor() {}

  /**
   *  Função que chama o plugin da camera (galeria) e retorna o path da imagem selecionada
   */
  async takePicture() {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri,
        source: CameraSource.Photos
      });
      return image.webPath;
    } catch (err) {
      throw Error(err);
    }
  }
}
