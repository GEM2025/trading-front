import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { RoomComponent } from './components/room/room.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemDetailsComponent } from './components/item-details/item-details.component';
import { LoginComponent } from './components/login/login.component';
import { VigilanteGuard } from './vigilante.guard';

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
    path: 'items',
    component: ItemsComponent,
    canActivate: [VigilanteGuard]
  },
  {
    path: 'item/:id',
    component: ItemDetailsComponent,
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
