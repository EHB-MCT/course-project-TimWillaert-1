import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './loading/loading.component';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { DesktopiconsComponent } from './desktopicons/desktopicons.component';
import { AboutComponent } from './about/about.component';
import { WindowsService } from './windows.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { PracticalComponent } from './practical/practical.component';
import { PartnersComponent } from './partners/partners.component';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    TaskbarComponent,
    DesktopiconsComponent,
    AboutComponent,
    PracticalComponent,
    PartnersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    DragDropModule,
    HttpClientModule
  ],
  providers: [WindowsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
