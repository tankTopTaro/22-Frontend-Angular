import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, RoutingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NextDateDirective } from './next-date.directive';
import { HttpClientModule } from '@angular/common/http';
import { DataService } from './data.service';
import { DetailsFormComponent } from './details-form/details-form.component';

@NgModule({
  declarations: [
    AppComponent,
    RoutingComponents,
    NextDateDirective,
    DetailsFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    HttpClientModule
  ],
  providers: [DataService],
  bootstrap: [AppComponent]
})
export class AppModule { }
