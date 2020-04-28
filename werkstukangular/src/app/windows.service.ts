import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowsService {
  private zindex = new BehaviorSubject<number>(1);
  observeZ = this.zindex.asObservable();

  private aboutZ = new BehaviorSubject<number>(1);
  observeAboutZ = this.aboutZ.asObservable();

  private practicalZ = new BehaviorSubject<number>(1);
  observePracticalZ = this.practicalZ.asObservable();

  private aboutActive = new BehaviorSubject<boolean>(false);
  observeAbout = this.aboutActive.asObservable();

  private practicalActive = new BehaviorSubject<boolean>(false);
  observePractical = this.practicalActive.asObservable();

  constructor() { }

  editZ(value: number){
    this.zindex.next(value);
  }

  editAboutZ(value: number){
    this.aboutZ.next(value);
  }

  editPracticalZ(value: number){
    this.practicalZ.next(value);
  }

  editAbout(value: boolean){
    this.aboutActive.next(value);
  }

  editPractical(value: boolean){
    this.practicalActive.next(value);
  }

}
