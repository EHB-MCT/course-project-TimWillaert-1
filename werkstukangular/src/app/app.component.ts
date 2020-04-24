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

  constructor(private windows: WindowsService){
    this.windows.observeAbout.subscribe(aboutActive => this.aboutActive = aboutActive);
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  }
}
