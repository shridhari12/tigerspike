import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserLocationComponent } from './add-user-location.component';

describe('AddUserLocationComponent', () => {
  let component: AddUserLocationComponent;
  let fixture: ComponentFixture<AddUserLocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddUserLocationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddUserLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
