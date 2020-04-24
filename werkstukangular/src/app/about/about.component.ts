import { Component, OnInit } from '@angular/core';
import { WindowsService } from '../windows.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor(private windows: WindowsService) { }

  ngOnInit(): void {

  }

  public close(){
    this.windows.editAbout(false);
  }

}
