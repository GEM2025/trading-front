import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CookieService } from 'ngx-cookie-service';
import { SocketWebService } from './services/socket-web.service';

import { HomeComponent } from './components/home/home.component';
import { RoomComponent } from './components/room/room.component';
import { DrawComponent } from './components/draw/draw.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { LoginComponent } from './components/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    DrawComponent,
    ItemsComponent,
    ItemDetailsComponent,
    LoginComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule
  ],
  providers: [
    SocketWebService,
    CookieService,
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }

