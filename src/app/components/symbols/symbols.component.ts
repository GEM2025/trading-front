import { Component, OnChanges, OnInit, PipeTransform, SimpleChanges } from '@angular/core';
import { DecimalPipe } from '@angular/common';
import { FormControl } from '@angular/forms';
import { Response } from 'src/app/interfaces/response.interface';
import { SymbolService } from 'src/app/services/symbol.service';
import { ExchangeService } from 'src/app/services/exchange.service';
import { SocketWebService } from 'src/app/services/socket-web.service';


@Component({
  selector: 'app-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.css'],
  providers: [DecimalPipe],
})
export class SymbolsComponent implements OnInit, OnChanges {
  symbolsResponse?: Response;

  // symbols$: Observable<Symbol[]>;
  filter = new FormControl('', { nonNullable: true });

  filterExchange = null;
  exchanges: Array<any> = [null];

  filterSymbol = null;
  symbols: Set<any> = new Set<any>();

  filterBase = null;
  bases: Set<any> = new Set<any>();

  filterTerm = null;
  terms: Set<any> = new Set<any>();

  totalItems = undefined;
  currentPage = 1;
  itemsPerPage = 25;
  itemsPerPageOptions = [10, 25, 50, 100];

  constructor(private symbolService: SymbolService, private exchangeService: ExchangeService, private socketWebService: SocketWebService, pipe: DecimalPipe) {
    this.symbolsResponse = undefined;

    // this.symbols$ = this.filter.valueChanges.pipe(
    //   startWith(''),
    //   map((text) => this.search(text, pipe)),
    // );

    this.symbols.add(null);
    this.bases.add(null);
    this.terms.add(null);

    // first get the exchanges to allow filtering by exchange
    this.exchangeService
      .getExchanges()
      .subscribe(
        (response: any) => {
          console.log(response.info);

          let tempSymbols: Array<any> = new Array<any>();
          let tempBases: Array<any> = new Array<any>();
          let tempTerms: Array<any> = new Array<any>();

          for (const exchange of response.results) {
            this.exchanges.push(exchange.name);
            for (const market of exchange.markets) {
              // this.symbols.add(market);
              tempSymbols.push(market);
              let pair = market.split("/");
              tempBases.push(pair[0]);
              tempTerms.push(pair[1]);
              // this.bases.add(pair[0]);
              // this.terms.add(pair[1]);
            }
          }

          tempSymbols.sort().forEach(i => this.symbols.add(i));
          tempBases.sort().forEach(i => this.bases.add(i));
          tempTerms.sort().forEach(i => this.terms.add(i));

        });


  }

  search = (text: string, pipe: PipeTransform): Symbol[] => {
    if (this.symbolsResponse) {
      return this.symbolsResponse.results.filter((symbol) => {
        const term = text.toLowerCase();
        return (
          symbol.name.toLowerCase().includes(term) ||
          pipe.transform(symbol.name).includes(term) ||
          pipe.transform(symbol.exchange).includes(term)
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

    this.symbolService
      .getSymbols((this.currentPage - 1) * this.itemsPerPage, this.itemsPerPage)
      .subscribe(
        (response: any) => {
          console.log(response.info);
          this.totalItems = response.info.total;
          this.symbolsResponse = response;
        });
  }

  onEnable(ex: Symbol): void {
    console.log(ex);
    this.socketWebService.Socket().emit("Symbol_Enabled", ex);
  }

}
