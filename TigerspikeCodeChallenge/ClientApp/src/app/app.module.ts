import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { MapComponent } from './modules/map/components/map/map.component';
// import { MapModule } from './modules/map/map.module';
// import { AddUserLocationComponent } from './modules/users/components/add-user-location/add-user-location.component';
import { UsersModule } from './modules/users/users.module';
import { ManageUsersComponent } from './modules/users/components/manage-users/manage-users.component';
import { SearchNotesComponent } from './modules/users/components/search-notes/search-notes.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    UsersModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full' },
      { path: 'counter', component: CounterComponent },
      { path: 'fetch-data', component: FetchDataComponent },
      { path: 'show-map', component: MapComponent },
      { path: 'manage-users', component: ManageUsersComponent },
      { path: 'search-notes', component: SearchNotesComponent }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
