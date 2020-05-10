import { Component, OnInit, ElementRef, HostListener, AfterViewChecked, AfterViewInit } from '@angular/core';
import { WindowsService } from '../windows.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit, AfterViewInit, AfterViewChecked {
  zindex: number;
  errorzindex: number;
  top: number;
  left: number;

  constructor(private eRef: ElementRef, private windows: WindowsService, private cdRef: ChangeDetectorRef) {
    this.windows.observeZ.subscribe(zindex => this.zindex = zindex);
  }

  ngOnInit(): void {
    this.top = Math.floor(Math.random() * Math.floor(100));
    this.left = Math.floor(Math.random() * Math.floor(100));
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(){
    this.windows.editZ(this.zindex + 1);
    this.errorzindex = this.zindex + 2;
    this.playAudio();
  }

  playAudio(){
    let audio = new Audio();
    audio.src = "assets/error.mp3";
    audio.load();
    audio.play();
  }

  close(){
    this.eRef.nativeElement.remove();
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      this.windows.editZ(this.zindex + 1);
      this.errorzindex = this.zindex + 2;
    }
  }

}
