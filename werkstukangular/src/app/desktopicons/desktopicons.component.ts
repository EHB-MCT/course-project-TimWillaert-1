import { Component, OnInit, Renderer2, Inject, ViewChild } from '@angular/core';
import { WindowsService } from '../windows.service';

@Component({
  selector: 'app-desktopicons',
  templateUrl: './desktopicons.component.html',
  styleUrls: ['./desktopicons.component.css']
})
export class DesktopiconsComponent implements OnInit {
  zindex: number;
  aboutzindex: number;
  practicalzindex: number;
  aboutActive: boolean;
  practicalActive: boolean;

  constructor(private windows: WindowsService, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.windows.observeZ.subscribe(zindex => this.zindex = zindex);
    this.windows.observeAboutZ.subscribe(aboutzindex => this.aboutzindex = aboutzindex);
    this.windows.observePracticalZ.subscribe(practicalzindex => this.practicalzindex = practicalzindex);

    this.windows.observeAbout.subscribe(aboutActive => this.aboutActive = aboutActive);
    this.windows.observePractical.subscribe(practicalActive => this.practicalActive = practicalActive);
  }

  clickAbout(){
    this.windows.editAbout(true);
    this.windows.editZ(this.zindex + 1);
    this.windows.editAboutZ(this.zindex + 2);
  }

  clickPractical(){
    this.windows.editPractical(true);
    this.windows.editZ(this.zindex + 1);
    this.windows.editPracticalZ(this.zindex + 2);
  }

}
