import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RoomComponent } from './components/room/room.component';
import { SymbolsComponent } from './components/symbols/symbols.component';
import { SymbolDetailsComponent } from './components/symbol-details/symbol-details.component';
import { LoginComponent } from './components/login/login.component';
import { VigilanteGuard } from './vigilante.guard';
import { ExchangesComponent } from './components/exchanges/exchanges.component';
import { DebugComponent } from './components/debug/debug.component';
import { MarketsComponent } from './components/markets/markets.component';
import { CurrenciesComponent } from './components/currencies/currencies.component';
import { RegisterComponent } from './components/register/register.component';
import { PasswordComponent } from './components/password/password.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'password/:mode',
    component: PasswordComponent
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
    path: 'currencies',
    component: CurrenciesComponent,
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
    path: 'users',
    component: UsersComponent,
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
