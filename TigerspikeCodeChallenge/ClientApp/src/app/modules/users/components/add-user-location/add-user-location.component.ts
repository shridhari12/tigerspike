import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { AddUserLocation } from '../../models/add-user-location.model';
import { Country } from '../../models/country.model';
import { State } from '../../models/state.model';
import { UserInfo } from '../../models/user-info.model';

@Component({
  selector: 'app-add-user-location',
  templateUrl: './add-user-location.component.html',
  styleUrls: ['./add-user-location.component.css']
})
export class AddUserLocationComponent implements OnInit {
  @Input() selectedUser: UserInfo;
  @Output() addLocation = new EventEmitter<AddUserLocation>();
  userLocationForm: FormGroup;
  countryOptions: Array<Country> = [];
  stateOptions: Array<State> = [];
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.loadStates();
    this.loadCountries();
    this.buildLocationForm();
  }

  buildLocationForm() {
    this.userLocationForm = this.formBuilder.group({
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      suburb: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
      postcode: new FormControl(''),
      country: new FormControl(''),
      notes: new FormControl('')
    });
  }

  addLocationHandler() {
    const address1: string = this.userLocationForm.get('addressLine1').value;
    const address2: string = this.userLocationForm.get('addressLine2').value;
    const suburb: string = this.userLocationForm.get('suburb').value;
    const state: string = this.userLocationForm.get('state').value;
    const postcode: string = this.userLocationForm.get('postcode').value;
    const country: string = this.userLocationForm.get('country').value;
    const city: string = this.userLocationForm.get('city').value;
    const address = `${address1} ${address2} ${suburb} ${state} ${country} ${postcode}`;
    const notes: string = this.userLocationForm.get('notes').value;
    let result, geodata, lat, lng;
    this.userService.getCoordinatesForAddress(address)
      .subscribe(
        response => {
          if (response && response.hasOwnProperty('results')) {
            result = response['results'];
            geodata = result[0].geometry.location; // location.lat
            lat = geodata.hasOwnProperty('lat') ? geodata.lat : 0;
            lng = geodata.hasOwnProperty('lng') ? geodata.lng : 0;

            // Save the location to backend
            this.saveLocation(address1, address2, suburb,
              state, postcode, country, city, lat, lng, notes);
          }
        },
        (error) => {
          console.log('Request failed with error ', error);
        });
  }

  loadCountries() {
    this.userService.getCountries()
      .subscribe(countries => this.countryOptions = countries);
  }

  loadStates() {
    this.userService.getStates()
      .subscribe(states => this.stateOptions = states);
  }

  saveLocation(
    address1: string,
    address2: string,
    suburb: string,
    state: string,
    postcode: string,
    country: string,
    city: string,
    latitude: number,
    longitude: number,
    notes: string) {
    const userLocationToBeAdded: AddUserLocation = {
      userId: this.selectedUser.id,
      addressLine1: address1.trim(),
      addressLine2: address2.trim(),
      postcode: postcode.trim(),
      suburb: suburb.trim(),
      state: state.trim(),
      country: country.trim(),
      city: city.trim(),
      latitude: latitude,
      longitude: longitude,
      isCurrent: false,
      notes: notes.trim()
    };
    this.addLocation.emit(userLocationToBeAdded);
  }

}
