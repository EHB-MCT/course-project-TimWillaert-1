import { Component, OnInit, ElementRef, HostListener, AfterViewInit, AfterViewChecked } from '@angular/core';
import { WindowsService } from '../windows.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-practical',
  templateUrl: './practical.component.html',
  styleUrls: ['./practical.component.css']
})
export class PracticalComponent implements OnInit, AfterViewInit, AfterViewChecked {
  zindex: number;
  practicalzindex: number;

  OSName: string;

  constructor(private eRef: ElementRef, private windows: WindowsService, private cdRef: ChangeDetectorRef) {
    this.windows.observeZ.subscribe(zindex => this.zindex = zindex);
    this.windows.observePracticalZ.subscribe(practicalzindex => this.practicalzindex = practicalzindex);

    this.windows.observeOS.subscribe(OSName => this.OSName = OSName);
  }

  ngOnInit(): void {
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(){
    this.windows.editZ(this.zindex + 1);
    this.windows.editPracticalZ(this.zindex + 2);
  }

  close(){
    this.windows.editPractical(false);
  }

  min(){
    this.practicalzindex = -999;
    this.windows.editPracticalZ(-999);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      if(event.target.className != "min"){
        this.windows.editZ(this.zindex + 1);
        this.windows.editPracticalZ(this.zindex + 2);
      }
    }
  }
}
