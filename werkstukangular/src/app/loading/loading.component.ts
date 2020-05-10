import { Component, OnInit } from '@angular/core';
import { WindowsService } from '../windows.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {

  OSName: string;

  constructor(private windows: WindowsService) {
    this.windows.observeOS.subscribe(OSName => this.OSName = OSName);
  }

  ngOnInit(): void {
  }

}
