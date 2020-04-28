import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { formatDate, CommonModule } from '@angular/common';
import { WindowsService } from '../windows.service';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {
  clicked = false;

  formattedTime: string = formatDate(new Date(), 'hh:mm a', 'en-US');

  constructor(private eRef: ElementRef, private windows: WindowsService) {
    setInterval(() => {
      this.formattedTime = formatDate(new Date(), 'hh:mm a', 'en-US');
    }, 1000);
  }

  startClick(){
    this.clicked = !this.clicked;
  }

  clickAbout(){
    this.windows.editAbout(true);
    this.clicked = false;
  }

  clickPractical(){
    this.windows.editPractical(true);
    this.clicked = false;
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(!this.eRef.nativeElement.contains(event.target)) {
      this.clicked = false;
    }
  }

  ngOnInit(): void {
  }

}
