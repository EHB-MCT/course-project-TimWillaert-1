import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoadingComponent } from './loading/loading.component';
import { TaskbarComponent } from './taskbar/taskbar.component';
import { DesktopiconsComponent } from './desktopicons/desktopicons.component';
import { AboutComponent } from './about/about.component';
import { WindowsService } from './windows.service';

@NgModule({
  declarations: [
    AppComponent,
    LoadingComponent,
    TaskbarComponent,
    DesktopiconsComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [WindowsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
