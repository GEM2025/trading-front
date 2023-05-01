import { Component, Input, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Observable, Subject, combineLatest } from 'rxjs';
import { Opportunity, Step } from 'src/app/models/opportunity';
import { SocketWebService } from 'src/app/services/socket-web.service';
import { OpportunityModalComponent } from './opportunity.modal/opportunity.modal.component';
import { OpportunityModalDataService } from './opportunity.modal.service';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit {
  @Input() side: string;

  private _opportunities: Map<number, Opportunity> = new Map();
  private _opportunities$ = new Subject<Map<number, Opportunity>>();
  public opportunities$: Observable<Map<number, Opportunity>> = this._opportunities$.asObservable();

  public sortType: any = 'multi';

  private filterA$ = new BehaviorSubject<string>('');
  private filterB$ = new BehaviorSubject<string>('');
  private filterC$ = new BehaviorSubject<string>('');

  public filteredOpportunities$: Observable<Opportunity[]>;

  // Create a Subject for individual record updates:
  private _recordUpdates$ = new Subject<Opportunity>();
  public recordUpdates$: Observable<Opportunity> = this._recordUpdates$.asObservable();

  constructor(
    private socketWebService: SocketWebService,
    private modalService: NgbModal,
    private opportunityModalDataService: OpportunityModalDataService
  ) {
    this.side = "Loading...";

    // buy BTC/USD ----- buy USD/MXN  ------ buy MXN/BTC
    // buy BTC/USD ----- sell MXN/USD  ------ buy MXN/BTC
    // buy BTC/USD ----- sell MXN/USD  ------ sell BTC/MXN

    const opportunities = [
      { id: 0, a: { side: "buy", name: "ABC/XYZ", exchange: "KuCoin" }, b: { side: "buy", name: "XYZ/123", exchange: "Kraken" }, c: { side: "buy", name: "123/ABC", exchange: "Kraken" }, volume: 0.05, trade: 300 },
      { id: 1, a: { side: "buy", name: "ABC/XYZ", exchange: "KuCoin" }, b: { side: "buy", name: "XYZ/345", exchange: "Kraken" }, c: { side: "buy", name: "345/ABC", exchange: "Kraken" }, volume: 0.05, trade: 300 },
      { id: 2, a: { side: "sell", name: "ABC/XYZ", exchange: "KuCoin" }, b: { side: "sell", name: "XYZ/345", exchange: "Kraken" }, c: { side: "sell", name: "345/ABC", exchange: "Kraken" }, volume: 0.05, trade: 300 },
      { id: 3, a: { side: "buy", name: "ABC/XYZ", exchange: "Kraken" }, b: { side: "buy", name: "XYZ/ABC", exchange: "Gemini" }, volume: 0.05, trade: 250 },
      { id: 4, a: { side: "buy", name: "ABC/XYZ", exchange: "Coinbase" }, b: { side: "sell", name: "ABC/XYZ", exchange: "HitBTC" }, volume: 0.05, trade: 200 },
    ];

    for (const o of opportunities) {
      this._opportunities.set(o.id, o);
    }

    const stringify = (s: Step | undefined): string => {
      return s ? `${s.exchange} ${s.side} ${s.name}` : '';
    };

    function matchesTokenFilter(str: string, query: string): boolean {
      const tokens = query.toLowerCase().split(' ').filter(token => token.trim() !== '');
      const lowerCaseStr = str.toLowerCase();
      const words = lowerCaseStr.split(' ');

      return tokens.every(token => {
        return words.some(word => word.startsWith(token));
      });
    }

    this.filteredOpportunities$ = combineLatest([
      this.opportunities$,
      this.filterA$,
      this.filterB$,
      this.filterC$,
      this.recordUpdates$.pipe(startWith(null))
    ])
      .pipe(
        map(([opportunities, filterA, filterB, filterC, updatedRecord]) => {
          if (updatedRecord) {
            const index = opportunities.get(updatedRecord.id);
            if (index) {
              opportunities.set(updatedRecord.id, updatedRecord);
            }
          }
          return Array.from(opportunities.values()).filter(o =>
            matchesTokenFilter(stringify(o.a), filterA) &&
            matchesTokenFilter(stringify(o.b), filterB) &&
            matchesTokenFilter(stringify(o.c), filterC)
          );
        })
      );


    this.socketWebService.heartbeatCallback.subscribe(serverTime => {
      const stime = new Date(serverTime);
      const index = stime.getMilliseconds() % this._opportunities.size;

      var record = this._opportunities.get(index);
      if (record) {
        record.trade += 1;
        this._recordUpdates$.next(record);
      }
    });

  }

  ngOnInit(): void {
    // It's needed to send the input to the observable asyncronously, no idea why
    setTimeout(() => { this._opportunities$.next(this._opportunities); }, 0);
  }

  trade(id: number) {
    // we are using a service "OpportunityModalDataService" as a data bridge between the opportunity class and the modal
    this.opportunityModalDataService.data = `${this.side} Loading...`;
    const modalRef = this.modalService.open(OpportunityModalComponent);
  }

  getInputValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  onFilterA(search: string): void {
    console.log(`filter ${search}`);
    this.filterA$.next(search);
  }

  onFilterB(search: string): void {
    console.log(`filter ${search}`);
    this.filterB$.next(search);
  }

  onFilterC(search: string): void {
    console.log(`filter ${search}`);
    this.filterC$.next(search);
  }


}
