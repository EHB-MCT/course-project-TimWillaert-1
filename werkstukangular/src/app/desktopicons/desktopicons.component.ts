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
  partnerszindex: number;
  programzindex: number;
  aboutActive: boolean;
  practicalActive: boolean;
  partnersActive: boolean;
  programActive: boolean;

  constructor(private windows: WindowsService) {}

  ngOnInit(): void {
    this.windows.observeZ.subscribe(zindex => this.zindex = zindex);

    this.windows.observeAboutZ.subscribe(aboutzindex => this.aboutzindex = aboutzindex);
    this.windows.observePracticalZ.subscribe(practicalzindex => this.practicalzindex = practicalzindex);
    this.windows.observeProgramZ.subscribe(programzindex => this.programzindex = programzindex);

    this.windows.observeAbout.subscribe(aboutActive => this.aboutActive = aboutActive);
    this.windows.observePractical.subscribe(practicalActive => this.practicalActive = practicalActive);
    this.windows.observeProgram.subscribe(programActive => this.programActive = programActive);
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

  clickPartners(){
    this.windows.editPartners(true);
    this.windows.editZ(this.zindex + 1);
    this.windows.editPartnersZ(this.zindex + 2);
  }

  clickProgram(){
    this.windows.editProgram(true);
    this.windows.editZ(this.zindex + 1);
    this.windows.editProgramZ(this.zindex + 2);
  }

}
