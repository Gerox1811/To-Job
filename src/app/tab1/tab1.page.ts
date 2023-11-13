import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-tab1',
  templateUrl: './tab1.page.html',
  styleUrls: ['./tab1.page.scss'],
})
export class Tab1Page implements OnInit, OnDestroy {

  @ViewChild('videoContainer', { read: ElementRef, static: false }) videoContainer!: ElementRef;

  videos: any[] = [];
  videoPlayers: HTMLVideoElement[] = [];
  observer: IntersectionObserver | undefined;
  lastActiveVideo: HTMLVideoElement | undefined;

  constructor(private firestore: AngularFirestore) {
    this.loadVideos();
  }

  ngOnInit() {
    this.observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Video is visible, play it
          const video = entry.target as HTMLVideoElement;
          video.play();
          this.lastActiveVideo = video;
        } else {
          // Video is not visible, pause it
          const video = entry.target as HTMLVideoElement;
          video.pause();
        }
      });
    }, { threshold: 0.5 });  // Adjust the threshold as needed
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  loadVideos() {
    this.firestore.collection('videos').valueChanges().subscribe((videos: any[]) => {
      this.videos = videos;
      setTimeout(() => this.initializeVideoPlayers(), 0);
    });
  }

  initializeVideoPlayers() {
    this.videoPlayers = this.videoContainer.nativeElement.querySelectorAll('video');
    this.videoPlayers.forEach(video => {
      this.observer?.observe(video);
      video.addEventListener('timeupdate', () => this.checkLastVideo(video));
    });
  }

  togglePlayPause(video: HTMLVideoElement) {
    if (video.paused) {
      video.play();
      this.lastActiveVideo = video;
    } else {
      video.pause();
    }
  }

  restartVideo(video: HTMLVideoElement) {
    // Se llama cuando el video actual llega al final o cuando se cambia a otro video
    video.currentTime = 0; // Reinicia el video al principio
    video.play(); // Reproduce automáticamente
    this.lastActiveVideo = video;
  }

  checkLastVideo(video: HTMLVideoElement) {
    // Se llama cada vez que cambia el tiempo del video
    if (video.currentTime === video.duration) {
      // Si el tiempo actual es igual a la duración, el video ha llegado al final
      this.restartVideo(video);
    }
  }

  onScroll() {
    // Pausa todos los videos al hacer scroll
    this.videoPlayers.forEach(video => {
      if (video !== this.lastActiveVideo) {
        this.restartVideo(video);
      }
    });
  }
}
