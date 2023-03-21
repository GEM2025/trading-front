import { Component, OnChanges, OnInit, PipeTransform, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Response } from 'src/app/interfaces/response.interface';
import { MarketService } from 'src/app/services/market.service';
import { Market } from 'src/app/interfaces/market.interface';
import { SocketWebService } from 'src/app/services/socket-web.service';


@Component({
  selector: 'app-markets',
  templateUrl: './markets.component.html',
  styleUrls: ['./markets.component.css']
})
export class MarketsComponent implements OnInit, OnChanges {
  marketsResponse?: Response;

  // markets$: Observable<Market[]>;
  filter = new FormControl('', { nonNullable: true });

  totalItems = undefined;
  currentPage = 1;
  itemsPerPage = 25;
  itemsPerPageOptions = [10, 25, 50, 100];

  constructor(private marketService: MarketService, private socketWebService: SocketWebService){
    this.marketsResponse = undefined;

  }

  search = (text: string, pipe: PipeTransform): Market[] => {
    if (this.marketsResponse) {
      return this.marketsResponse.results.filter((market) => {
        const term = text.toLowerCase();
        return (
          market.name.toLowerCase().includes(term) ||
          pipe.transform(market.name).includes(term) ||
          pipe.transform(market.exchange).includes(term)
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

    this.marketService
      .getMarkets((this.currentPage - 1) * this.itemsPerPage, this.itemsPerPage)
      .subscribe(
        (response: any) => {
          console.log(response.info);
          this.totalItems = response.info.total;
          this.marketsResponse = response;
        });
  }

  onEnable(ex: Market): void {
    console.log(ex);
    this.socketWebService.Socket().emit("Market_Enabled", ex);
  }

}
