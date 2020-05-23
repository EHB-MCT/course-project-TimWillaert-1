import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  getPartners(){
    return this.http.get('https://backend-timw.herokuapp.com/api/partners');
  }

  getTickets(){
    return this.http.get('https://backend-timw.herokuapp.com/api/tickets');
  }

  getSessions(){
    return this.http.get('https://backend-timw.herokuapp.com/api/sessions');
  }

  getSpeaker(id){
    return this.http.get('https://backend-timw.herokuapp.com/api/speakers/'+id)
  }

  getSpeakers(){
    return this.http.get('https://backend-timw.herokuapp.com/api/speakers');
  }

  getSession(id){
    return this.http.get('https://backend-timw.herokuapp.com/api/sessions/'+id)
  }
}
