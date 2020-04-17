import { Component, OnInit } from '@angular/core';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {
  formattedTime: string = formatDate(new Date(), 'hh:mm a', 'en-US');

  constructor() {
    setInterval(() => {
      this.formattedTime = formatDate(new Date(), 'hh:mm a', 'en-US');
    }, 1000);
}

  ngOnInit(): void {
  }

}
