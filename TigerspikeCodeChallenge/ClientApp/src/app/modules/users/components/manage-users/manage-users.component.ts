import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { UserService } from '../../services/user.service';
import { UserInfo } from '../../models/user-info.model';
import { Marker } from 'src/app/modules/map/models/marker.model';
import { MapData } from 'src/app/modules/map/models/map-data.model';
import { UserLocation } from '../../models/user-location.model';
import { AddUserLocation } from '../../models/add-user-location.model';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent implements OnInit {
  users: Array<UserInfo>;
  userMapData: MapData = { username: '', dataPoints: []};
  selectedUser: UserInfo;
  showUserInfo = false;
  showAddLocation = false;
  currentLocation: Marker;
  // isCurrentLocationVisible = false;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit() {
    this.getCurrentLocation();
    this.getAllUsers();
  }

  getAllUsers() {
    this.userService.getAllUsers()
     .subscribe(
       data => {
         this.users = data;
       },
       (error) => {
         console.log('Request failed with error ', error);
       });
  }

  mapToMarker(data: Array<UserInfo>) {
    data.forEach(d => {
      this.userMapData.username = `${d.firstName} ${d.lastName}`;
      this.userMapData.dataPoints = d.locations.map((loc, index) => {
        const markerLabel = `${d.firstName} ${d.lastName} Location# ${index}`;
        return {
          userId: loc.userId,
          locationId: loc.id,
          lat: loc.latitude,
          lng: loc.longitude,
          label: markerLabel,
          draggable: false,
          notes: loc.notes
        };
      });
    });
  }

  showUserDetails(user: UserInfo) {
    this.selectedUser = { ...user };
    this.showUserInfo = !this.showUserInfo;
    this.getUserLocations();
  }

  getUserLocations() {
    this.userService.getUserLocations(this.selectedUser.id)
     .subscribe(locations => {
       this.selectedUser = {
         ...this.selectedUser,
         locations: locations
       };
       this.mapUserInfoToMarker();
     });
  }

  mapUserInfoToMarker() {
    const userFullName = `${this.selectedUser.firstName} ${this.selectedUser.lastName}`;
    const mapDataPoints = this.selectedUser.locations.map<Marker>((loc, index) => {
      const markerLabel = `${userFullName} Location# ${index}`;
      return {
        userId: loc.userId,
        locationId: loc.id,
        lat: loc.latitude,
        lng: loc.longitude,
        label: markerLabel,
        draggable: false,
        notes: loc.notes,
        address: {
          userId: loc.userId,
          addressLine1: loc.addressLine1,
          addressLine2: loc.addressLine2,
          suburb: loc.suburb,
          city: loc.city,
          state: loc.state,
          country: loc.country,
          postcode: loc.postcode,
          latitude: loc.latitude,
          longitude: loc.longitude,
          isCurrent: loc.isCurrent,
          notes: loc.notes
        },
        isCurrentLocation: loc.isCurrent
      };
    });
    const mapData: MapData = {
      username: userFullName,
      dataPoints: mapDataPoints
    };
    this.userMapData = {...mapData};
  }

  showCurrentLocation(user: UserInfo) {
    this.selectedUser = { ...user };
    this.showUserInfo = true;
    this.currentLocation = { userId: user.id, ...this.currentLocation };
    // plot the current location in the map
    const userFullName = `${this.selectedUser.firstName} ${this.selectedUser.lastName}`;
    this.userMapData.username = userFullName;
    this.userMapData.dataPoints = [{...this.currentLocation}];
    // this.userMapData.dataPoints.push(this.currentLocation);
  }

  getCurrentLocation(): void {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((pos) => {
          if (pos) {
            this.getAddressFromCurrentLocationCoords(
              pos.coords.latitude,
              pos.coords.longitude);
          }
        },
        (error) => {
          throw error;
        });
      }
  }

  getAddressFromCurrentLocationCoords(latitude: number, longitude: number) {
    let result: Array<any> = [];
      let address: string;
      this.userService.getAddressFromCoordinates(latitude, longitude)
       .subscribe(response => {
       if (response && response.hasOwnProperty('results')) {
         result = response['results'];
         address = result[0].formatted_address; // location.lat
         const [ address1, address2, suburb, city, postcode, state, country ] = this.extractAddressComponents(address);
         this.currentLocation = {
            lat: latitude,
            lng: longitude,
            address: {
              addressLine1: address1,
              addressLine2: address2,
              suburb: suburb,
              city: city,
              postcode: postcode,
              state: state,
              country: country,
              isCurrent: true,
              latitude: latitude,
              longitude: longitude,
              notes: null,
              userId: null
            },
            label: 'Current Location',
            draggable: false,
            isCurrentLocation: true
          };
       }
      },
      (error) => {
        console.log('Request failed with error ', error);
      });
  }

  addLocationHandler(user: UserInfo) {
    this.selectedUser = {...user};
    this.showAddLocation = !this.showAddLocation;
  }

  mapClickHandler(marker: Marker) {
    console.log('[manage-users][mapLocationClick] ', marker);
      this.saveUserLocation(
        marker.userId,
        marker.locationId,
        marker.address.addressLine1,
        marker.address.addressLine2,
        marker.address.postcode,
        marker.address.suburb,
        marker.address.state,
        marker.address.city,
        marker.address.country,
        marker.lat,
        marker.lng,
        marker.isCurrentLocation,
        marker.notes
       );
  }

  extractAddressComponents(address: string): Array<string> {
    const addressParts: Array<string> = [];
    const addressComponents = address.split(',');
    const address1 = addressComponents[0].trim();
    const suburbStatePostcode = addressComponents[1].trim().split(' ') || null;
    const cityCountry = addressComponents[2].trim().split(' ') || null;
    let suburb, state, postcode;
    if (suburbStatePostcode.length % 4 === 0) {
     suburb = `${suburbStatePostcode[0]} ${suburbStatePostcode[1]}`;
     state = suburbStatePostcode[2];
     postcode = suburbStatePostcode[3];
    } else if (suburbStatePostcode.length % 3 === 0) {
     suburb = suburbStatePostcode[0];
     state = suburbStatePostcode[1];
     postcode = suburbStatePostcode[2];
    }
    const city = ''; // cityCountry[0].trim();
    const country = cityCountry[0].trim();
    addressParts.push(address1);
    addressParts.push('');
    addressParts.push(suburb);
    addressParts.push(city);
    addressParts.push(postcode);
    addressParts.push(state);
    addressParts.push(country);
    return addressParts;
  }

  saveUserLocation(userId: string, locationId: string, address1: string, address2: string,
    postcode: string, suburb: string, state: string, city: string, country: string,
    latitude: number, longitude: number, isCurrent: boolean, notes: string) {

    this.userService.saveUserLocation(
      userId,
      locationId,
      address1,
      address2,
      postcode,
      suburb,
      state,
      city,
      country,
      latitude,
      longitude,
      isCurrent,
      notes)
      .subscribe(
        data => {
          console.log('[manage-user][saveUserLocation]');
          this.updateMapData(data);
        }
      );
  }

  saveUserLocationNotes(userId: string, locationId: string, notes: string) {

    this.userService.saveUserLocationNotes(userId, locationId, notes)
      .subscribe(data => {
        this.updateMapData(data);
      },
      error => {
        console.log('[manage-users][saveUserLocationNotes][error] ', error);
      });
  }

  updateMapData(location: UserLocation) {
    // If updating marker for current user location
    if (location && location.isCurrent) {
      const index = this.userMapData.dataPoints.findIndex(
        dp => dp.userId === location.userId
        && dp.isCurrentLocation === true);
      const currentDataPoint = this.userMapData.dataPoints[index];
      const updatedDataPoint = {
        locationId: location.id,
        notes: location.notes,
        ...currentDataPoint
      };
      this.userMapData.dataPoints = [{...updatedDataPoint}];
    } else {
      const index = this.userMapData.dataPoints
      .findIndex(dp => dp.userId === location.userId
       && dp.locationId === location.id);
       if (index === -1) {// Newly added UserLocation

       } else if (index > 0) {// Update existing UserLocation
        this.userMapData.dataPoints[index].notes = location.notes;
       }
    }
  }

  addUserLocationHandler(userLocationToBeAdded: AddUserLocation) {
    const userId = userLocationToBeAdded.userId;
    const address1 = userLocationToBeAdded.addressLine1;
    const address2 = userLocationToBeAdded.addressLine2;
    const postcode = userLocationToBeAdded.postcode;
    const suburb = userLocationToBeAdded.suburb;
    const state = userLocationToBeAdded.state;
    const city = userLocationToBeAdded.city;
    const country = userLocationToBeAdded.country;
    const latitude = userLocationToBeAdded.latitude;
    const longitude = userLocationToBeAdded.longitude;
    const isCurrent = userLocationToBeAdded.isCurrent;
    const notes = userLocationToBeAdded.notes;

    this.saveUserLocation(
      userId,
      null,
      address1,
      address2,
      postcode,
      suburb,
      state,
      city,
      country,
      latitude,
      longitude,
      isCurrent,
      notes
    );
  }

  mapPointDeleteHandler(marker: Marker) {
    console.log('[map][mampPointDeleteHandler] ', marker);
    this.userService.deleteUserLocation(marker.userId, marker.locationId)
     .subscribe(deleteResponse => {
       console.log('[map][mapPointDeleteHandler][deleteResponse] ', deleteResponse);
       const deletedLocationIndex =
        this.userMapData.dataPoints.findIndex(
         mp => mp.userId === marker.userId
         && mp.locationId === marker.locationId);
         const mapDataPoints = this.userMapData.dataPoints.filter(dp => dp.userId === marker.userId && dp.locationId !== marker.locationId);
       //this.userMapData.dataPoints.splice(deletedLocationIndex, 1);
       this.userMapData = {
         username: this.userMapData.username,
         dataPoints: [...mapDataPoints]
       };
     });
  }

}
