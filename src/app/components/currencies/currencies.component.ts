import { Component, OnChanges, OnInit, PipeTransform, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Currency } from 'src/app/interfaces/currency.interface';
import { Response } from 'src/app/interfaces/response.interface';
import { CurrencyService } from 'src/app/services/currency.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { SocketWebService } from 'src/app/services/socket-web.service';

@Component({
  selector: 'app-currencies',
  templateUrl: './currencies.component.html',
  styleUrls: ['./currencies.component.css']
})
export class CurrenciesComponent implements OnInit, OnChanges {
  currenciesResponse?: Response;

  filter = new FormControl('', { nonNullable: true });

  totalItems = undefined;
  currentPage = 1;
  itemsPerPage = 25;
  itemsPerPageOptions = [10, 25, 50, 100];

  constructor(private currencyService: CurrencyService, private socketWebService: SocketWebService) {
    this.currenciesResponse = undefined;
  }

  search = (text: string, pipe: PipeTransform): Currency[] => {
    if (this.currenciesResponse) {
      return this.currenciesResponse.results.filter((currency) => {
        const term = text.toLowerCase();
        return (
          currency.name.toLowerCase().includes(term)
        );
      });
    }
    return [];
  }

  openChange(event: any): void {
    console.log('Open changed to: ' + event);
    this.loadData();
  }

  pageChanged(event: any): void {
    this.currentPage = event;
    this.loadData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    // must subscribe to be notified by the observable

    this.currencyService
      .getCurrencies((this.currentPage - 1) * this.itemsPerPage, this.itemsPerPage)
      .subscribe(
        (response: any) => {
          console.log(response.info);
          this.totalItems = response.info.total;
          this.currenciesResponse = response;
        });
  }

  onEnable(ex: Currency): void {
    console.log(ex);
    this.socketWebService.Socket().emit("Currency_Enabled", ex);
  }


}
