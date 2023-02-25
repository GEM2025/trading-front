import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

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
import { SymbolsComponent } from './components/symbols/symbols.component';
import { SymbolDetailsComponent } from './components/symbol-details/symbol-details.component';
import { LoginComponent } from './components/login/login.component';
import { ExchangesComponent } from './components/exchanges/exchanges.component';
import { ExchangeDetailsComponent } from './components/exchange-details/exchange-details.component';
import { OpportunityComponent } from './components/opportunity/opportunity.component';
import { BalanceComponent } from './components/balance/balance.component';
import { BlotterComponent } from './components/blotter/blotter.component';
import { LogComponent } from './components/log/log.component';
import { OpportunityModalComponent } from './components/opportunity/opportunity.modal/opportunity.modal.component';
import { DebugComponent } from './components/debug/debug.component';
import { MarketsComponent } from './components/markets/markets.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RoomComponent,
    DrawComponent,
    SymbolsComponent,
    SymbolDetailsComponent,
    LoginComponent,
    ExchangesComponent,
    ExchangeDetailsComponent,
    OpportunityComponent,
    BalanceComponent,
    BlotterComponent,
    LogComponent,
    OpportunityModalComponent,
    DebugComponent,
    MarketsComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule,
    ReactiveFormsModule,
    PaginationModule.forRoot()
  ],
  providers: [
    SocketWebService,
    CookieService
  ],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule { }

