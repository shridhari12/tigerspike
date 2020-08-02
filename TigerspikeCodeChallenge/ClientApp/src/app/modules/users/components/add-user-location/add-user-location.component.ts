import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../../services/user.service';
import { AddUserLocation } from '../../models/add-user-location.model';
import { Country } from '../../models/country.model';
import { State } from '../../models/state.model';

@Component({
  selector: 'app-add-user-location',
  templateUrl: './add-user-location.component.html',
  styleUrls: ['./add-user-location.component.css']
})
export class AddUserLocationComponent implements OnInit {
  @Input() isCurrent: boolean;
  @Output() saveUserLocation = new EventEmitter<AddUserLocation>();
  userLocationForm: FormGroup;
  countryOptions: Array<Country>;
  stateOptions: Array<State>;
  constructor(
    private http: HttpClient,
    private formBuilder: FormBuilder,
    private userService: UserService) { }

  ngOnInit() {
    this.buildLocationForm();
  }

  buildLocationForm() {
    this.userLocationForm = this.formBuilder.group({
      addressLine1: new FormControl(''),
      addressLine2: new FormControl(''),
      suburb: new FormControl(''),
      state: new FormControl(''),
      postcode: new FormControl(''),
      country: new FormControl(''),
    });
  }

  addLocationHandler() {
    const address1: string = this.userLocationForm.get('addressLine1').value;
    const address2: string = this.userLocationForm.get('addressLine2').value;
    const suburb: string = this.userLocationForm.get('suburb').value;
    const state: string = this.userLocationForm.get('state').value;
    const postcode: string = this.userLocationForm.get('postcode').value;
    const country: string = this.userLocationForm.get('country').value;
    const address = `${address1} ${address2} ${suburb} ${state} ${country} ${postcode}`;
    this.getGeoLocation(address);
  }

  loadCountries() {
    // this.countryOptions = this.acmeOfferSvc.getCountries();
    this.countryOptions = [
      {
        countryId: 1,
        countryCode: 'AU',
        countryName: 'Australia'
      },
      {
        countryId: 2,
        countryCode: 'IND',
        countryName: 'India'
      },
      {
        countryId: 3,
        countryCode: 'USA',
        countryName: 'United States of America'
      }
    ];
  }

  loadStates() {
    this.stateOptions = [
      {
        stateCode: 'QLD',
        stateName: 'Queensland'
      },
      {
        stateCode: 'TAS',
        stateName: 'Tasmania'
      },
      {
        stateCode: 'NT',
        stateName: 'Northern Territory'
      },
      {
        stateCode: 'VIC',
        stateName: 'Victoria'
      },
      {
        stateCode: 'ACT',
        stateName: 'Australian Capital Territory'
      },
      {
        stateCode: 'SA',
        stateName: 'South Australia'
      },
      {
        stateCode: 'NSW',
        stateName: 'New South Wales'
      },
      {
        stateCode: 'WA',
        stateName: 'Western Australia'
      }
    ];
  }

  getGeoLocation(address: string) {
    console.log('Getting address: ', address);
    // this.apiLoader.load().then(() => {
    //   let geocoder = new google.maps.Geocoder;
    // })
    // this.userService.saveUserLocation();
  }



}
