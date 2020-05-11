import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './loading/loading.component';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { DesktopiconsComponent } from './desktopicons/desktopicons.component';
import { AboutComponent } from './about/about.component';
import { WindowsService } from './windows.service';
import { DataService } from './data.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PracticalComponent } from './practical/practical.component';
import { PartnersComponent } from './partners/partners.component';
import { HttpClientModule } from '@angular/common/http';
import { ProgramComponent } from './program/program.component';
import { TicketsComponent } from './tickets/tickets.component';
import { ErrorComponent } from './error/error.component';
import { DocumentationComponent } from './documentation/documentation.component';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    TaskbarComponent,
    DesktopiconsComponent,
    AboutComponent,
    PracticalComponent,
    PartnersComponent,
    ProgramComponent,
    TicketsComponent,
    ErrorComponent,
    DocumentationComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [WindowsService, DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
