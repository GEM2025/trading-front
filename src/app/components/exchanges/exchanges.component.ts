import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/interfaces/response.interface';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.css']
})
export class ExchangesComponent implements OnInit {
  response?: Response;

  constructor(private exchangeService: ExchangeService ) {
    this.response = undefined;
  }

  ngOnInit(): void {
    // must subscribe to be notified by the observable
    this.exchangeService.getExchanges().subscribe(
      (results: any) => {
        console.log(results);
        this.response = results;
      });
  }

}
