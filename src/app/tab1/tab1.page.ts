import { Component, ViewChild, ElementRef } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page {

  @ViewChild('videoContainer', { read: ElementRef, static: false }) videoContainer!: ElementRef;

  videos: any[] = [];

  constructor(private firestore: AngularFirestore) {
    this.loadVideos();
  }

  loadVideos() {
    this.firestore.collection('videos').valueChanges().subscribe((videos: any[]) => {
      this.videos = videos;
    });
  }

  playPauseVideo() {
    const video: HTMLVideoElement = this.videoContainer.nativeElement.querySelector('video');

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  }

  onScroll() {
    const video: HTMLVideoElement = this.videoContainer.nativeElement.querySelector('video');
    const bounds = this.videoContainer.nativeElement.getBoundingClientRect();

    if (bounds.top < window.innerHeight && bounds.bottom > 0) {
      // Video visible en la pantalla, intenta reproducir
      this.playPauseVideo();
    } else {
      // Video fuera de la pantalla, intenta pausar
      const video: HTMLVideoElement = this.videoContainer.nativeElement.querySelector('video');
      video.pause();
    }
  }
}




