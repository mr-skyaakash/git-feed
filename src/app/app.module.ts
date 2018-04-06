import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { MainFeedComponent } from './components/main-feed/main-feed.component';
import { FetchFeedService } from './services/fetch-feed.service';
import { CheckDescription } from './_pipes/check-description.pipe';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    MainFeedComponent,
    CheckDescription
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule
  ],
  providers: [FetchFeedService],
  bootstrap: [AppComponent]
})
export class AppModule { }
