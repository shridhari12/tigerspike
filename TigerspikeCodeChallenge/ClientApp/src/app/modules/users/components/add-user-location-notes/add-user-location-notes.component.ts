import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-user-location-notes',
  templateUrl: './add-user-location-notes.component.html',
  styleUrls: ['./add-user-location-notes.component.css']
})
export class AddUserLocationNotesComponent implements OnInit {
  showNote = false;
  addNoteForm: FormGroup;

  constructor(
    // private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
    // this.buildNoteForm();
  }

  // buildNoteForm() {
  //   this.addNoteForm = this.formBuilder.group({
  //     notes: new FormControl('')
  //   });
  // }

  // addNote() {
  //   this.showNote = !this.showNote;
  // }

  // saveNoteHandler() {
  //   this.saveNotesforCurrentLocation();
  // }

  // saveNotesforCurrentLocation() {
  //   const notes = this.addNoteForm.get('notes').value;
  // }

}
