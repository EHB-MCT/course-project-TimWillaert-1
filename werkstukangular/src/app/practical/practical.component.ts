import { Component, OnInit, ElementRef, Renderer2, HostListener, AfterViewInit } from '@angular/core';
import { WindowsService } from '../windows.service';

@Component({
  selector: 'app-practical',
  templateUrl: './practical.component.html',
  styleUrls: ['./practical.component.css']
})
export class PracticalComponent implements OnInit, AfterViewInit {
  zindex: number;
  practicalzindex: number;

  constructor(private eRef: ElementRef, private windows: WindowsService) {
    this.windows.observeZ.subscribe(zindex => this.zindex = zindex);
    this.windows.observePracticalZ.subscribe(practicalzindex => this.practicalzindex = practicalzindex);
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(){
    this.windows.editZ(this.zindex + 1);
    this.windows.editPracticalZ(this.zindex + 2);
  }

  public close(){
    this.windows.editPractical(false);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      this.windows.editZ(this.zindex + 1);
      this.windows.editPracticalZ(this.zindex + 2);
    }
  }

}
