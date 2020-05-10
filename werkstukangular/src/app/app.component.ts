import { Component, OnInit, Inject } from '@angular/core';
import { WindowsService } from './windows.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Dots&Pix';
  isLoading = true;
  aboutActive: boolean;
  practicalActive: boolean;
  partnersActive: boolean;
  programActive: boolean;
  ticketsActive: boolean;
  errors: any[] = [];

  OSName: string;

  constructor(private windows: WindowsService, @Inject(DOCUMENT) private document: Document){
    this.windows.observeAbout.subscribe(aboutActive => this.aboutActive = aboutActive);
    this.windows.observePractical.subscribe(practicalActive => this.practicalActive = practicalActive);
    this.windows.observePartners.subscribe(partnersActive => this.partnersActive = partnersActive);
    this.windows.observeProgram.subscribe(programActive => this.programActive = programActive);
    this.windows.observeTickets.subscribe(ticketsActive => this.ticketsActive = ticketsActive);

    this.windows.observeOS.subscribe(OSName => this.OSName = OSName);
    this.windows.observeOS.subscribe(OSName => this.updateOS(OSName));
  }

  updateOS(OS){
    this.OSName = OS;

    if(this.document.getElementById('cssfile')){
      this.document.getElementById('cssfile').remove();
    }
    const headEl = this.document.getElementsByTagName('head')[0];
    const linkEl = this.document.createElement('link');
    linkEl.id = 'cssfile';
    linkEl.rel = 'stylesheet';

    if(this.OSName === 'Windows'){
      linkEl.href = 'styleswindows.css';
    } else{
      linkEl.href = 'stylesmac.css';
    }
    headEl.appendChild(linkEl);
  }

  startErrors(){
    const interval = setInterval(() => {
      this.errors.push(1);

      if (this.errors.length === 50) {
        clearInterval(interval);
      }
    }, 100);
  }

  resetErrors(){
    this.errors = Array(0);
  }

  playAudio(){
    let audio = new Audio();
    if(this.OSName === 'Mac'){
      audio.src = "assets/macboot.mp3";
    } else{
      audio.src = "assets/windowsboot.mp3";
    }
    audio.load();
    audio.play();
  }

  start(){
    this.playAudio();
    setTimeout(() => {
      this.isLoading = false;
    }, 1000);
  }
}
