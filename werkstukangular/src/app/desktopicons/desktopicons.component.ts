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

  constructor(private windows: WindowsService) {
  }

  ngOnInit(): void {
    this.windows.observeAbout.subscribe(aboutActive => this.aboutActive = aboutActive);
  }

  clickAbout(){
    this.windows.editAbout(true);
  }

}
