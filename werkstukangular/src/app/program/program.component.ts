import { Component, OnInit, ElementRef, HostListener, ViewChild, AfterViewInit, AfterViewChecked } from '@angular/core';
import { WindowsService } from '../windows.service';
import { DataService } from '../data.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit, AfterViewInit, AfterViewChecked {
  zindex: number;
  programzindex: number;
  isLoading: boolean = true;
  error: boolean = false;
  data: any[] = [];
  colors: string[] = ['	#d91ad9', '#d96d1a', '#0eb802', '#021ab8', '#84016a', '#ff0606', '#69d9d2'];
  hours: number[] = [9, 10, 11, 12, 13, 14, 15, 16, 17, 18];
  minutes: string[] = ['0900', '0930', '1000', '1030', '1100', '1130', '1200', '1230', '1300', '1330', '1400',
   '1430', '1500', '1530', '1600', '1630', '1700', '1730', '1800', '1830'];
  filledSlots = 0;
  remainingSlots = Array(20);

  showProgram: boolean = false;
  showSpeaker: boolean = false;
  showSession: boolean = false;

  speaker: any;
  session: any;

  OSName: string;

  constructor(private eRef: ElementRef, private windows: WindowsService, private api: DataService, private cdRef: ChangeDetectorRef) {
    this.windows.observeZ.subscribe(zindex => this.zindex = zindex);
    this.windows.observeProgramZ.subscribe(programzindex => this.programzindex = programzindex);

    this.windows.observeOS.subscribe(OSName => this.OSName = OSName);
  }

  ngOnInit(): void {
    this.api.getSessions()
    .subscribe((data: any = {}) => {
        for(const session of data.data){
          this.data.push(session);
        }
        this.countSlots(data.data);
        this.remainingSlots = Array(20 - this.filledSlots);
        this.isLoading = false;
        this.showProgram = true;
    },
    (error) => {
      console.log(error);
      this.error = true;
    }
    );
  }

  countSlots(data){
    for(let session of data){
      let slotsArr = this.getSlots(session.time_start, session.time_end);
      let slots = slotsArr.length;
      this.filledSlots += slots;
    }
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(){
    this.windows.editZ(this.zindex + 1);
    this.windows.editProgramZ(this.zindex + 2);
  }

  close(){
    this.windows.editProgram(false);
  }

  min(){
    this.programzindex = -999;
    this.windows.editProgramZ(-999);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      if(event.target.className != "minimize"){
        this.windows.editZ(this.zindex + 1);
        this.windows.editProgramZ(this.zindex + 2);
      }
  }
  }

  getArea(time_start, time_end){
    let timeStart = time_start.slice(0, 2) + time_start.slice(3, 5);
    let startMinute = time_start.slice(3, 5);
    let timeEnd = time_end.slice(0, 2) + time_end.slice(3, 5);
    let endMinute = time_end.slice(3, 5);

    if(startMinute == '30'){
      timeStart = time_start.slice(0, 2) + '50';
    }

    if(endMinute == '30'){
      timeEnd = time_end.slice(0, 2) + '50';
    }

    let slot = 'slot' + timeStart + '/' + 'slot' + timeStart + '/' + 'slot' + (+timeEnd - 50) + '/' + 'slot' + (+timeEnd - 50);
    return slot;
  }

  getSlots(time_start, time_end){
    let timeStart = time_start.slice(0, 2) + time_start.slice(3, 5);
    let startMinute = time_start.slice(3, 5);
    let timeEnd = time_end.slice(0, 2) + time_end.slice(3, 5);
    let endMinute = time_end.slice(3, 5);

    if(startMinute == '30'){
      timeStart = time_start.slice(0, 2) + '50';
    }

    if(endMinute == '30'){
      timeEnd = time_end.slice(0, 2) + '50';
    }

    return Array((timeEnd - timeStart) / 50);
  }

  getColor(id){
    return this.colors[id - 1];
  }

  isRound(minute){
    if(minute.slice(2, 4) == '00'){
      return true;
    } else{
      return false;
    }
  }

  clickReturn(){
    this.showSpeaker = false;
    this.showSession = false;
    this.showProgram = true;
  }

  clickSpeaker(id){
    this.isLoading = true;
    this.showProgram = false;
    this.showSession = false;
    this.api.getSpeaker(id)
    .subscribe((data: any = {}) => {
        this.speaker = data.data;
        this.showSpeaker = true;
        this.isLoading = false;
    },
    (error) => {
      console.log(error);
      this.error = true;
    }
    );
  }

  clickSession(id){
    this.isLoading = true;
    this.showProgram = false;
    this.showSpeaker = false;
    this.api.getSession(id)
    .subscribe((data: any = {}) => {
        this.session = data.data;
        this.showSession = true;
        this.isLoading = false;
    },
    (error) => {
      console.log(error);
      this.error = true;
    }
    );
  }

}
