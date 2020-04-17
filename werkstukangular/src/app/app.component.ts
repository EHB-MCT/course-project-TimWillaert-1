import { Component, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  title = 'Dots&Pix';
  isLoading = true;

  ngAfterViewInit(){
    setTimeout(() => {
      this.isLoading = false;
    }, 4000);
  }
}
