import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapComponent } from './components/map/map.component';
import { MapControlComponent } from './components/map-control/map-control.component';
import { AgmCoreModule } from '@agm/core';
import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations: [
    MapComponent,
    MapControlComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyASYMYaEz7tZHZ_Q5L8QJpi56cxQeGNTSE'
    })
  ]
})
export class MapModule { }
