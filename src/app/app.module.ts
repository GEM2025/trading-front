import { NgModule } from '@angular/core';
import { NgbModule, NgbPaginationModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';

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
import { OpportunityComponent } from './components/opportunity/opportunity.component';
import { BalanceComponent } from './components/balance/balance.component';
import { BlotterComponent } from './components/blotter/blotter.component';
import { LogComponent } from './components/log/log.component';
import { OpportunityModalComponent } from './components/opportunity/opportunity.modal/opportunity.modal.component';
import { DebugComponent } from './components/debug/debug.component';
import { MarketsComponent } from './components/markets/markets.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';


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
    OpportunityComponent,
    BalanceComponent,
    BlotterComponent,
    LogComponent,
    OpportunityModalComponent,
    DebugComponent,
    MarketsComponent,
    CurrenciesComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    CommonModule,
    FormsModule,
    HttpClientModule,
    NgbModule, NgbPaginationModule, NgbDropdownModule,
    ReactiveFormsModule
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

