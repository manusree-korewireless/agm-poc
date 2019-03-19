import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { MapService } from './map/map.service';
import { HttpModule, JsonpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
//import bootstrap from "bootstrap";

@NgModule({
  declarations: [
    AppComponent,
    MapComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    JsonpModule,
    HttpClientModule,
    NgbModule.forRoot(),

    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAWoCHGzZmNSFKhEbDjsughQ4x8BXmNvT4'
    })
  ],
  providers: [MapService],
  bootstrap: [AppComponent]
})
export class AppModule { }
