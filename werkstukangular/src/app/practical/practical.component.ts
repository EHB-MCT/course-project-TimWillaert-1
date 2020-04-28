import { Component, OnInit, ElementRef, Renderer2, HostListener } from '@angular/core';
import { WindowsService } from '../windows.service';

@Component({
  selector: 'app-practical',
  templateUrl: './practical.component.html',
  styleUrls: ['./practical.component.css']
})
export class PracticalComponent implements OnInit {
  zindex: number;

  constructor(private eRef: ElementRef, private renderer: Renderer2, private windows: WindowsService) {
    this.windows.observeZ.subscribe(zindex => this.zindex = zindex);
  }

  ngOnInit(): void {
  }

  public close(){
    this.windows.editPractical(false);
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
