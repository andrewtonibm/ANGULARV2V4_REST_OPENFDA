import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routes';

import { AppComponent }  from './app.component';
import { ReactionsListComponent } from './reactions-list.component';
import { DrugsListComponent } from './drugs-list.component';

@NgModule({
  imports: [ BrowserModule, routing, FormsModule, HttpModule],
  declarations: [ AppComponent, ReactionsListComponent, DrugsListComponent],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
