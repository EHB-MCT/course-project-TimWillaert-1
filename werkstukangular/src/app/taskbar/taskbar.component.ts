import { Component, OnInit, HostListener, ElementRef } from '@angular/core';
import { formatDate, CommonModule } from '@angular/common';
import { WindowsService } from '../windows.service';

@Component({
  selector: 'app-taskbar',
  templateUrl: './taskbar.component.html',
  styleUrls: ['./taskbar.component.css']
})
export class TaskbarComponent implements OnInit {
  zindex: number;
  aboutzindex: number;
  practicalzindex: number;
  partnerszindex: number;
  programzindex: number;
  ticketszindex: number;

  clicked = false;

  aboutActive: boolean;
  practicalActive: boolean;
  partnersActive: boolean;
  programActive: boolean;
  ticketsActive: boolean;

  formattedTime: string = formatDate(new Date(), 'hh:mm a', 'en-US');

  constructor(private eRef: ElementRef, private windows: WindowsService) {
    setInterval(() => {
      this.formattedTime = formatDate(new Date(), 'hh:mm a', 'en-US');
    }, 1000);
    this.windows.observeAbout.subscribe(aboutActive => this.aboutActive = aboutActive);
    this.windows.observePractical.subscribe(practicalActive => this.practicalActive = practicalActive);
    this.windows.observePartners.subscribe(partnersActive => this.partnersActive = partnersActive);
    this.windows.observeProgram.subscribe(programActive => this.programActive = programActive);
    this.windows.observeTickets.subscribe(ticketsActive => this.ticketsActive = ticketsActive);

    this.windows.observeZ.subscribe(zindex => this.zindex = zindex);
    this.windows.observeAboutZ.subscribe(aboutzindex => this.aboutzindex = aboutzindex);
    this.windows.observePracticalZ.subscribe(practicalzindex => this.practicalzindex = practicalzindex);
    this.windows.observePartnersZ.subscribe(partnerszindex => this.partnerszindex = partnerszindex);
    this.windows.observeProgramZ.subscribe(programzindex => this.programzindex = programzindex);
    this.windows.observeTicketsZ.subscribe(ticketszindex => this.ticketszindex = ticketszindex);
  }

  startClick(){
    this.clicked = !this.clicked;
  }

  clickAbout(){
    this.windows.editAbout(true);
    this.clicked = false;
    this.windows.editZ(this.zindex + 1);
    this.windows.editAboutZ(this.zindex + 2);
  }

  clickPractical(){
    this.windows.editPractical(true);
    this.clicked = false;
    this.windows.editZ(this.zindex + 1);
    this.windows.editPracticalZ(this.zindex + 2);
  }

  clickPartners(){
    this.windows.editPartners(true);
    this.clicked = false;
    this.windows.editZ(this.zindex + 1);
    this.windows.editPartnersZ(this.zindex + 2);
  }

  clickProgram(){
    this.windows.editProgram(true);
    this.clicked = false;
    this.windows.editZ(this.zindex + 1);
    this.windows.editProgramZ(this.zindex + 2);
  }

  clickTickets(){
    this.windows.editTickets(true);
    this.clicked = false;
    this.windows.editZ(this.zindex + 1);
    this.windows.editTicketsZ(this.zindex + 2);
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
