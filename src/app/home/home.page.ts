import { Component} from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonButton, IonInput, IonItem, IonLabel, IonList, IonCard, IonCardContent, IonCardHeader, IonCardTitle } from '@ionic/angular/standalone';
import { NgIf, NgFor } from "@angular/common";
import { FormsModule } from '@angular/forms';
import { Geolocation } from "@capacitor/geolocation";
import { Browser } from '@capacitor/browser';
import { FirebaseService } from '../services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonHeader, IonToolbar, IonTitle, IonContent, IonButton, NgIf, FormsModule
  ],
})
export class HomePage {
  latitude: number | null = null;
  longitude: number | null = null;
  name: string = 'Joseph';
  locations: any[] = [];
  saving: boolean = false;

  constructor(private firebaseService: FirebaseService) { }


  async getCurrentLocation() {
    try {
      const coordinates = await Geolocation.getCurrentPosition(
        {
          enableHighAccuracy: true,
          timeout: 10000
        }
      );
      this.latitude = coordinates.coords.latitude;
      this.longitude = coordinates.coords.longitude;
      this.saving = true;
      const url = `https://www.google.com/maps?q=${this.latitude},${this.longitude}`;
      window.open(url, '_system');
    try {
      await this.firebaseService.saveLocation(
        this.name,
        this.latitude,
        this.longitude,
        url
      );
    } catch (error) {
      console.error("No se puede obtener la ubicacion", error);
    }
  }catch (error) {
    console.error("No se puede obtener la ubicacion", error);
  }
  }
}