import { Component, OnInit, HostListener, ElementRef, Renderer2 } from '@angular/core';
import { WindowsService } from '../windows.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  zindex: number;

  constructor(private eRef: ElementRef, private renderer: Renderer2, private windows: WindowsService) {
    this.windows.observeZ.subscribe(zindex => this.zindex = zindex);
  }

  ngOnInit(): void {
  }

  public close(){
    this.windows.editAbout(false);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      const child = this.eRef.nativeElement.children[0];
      this.windows.editZ(this.zindex + 1);
      this.renderer.setStyle(child, 'z-index', this.zindex + 2);
    }
  }

}
