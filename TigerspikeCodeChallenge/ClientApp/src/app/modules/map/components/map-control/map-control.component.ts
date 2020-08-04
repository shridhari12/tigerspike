import { Component, OnInit, ViewChild, Input, AfterViewInit, Output, EventEmitter } from '@angular/core';
import { MouseEvent, AgmMap } from '@agm/core';
import { Marker } from '../../models/marker.model';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-map-control',
  templateUrl: './map-control.component.html',
  styleUrls: ['./map-control.component.css']
})
export class MapControlComponent implements OnInit, AfterViewInit {
  @ViewChild(AgmMap, {static: true}) map: AgmMap;
  @Input() mapPoints: Array<Marker>;
  @Output() mapPointClick = new EventEmitter<Marker>();
  @Output() mapPointDelete = new EventEmitter<Marker>();
  showMarkerOptions = false;
  infoContent = '';
  mapTypeId = 'hybrid';
  markers: Array<Marker> = [];
  zoom = 12;
  showNote = false;
  addNoteForm: FormGroup;
  selectedMarker: Marker;
  noteButtonText: string;
  defaultLat: number;
  defaultLng: number;
  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    this.plotDataPointsInMap();
    this.buildNoteForm();
  }

  buildNoteForm() {
    this.addNoteForm = this.formBuilder.group({
      notes: new FormControl('')
    });
  }

  ngAfterViewInit() {
    console.log('[map-control][ngAfterViewInit]');
  }

  plotDataPointsInMap() {
    this.mapPoints.map((mapPoint, i) => {
      this.addMapMarker(mapPoint);
    });
    this.setDefaultLocation();
  }

  setDefaultLocation() {
    if (this.mapPoints && this.mapPoints.length > 0) {
      const defaultMarker = this.mapPoints[0];
      this.defaultLat = defaultMarker.lat;
      this.defaultLng = defaultMarker.lng;
    }
  }

  markerClickHandler(marker: Marker) {
    // console.log(`clicked the marker: ${label || index}`);
    console.log('clicked marker id # ', marker);
    this.showMarkerOptions = !this.showMarkerOptions;
    this.selectedMarker = marker;
    this.setMarkerData();
  }

  getSelectedMarkerAddress() {
    const selectedMarkerAddress = this.selectedMarker.address;
    if (selectedMarkerAddress) {
      return `${selectedMarkerAddress.addressLine1} 
       ${selectedMarkerAddress.addressLine2} 
       ${selectedMarkerAddress.suburb} 
       ${selectedMarkerAddress.state} 
       ${selectedMarkerAddress.country} 
       ${selectedMarkerAddress.postcode}`;
    }
    return 'No address provided';
  }

  setMarkerData() {
    if (this.selectedMarker.notes != null) {
      this.noteButtonText = 'EDIT NOTES';
      this.addNoteForm.get('notes').patchValue(this.selectedMarker.notes);
    } else {
      this.noteButtonText = 'ADD NOTES';
    }
  }

  mapClickHandler(event: MouseEvent) {
    this.markers.push({
      lat: event.coords.lat,
      lng: event.coords.lng,
      draggable: false
    });
  }

  addMapMarker(marker: Marker) {
    this.markers.push({...marker});
    if (marker.isCurrentLocation) {
      this.addNote();
    }
  }

  addNote() {
    this.showNote = !this.showNote;
  }

  saveCurrentLocationHandler() {
    console.log('[map-control][saveCurrentLocationHandler]');
    const notes = this.addNoteForm.get('notes').value;
    this.selectedMarker.notes = notes;
    this.showNote = false;
    this.showMarkerOptions = false;
    this.mapPointClick.emit(this.selectedMarker);
  }

  // Pass to Parent ==> MapComponent
  deleteUserLocation() {
    this.mapPointDelete.emit(this.selectedMarker);
  }

}
