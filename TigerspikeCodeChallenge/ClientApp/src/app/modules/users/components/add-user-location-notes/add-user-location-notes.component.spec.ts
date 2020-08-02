import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserLocationNotesComponent } from './add-user-location-notes.component';

describe('AddUserLocationNotesComponent', () => {
  let component: AddUserLocationNotesComponent;
  let fixture: ComponentFixture<AddUserLocationNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserLocationNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserLocationNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
