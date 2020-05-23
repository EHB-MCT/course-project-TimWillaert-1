import { Component, OnInit, ElementRef, ChangeDetectorRef, AfterViewChecked, AfterViewInit, HostListener } from '@angular/core';
import { WindowsService } from '../windows.service';
import { DataService } from '../data.service';

@Component({
  selector: 'app-coachingsessions',
  templateUrl: './coachingsessions.component.html',
  styleUrls: ['./coachingsessions.component.css']
})
export class CoachingsessionsComponent implements OnInit, AfterViewChecked, AfterViewInit {
  zindex: number;
  coachingsessionszindex: number;
  OSName: string;
  data: any[] = [];
  error: boolean = false;
  isLoading: boolean = true;

  constructor(private eRef: ElementRef, private windows: WindowsService, private api: DataService, private cdRef: ChangeDetectorRef) {
    this.windows.observeZ.subscribe(zindex => this.zindex = zindex);
    this.windows.observeCoachingSessionsZ.subscribe(coachingsessionszindex => this.coachingsessionszindex = coachingsessionszindex);

    this.windows.observeOS.subscribe(OSName => this.OSName = OSName);
  }

  ngOnInit(): void {
    this.api.getSpeakers()
    .subscribe((data: any = {}) => {
        for(const speaker of data.data){
          this.data.push(speaker);
        }
        this.isLoading = false;
    },
    (error) => {
      console.log(error);
      this.error = true;
    }
    );
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(){
    this.windows.editZ(this.zindex + 1);
    this.windows.editCoachingSessionsZ(this.zindex + 2);
  }

  close(){
    this.windows.editCoachingSessions(false);
  }

  min(){
    this.coachingsessionszindex = -999;
    this.windows.editCoachingSessionsZ(-999);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      if(event.target.className != "min"){
        this.windows.editZ(this.zindex + 1);
        this.windows.editCoachingSessionsZ(this.zindex + 2);
      }
  }
  }

}
