import { Component, OnInit } from '@angular/core';
import { WindowsService } from '../windows.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-desktopicons',
  templateUrl: './desktopicons.component.html',
  styleUrls: ['./desktopicons.component.css']
})
export class DesktopiconsComponent implements OnInit {
  aboutActive: boolean;
  practicalActive: boolean;

  constructor(private windows: WindowsService) {
  }

  ngOnInit(): void {
    this.windows.observeAbout.subscribe(aboutActive => this.aboutActive = aboutActive);
    this.windows.observePractical.subscribe(practicalActive => this.practicalActive = practicalActive);
  }

  clickAbout(){
    this.windows.editAbout(true);
  }

  clickPractical(){
    this.windows.editPractical(true);
  }

}
