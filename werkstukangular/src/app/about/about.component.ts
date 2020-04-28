import { Component, OnInit, HostListener, ElementRef, Renderer2, AfterViewInit } from '@angular/core';
import { WindowsService } from '../windows.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit, AfterViewInit {
  zindex: number;
  aboutzindex: number;

  constructor(private eRef: ElementRef, private windows: WindowsService) {
    this.windows.observeZ.subscribe(zindex => this.zindex = zindex);
    this.windows.observeAboutZ.subscribe(aboutzindex => this.aboutzindex = aboutzindex);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.windows.editZ(this.zindex + 1);
    this.windows.editAboutZ(this.zindex + 2);
  }

  public close(){
    this.windows.editAbout(false);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      this.windows.editZ(this.zindex + 1);
      this.windows.editAboutZ(this.zindex + 2);
    }
  }

}
