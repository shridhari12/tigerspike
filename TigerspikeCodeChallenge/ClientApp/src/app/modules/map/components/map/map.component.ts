import { Component, OnInit, Input } from '@angular/core';
import { UserInfo } from '../../models/user-info.model';
import { ModuleMapNgFactoryLoader } from '@nguniversal/module-map-ngfactory-loader';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  @Input() showMap = false;
  mapDataPoints: Array<UserInfo> = [];
  constructor() { }

  ngOnInit() {
    this.getCurrentGeoPosition();
  }

  getCurrentGeoPosition() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        if (pos) {
          const currentUserInfo: UserInfo = {
            locationLat: pos.coords.latitude,
            locationLng: pos.coords.longitude
          };
          // const currentUserInfo: UserInfo = {
          //   locationLat: -27.588730,
          //   locationLng: 153.050150,
          //   notes: 'This is the current user location notes'
          // };
          this.mapDataPoints.push(currentUserInfo);
          this.showMapComponent();
        }
      });
    }
  }

  showMapComponent() {
    this.showMap = !this.showMap;
  }

}
