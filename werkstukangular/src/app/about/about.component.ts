import { Component, OnInit, HostListener, ElementRef, AfterViewInit, AfterViewChecked } from '@angular/core';
import { WindowsService } from '../windows.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit, AfterViewChecked {
  zindex: number;
  aboutzindex: number;

  constructor(private eRef: ElementRef, private windows: WindowsService, private cdRef: ChangeDetectorRef) {
    this.windows.observeZ.subscribe(zindex => this.zindex = zindex);
    this.windows.observeAboutZ.subscribe(aboutzindex => this.aboutzindex = aboutzindex);
  }

  ngOnInit(){
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(){
    this.windows.editZ(this.zindex + 1);
    this.windows.editAboutZ(this.zindex + 2);
  }

  close(){
    this.windows.editAbout(false);
  }

  min(){
    this.aboutzindex = -999;
    this.windows.editAboutZ(-999);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
        if(event.target.className != "min"){
          this.windows.editZ(this.zindex + 1);
          this.windows.editAboutZ(this.zindex + 2);
        }
    }
  }
}
