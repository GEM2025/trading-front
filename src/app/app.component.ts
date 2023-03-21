import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { SocketWebService } from './services/socket-web.service';


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
  constructor(public authService: AuthService, private socketWebService: SocketWebService) {
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
    this.socketWebService.Socket().emit("SymbolService_InitializeSymbolsFromDB", null);
  }

  MarketService_InitializeMarketsFromDB = () : void =>
  {
    console.log("MarketService.InitializeMarketsFromDB()");
    this.socketWebService.Socket().emit("MarketService_InitializeMarketsFromDB", null);
  }

  OpportunitiesServices_InitializeCalculations = () : void =>
  {
    console.log("OpportunitiesServices.InitializeCalculations()");
    this.socketWebService.Socket().emit("OpportunitiesServices_InitializeCalculations", null);
  }

}
