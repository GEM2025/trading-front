import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RoomComponent } from './components/room/room.component';
import { SymbolsComponent } from './components/symbols/symbols.component';
import { SymbolDetailsComponent } from './components/symbol-details/symbol-details.component';
import { LoginComponent } from './components/login/login.component';
import { VigilanteGuard } from './vigilante.guard';
import { ExchangesComponent } from './components/exchanges/exchanges.component';
import { ExchangeDetailsComponent } from './components/exchange-details/exchange-details.component';
import { PairsComponent } from './components/pairs/pairs.component';
import { DebugComponent } from './components/debug/debug.component';
import { MarketsComponent } from './components/markets/markets.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'room/:room',
    component: RoomComponent,
    canActivate: [VigilanteGuard]
  },
  {
    path: 'exchanges',
    component: ExchangesComponent,
    canActivate: [VigilanteGuard]
  },
  {
    path: 'exchange/:id',
    component: ExchangeDetailsComponent,
    canActivate: [VigilanteGuard]
  },
  {
    path: 'symbols',
    component: SymbolsComponent,
    canActivate: [VigilanteGuard]
  },
  {
    path: 'symbol/:id',
    component: SymbolDetailsComponent,
    canActivate: [VigilanteGuard]
  },
  {
    path: 'pairs',
    component: PairsComponent,
    canActivate: [VigilanteGuard]
  },
  {
    path: 'markets',
    component: MarketsComponent,
    canActivate: [VigilanteGuard]
  },
  {
    path: 'debug',
    component: DebugComponent,
    canActivate: [VigilanteGuard]
  },
  {
    path: '**', // localhost:4200
    component: HomeComponent,
    canActivate: [VigilanteGuard]
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
