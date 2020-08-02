import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddUserLocationComponent } from './components/add-user-location/add-user-location.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { ManageUsersComponent } from './components/manage-users/manage-users.component';
import { AddUserLocationNotesComponent } from './components/add-user-location-notes/add-user-location-notes.component';
import { MapModule } from '../map/map.module';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from '../material/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AddUserLocationComponent,
    ManageUsersComponent,
    AddUserLocationNotesComponent
  ],
  providers: [],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    MapModule
  ]
})
export class UsersModule { }
