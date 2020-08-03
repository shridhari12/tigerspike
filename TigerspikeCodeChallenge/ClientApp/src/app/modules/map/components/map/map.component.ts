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
    this.showMapPoints();
  }

  showMapPoints() {
    this.mapDataPoints = [ ...this.mapData.dataPoints ];
  }

  addNote() {
    this.showNote = !this.showNote;
  }

  mapPointClickHandler(marker: Marker) {
    console.log('[map][mapPointClickHandler] ', marker);
    this.mapClick.emit(marker);
  }

  // pass back to Parent ==> ManageUsersComponent
  mapPointDeleteHandler(marker: Marker) {
    this.mapPointDelete.emit(marker);
  }

}
