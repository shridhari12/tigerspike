import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { UserInfo } from '../../models/user-info.model';
import { UserService } from '../../services/user.service';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { SearchNotesResult } from '../../models/search-notes-result.model';
import { MapData } from 'src/app/modules/map/models/map-data.model';
import { Marker } from 'src/app/modules/map/models/marker.model';

@Component({
  selector: 'app-search-notes',
  templateUrl: './search-notes.component.html',
  styleUrls: ['./search-notes.component.css']
})
export class SearchNotesComponent implements OnInit {
  userMapData: MapData = { username: '', dataPoints: []};
  selectedUser: SearchNotesResult;
  userOptions: Array<UserInfo>;
  searchNotesForm: FormGroup;
  displayedColumns: string[] = ['firstName', 'lastName', 'email', 'options'];
  userLocationNotesData = new MatTableDataSource<SearchNotesResult>([]);
  selection = new SelectionModel<SearchNotesResult>(true, []);
  showMatchingMapPoints = false;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.getAllUsers();
    this.buildSearchNotesForm();
  }

  getAllUsers() {
    this.userService.getAllUsers()
     .subscribe(
       data => {
         this.userOptions = data;
       },
       (error) => {
         console.log('Request failed with error ', error);
       });
  }

  buildSearchNotesForm() {
    this.searchNotesForm = this.formBuilder.group({
      notes: new FormControl(''),
      user: new FormControl(null)
    });
  }

  searchUserLocationNotes() {
    const userId = this.searchNotesForm.get('user').value || null;
    const searchText = this.searchNotesForm.get('notes').value;
    this.userService.searchNotes(userId, searchText)
     .subscribe(data => {
       this.userLocationNotesData.data = [...data];
     });
  }

  showMatchingUserLocationNotes(selectedUser: SearchNotesResult) {
    this.showMatchingMapPoints = true;
    console.log('[search-notes][showMatchingUserLocationNotes][selectedUser] ', selectedUser);
    this.mapUserInfoToMarker(selectedUser);
  }

  mapUserInfoToMarker(selectedUser: SearchNotesResult) {
    const userFullName = `${selectedUser.userInfo.firstName} ${selectedUser.userInfo.lastName}`;
    const mapDataPoints = selectedUser.matchingLocations.map<Marker>((loc, index) => {
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
       this.userMapData = {
         username: this.userMapData.username,
         dataPoints: [...mapDataPoints]
       };
     });
  }

}
