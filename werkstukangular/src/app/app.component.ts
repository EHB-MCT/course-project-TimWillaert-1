import { Component, AfterViewInit } from '@angular/core';
import { WindowsService } from './windows.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'Dots&Pix';
  isLoading = true;
  aboutActive: boolean;
  practicalActive: boolean;
  partnersActive: boolean;
  programActive: boolean;

  constructor(private windows: WindowsService){
    this.windows.observeAbout.subscribe(aboutActive => this.aboutActive = aboutActive);
    this.windows.observePractical.subscribe(practicalActive => this.practicalActive = practicalActive);
    this.windows.observePartners.subscribe(partnersActive => this.partnersActive = partnersActive);
    this.windows.observeProgram.subscribe(programActive => this.programActive = programActive);
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  }
}
