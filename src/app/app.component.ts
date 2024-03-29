import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dateTime: Date;

  /**
   *
   */
  constructor(
    public authService: AuthService) {
    this.dateTime = new Date();
  }

  ngOnInit(): void {
    setInterval(() =>
    {
      this.dateTime = new Date();
    }, 1000);

  }

  logout(): void {
    this.authService.logout();
  }

  SymbolService_InitializeSymbolsFromDB = () : void =>
  {
    console.log("SymbolService_InitializeSymbolsFromDB()");
    alert("Not implemented");
    // this.socketWebService.Socket().emit("SymbolService_InitializeSymbolsFromDB", null);
  }

  MarketService_InitializeMarketsFromDB = () : void =>
  {
    console.log("MarketService.InitializeMarketsFromDB()");
    alert("Not implemented");
    // this.socketWebService.Socket().emit("MarketService_InitializeMarketsFromDB", null);
  }

  OpportunitiesServices_InitializeCalculations = () : void =>
  {
    console.log("OpportunitiesServices.InitializeCalculations()");
    alert("Not implemented");
    // this.socketWebService.Socket().emit("OpportunitiesServices_InitializeCalculations", null);
  }

}
