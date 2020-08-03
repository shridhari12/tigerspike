import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MapData } from '../../models/map-data.model';
import { Marker } from '../../models/marker.model';
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {
  // @Input() showMap = false;
  @Input() mapData: MapData;
  @Output() mapClick = new EventEmitter<Marker>();
  @Output() mapPointDelete = new EventEmitter<Marker>();
  mapDataPoints: Array<Marker> = [];
  showNote = false;
  addNoteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // this.getCurrentGeoPosition();
    // this.buildAddNoteForm();
    this.showMapPoints();
  }

  // buildAddNoteForm() {
  //   this.addNoteForm = this.formBuilder.group({
  //     notes: new FormControl('')
  //   });
  // }

  showMapPoints() {
    // this.getCurrentGeoPosition();
    this.mapDataPoints = [ ...this.mapData.dataPoints ];
  }

  // showMapComponent() {
  //   this.showMap = !this.showMap;
  // }

  addNote() {
    this.showNote = !this.showNote;
  }

  // saveNoteHandler() {
  //   this.saveNotesforCurrentLocation();
  // }

  // saveNotesforCurrentLocation() {
  //   const notes = this.addNoteForm.get('notes').value;
  // }

  mapPointClickHandler(marker: Marker) {
    console.log('[map][mapPointClickHandler] ', marker);
    this.mapClick.emit(marker);
  }

  // pass back to Parent ==> ManageUsersComponent
  mapPointDeleteHandler(marker: Marker) {
    this.mapPointDelete.emit(marker);
  }

}
