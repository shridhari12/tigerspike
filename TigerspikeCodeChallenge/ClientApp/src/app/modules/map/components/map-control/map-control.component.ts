import { Component, OnInit, ViewChild, Input, AfterViewInit } from '@angular/core';
import { MouseEvent, AgmMap } from '@agm/core';
import { Marker } from '../../models/marker.model';
import { UserInfo } from '../../models/user-info.model';

@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.css']
})
export class MapControlComponent implements OnInit, AfterViewInit {
  @ViewChild(AgmMap, {static: true}) map: AgmMap;
  @Input() mapPoints: Array<UserInfo>;

  infoContent = '';
  mapTypeId = 'hybrid';
  markers: Array<Marker> = [];
  zoom = 12;

  constructor() { }

  ngOnInit() {
    this.mapToUserInfo(this.mapPoints);
  }

  ngAfterViewInit() {
    console.log('[map-control][ngAfterViewInit]');
  }

  mapToUserInfo(data: Array<UserInfo>) {
    let userLocationData = [];
    data.forEach(d => {
      userLocationData = d.userLocations.map(loc => {
        return {
          locationLat: loc.locationLat,
          locationLng: loc.locationLng
        };
      });
    });
    this.mapPoints.map((mapPoint, i) => {
      const markerLabel = `User # ${mapPoint.userId || 'No User'}`;
      mapPoint.userLocations.map(usrLoc => {
        this.addMapMarker(usrLoc.locationLat, usrLoc.locationLng, markerLabel);
      });
    });
  }

  markerClickHandler(label: string, index: number) {
    console.log(`clicked the marker: ${label || index}`);
  }

  mapClickHandler(event: MouseEvent) {
    this.markers.push({
      lat: event.coords.lat,
      lng: event.coords.lng,
      draggable: false
    });
  }

  addMapMarker(markerLat: number, markerLng: number, markerLabel: string) {
    const mapMarker: Marker = {
      label: markerLabel,
      lat: markerLat,
      lng: markerLng,
      draggable: false
    };
    this.markers.push(mapMarker);
  }

}
