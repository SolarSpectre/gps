import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc, getDocs } from 'firebase/firestore';

const firebaseConfig = {
    
};

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app = initializeApp(firebaseConfig);
  private db = getFirestore(this.app);

  constructor() { }

  async saveLocation( name: string, latitude: number, longitude: number, url:string) {
    try {
      const docRef = await addDoc(collection(this.db, "ubicacionJosephCaza"), {
        name,
        url
      });
      return docRef.id;
    } catch (error) {
      console.error("Error saving location: ", error);
      throw error;
    }
  }
} 