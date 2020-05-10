import { Component, OnInit, ElementRef, AfterViewInit, HostListener, AfterViewChecked } from '@angular/core';
import { WindowsService } from '../windows.service';
import { DataService } from '../data.service';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-partners',
  templateUrl: './partners.component.html',
  styleUrls: ['./partners.component.css']
})
export class PartnersComponent implements OnInit, AfterViewInit, AfterViewChecked {
  zindex: number;
  partnerszindex: number;
  gold: any = {};
  silver: any = {};
  bronze: any = {};
  isLoading: boolean = true;
  error: boolean = false;

  OSName: string;

  constructor(private eRef: ElementRef, private windows: WindowsService, private api: DataService, private cdRef: ChangeDetectorRef) {
    this.windows.observeZ.subscribe(zindex => this.zindex = zindex);
    this.windows.observePartnersZ.subscribe(partnerszindex => this.partnerszindex = partnerszindex);

    this.windows.observeOS.subscribe(OSName => this.OSName = OSName);
  }

  ngOnInit(){
    this.api.getPartners()
      .subscribe((data: any = {}) => {
          this.gold = data.data.Gold;
          this.silver = data.data.Silver;
          this.bronze = data.data.Bronze;
          this.isLoading = false;
      },
      (error) => {
        console.log(error);
        this.error = true;
      });
  }

  ngAfterViewChecked(){
    this.cdRef.detectChanges();
  }

  ngAfterViewInit(){
    this.windows.editZ(this.zindex + 1);
    this.windows.editPartnersZ(this.zindex + 2);
  }

  close(){
    this.windows.editPartners(false);
  }

  min(){
    this.partnerszindex = -999;
    this.windows.editPartnersZ(-999);
  }

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if(this.eRef.nativeElement.contains(event.target)) {
      if(event.target.className != "min"){
        this.windows.editZ(this.zindex + 1);
        this.windows.editPartnersZ(this.zindex + 2);
    }
  }

  }

}
