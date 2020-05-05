import { Component, OnInit, ElementRef, HostListener } from '@angular/core';
import { WindowsService } from '../windows.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.css']
})
export class TicketsComponent implements OnInit {
  zindex: number;
  ticketszindex: number;
  data: any[] = [];
  isLoading: boolean = true;
  error: boolean = false;
  people: any[] = [];
  peopleCount: number = 0;
  rawPrice: number = 0;
  convertedPrice: number = 0;
  isDiscounted: boolean = false;
  canContinue: boolean = false;

  constructor(private eRef: ElementRef, private windows: WindowsService, private http: HttpClient) {
    this.windows.observeZ.subscribe(zindex => this.zindex = zindex);
    this.windows.observeTicketsZ.subscribe(ticketszindex => this.ticketszindex = ticketszindex);
  }

  ngOnInit(): void {
    this.http.get('https://backend-timw.herokuapp.com/api/tickets')
    .subscribe((data: any = {}) => {
        for(const ticket of data.data){
          this.data.push(ticket);
        }
        this.isLoading = false;
    },
    (error) => {
      this.error = true;
    }
    );
  }

  addPerson(){
    this.peopleCount += 1;
    this.people = Array(this.peopleCount);
    this.updatePrice();
  }

  removePerson(event){
    let ele = event.target;
    let parent = ele.parentNode;
    parent.remove();
    this.updatePrice();
  }

  updatePrice(){
    this.rawPrice = 0;
    this.isDiscounted = false;
    this.canContinue = false;
    setTimeout(() => {
      let elements = this.eRef.nativeElement.querySelectorAll('.ticket');
      for(let element of elements){
        this.rawPrice += parseInt(element.value);
      }
      if(elements.length >= 6){
        this.convertedPrice = this.rawPrice * 0.90;
        this.isDiscounted = true;
        this.canContinue = true;
      } else if(elements.length <= 0){
        this.convertedPrice = this.rawPrice;
        this.canContinue = false;
      } else{
        this.convertedPrice = this.rawPrice;
        this.canContinue = true;
      }
    }, 1);
  }

  ngAfterViewInit(){
    this.windows.editZ(this.zindex + 1);
    this.windows.editTicketsZ(this.zindex + 2);
  }

  close(){
    this.windows.editTickets(false);
  }

  min(){
    this.ticketszindex = -999;
    this.windows.editTicketsZ(-999);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      if(event.target.className != "min"){
        this.windows.editZ(this.zindex + 1);
        this.windows.editAboutZ(this.zindex + 2);
      }
  }
  }

}
