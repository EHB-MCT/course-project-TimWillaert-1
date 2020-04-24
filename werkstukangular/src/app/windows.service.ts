import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WindowsService {
  private aboutActive = new BehaviorSubject<boolean>(false);
  observeAbout = this.aboutActive.asObservable();

  constructor() { }

  editAbout(value){
    this.aboutActive.next(value);
  }
}
