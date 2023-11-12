import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import {AngularFirestore } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from "@angular/fire/compat/auth";
import { finalize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})


export class FirebaseService {
  constructor(
    private storage: AngularFireStorage,
    private firestore: AngularFirestore,
  ) {}

  // Sube un video a Cloud Firestore
  uploadVideo(description: string, videoFile: File) {
    if (description && videoFile) {
      const storagePath = `videos/${new Date().getTime()}_${videoFile.name}`;
      const uploadTask = this.storage.upload(storagePath, videoFile);

      uploadTask.snapshotChanges().pipe(
        finalize(async () => {
          // Obtiene la URL de descarga del video
          const downloadURL = await this.storage.ref(storagePath).getDownloadURL().toPromise();

          // Guarda los detalles del video en Cloud Firestore
          this.saveVideoDetails(description, downloadURL);
        })
      ).subscribe();
    } else {
      //console.error('Parámetros no válidos.');
    }
  }

  private saveVideoDetails(description: string, downloadURL: string) {
    // Guarda los detalles del video en Cloud Firestore
    this.firestore.collection('videos').add({
      description: description,
      videoURL: downloadURL,
      fecha_carga: new Date()
    });
  }
}