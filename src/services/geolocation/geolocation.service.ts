import { Injectable } from "@angular/core";
import { Geolocation } from "@capacitor/core";
import { HttpClient } from "@angular/common/http";
import { switchMap } from "rxjs/operators";
import { Observable, from } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class GeolocationService {
  constructor(private http: HttpClient) {}

  /**
   *  Função que chama o plugin de geolocalização e retorna a longitude e latitude
   */
  async getLocation() {
    const position = await Geolocation.getCurrentPosition();
    return {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    };
  }

  /**
   *  Função que recebe os valores de long e lat e chama a API do Google. O retorno é um Observable.
   */
  getLocationGoogleAPI(): Observable<any> {
    return from(this.getLocation()).pipe(
      switchMap(pos => {
        return this.http.get(
          `https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyDmyytHANTI83vcrwslSQSPLx4KKNKb6P0&latlng=${pos.latitude},${pos.longitude}`
        );
      })
    );
  }
}
