import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfo } from '../models/user-info.model';
import { Position } from '../../map/models/position.model';
import { UserLocation } from '../models/user-location.model';
import { AddUserLocationNotes } from '../models/add-user-location-notes.model';
import { Observable, of } from 'rxjs';
import { AddUserLocation } from '../models/add-user-location.model';
import { MOCK_STATES } from '../models/mock-states.model';
import { State } from '../models/state.model';
import { Country } from '../models/country.model';
import { MOCK_COUNTRIES } from '../models/mock-countries.model';
import { DeleteUserLocation } from '../models/delete-user-location.model';

const BASE_URL = 'https://localhost:5001/api/tigerspike';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  getAllUsers(): Observable<Array<UserInfo>> {
    return this.http.get<Array<UserInfo>>(`${BASE_URL}/users`);
  }

  getUserLocations(userId: string): Observable<Array<UserLocation>> {
    return this.http.get<Array<UserLocation>>(`${BASE_URL}/getuserlocations/${userId}`);
  }

  saveUserLocation(userId: string, locationId: string, addressLine1: string, addressLine2: string,
    postcode: string, suburb: string, state: string, city: string, country: string,
    latitude: number, longitude: number, isCurrent: boolean, notes: string)
    : Observable<UserLocation> {
      const body: AddUserLocation = {
        userId: userId,
        locationId: locationId,
        addressLine1: addressLine1,
        addressLine2: addressLine2,
        postcode: postcode,
        suburb: suburb,
        state: state,
        city: city,
        country: country,
        latitude: latitude,
        longitude: longitude,
        isCurrent: isCurrent,
        notes: notes
      };
      const headers = new HttpHeaders(
        {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD'
        });
      return this.http.post<UserLocation>(`${BASE_URL}/saveuserlocation`, body, { headers });
  }

  getCoordinatesForAddress(address: string): Observable<any> {
    return this.http.get('https://maps.googleapis.com/maps/api/geocode/json?address=' +
    address + '&key=AIzaSyASYMYaEz7tZHZ_Q5L8QJpi56cxQeGNTSE');
  }

  saveUserLocationNotes(userId: string, locationId: string, notes: string): Observable<UserLocation> {
    const body: AddUserLocationNotes = {
      userId: userId,
      locationId: locationId,
      notes: notes
    };
    const headers = new HttpHeaders(
      {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD'
      });
    return this.http.post<UserLocation>(`${BASE_URL}/addnotes`, body, { headers });
  }

  getAddressFromCoordinates(latitude: number, longitude: number): Observable<any> {
    return this.http.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=
      ${latitude},${longitude}&sensor=false&key=AIzaSyASYMYaEz7tZHZ_Q5L8QJpi56cxQeGNTSE`);
  }

  getStates(): Observable<Array<State>> {
    return of(MOCK_STATES);
  }

  getCountries(): Observable<Array<Country>> {
    return of(MOCK_COUNTRIES);
  }

  deleteUserLocation(userId: string, locationId: string): Observable<any> {
    // const params =  {
    //   userId: userId,
    //   locationId: locationId
    // };
    const headers = new HttpHeaders(
      {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS, HEAD'
      });
    return this.http.delete(`${BASE_URL}/deleteuserlocation/${userId}/${locationId}`, { headers });
  }

}
