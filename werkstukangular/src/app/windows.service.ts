import { Injectable, OnInit } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowsService{

  private OSName = new BehaviorSubject<string>('');
  observeOS = this.OSName.asObservable();

  private zindex = new BehaviorSubject<number>(1);
  observeZ = this.zindex.asObservable();

  private aboutZ = new BehaviorSubject<number>(1);
  observeAboutZ = this.aboutZ.asObservable();

  private practicalZ = new BehaviorSubject<number>(1);
  observePracticalZ = this.practicalZ.asObservable();

  private partnersZ = new BehaviorSubject<number>(1);
  observePartnersZ = this.partnersZ.asObservable();

  private programZ = new BehaviorSubject<number>(1);
  observeProgramZ = this.programZ.asObservable();

  private ticketsZ = new BehaviorSubject<number>(1);
  observeTicketsZ = this.ticketsZ.asObservable();

  private aboutActive = new BehaviorSubject<boolean>(false);
  observeAbout = this.aboutActive.asObservable();

  private practicalActive = new BehaviorSubject<boolean>(false);
  observePractical = this.practicalActive.asObservable();

  private partnersActive = new BehaviorSubject<boolean>(false);
  observePartners = this.partnersActive.asObservable();

  private programActive = new BehaviorSubject<boolean>(false);
  observeProgram = this.programActive.asObservable();

  private ticketsActive = new BehaviorSubject<boolean>(false);
  observeTickets = this.ticketsActive.asObservable();

  constructor() {
    if (navigator.appVersion.indexOf('Mac') != -1){
      this.editOS('Mac');
    } else{
      this.editOS('Windows');
    }
    console.log(this.OSName.value);
  }

  editOS(value: string){
    this.OSName.next(value);
  }

  editZ(value: number){
    this.zindex.next(value);
  }

  editAboutZ(value: number){
    this.aboutZ.next(value);
  }

  editPracticalZ(value: number){
    this.practicalZ.next(value);
  }

  editProgramZ(value: number){
    this.programZ.next(value);
  }

  editPartnersZ(value: number){
    this.partnersZ.next(value);
  }

  editTicketsZ(value: number){
    this.ticketsZ.next(value);
  }

  editAbout(value: boolean){
    this.aboutActive.next(value);
  }

  editPractical(value: boolean){
    this.practicalActive.next(value);
  }

  editPartners(value: boolean){
    this.partnersActive.next(value);
  }

  editProgram(value: boolean){
    this.programActive.next(value);
  }

  editTickets(value: boolean){
    this.ticketsActive.next(value);
  }

}
