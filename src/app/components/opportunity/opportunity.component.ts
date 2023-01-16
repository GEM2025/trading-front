import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subject } from 'rxjs';
import { Opportunity } from 'src/app/models/opportunity';
import { SocketWebService } from 'src/app/services/socket-web.service';
import { OpportunityModalComponent } from './opportunity.modal/opportunity.modal.component';
import { OpportunityModalDataService } from './opportunity.modal.service';

@Component({
  selector: 'app-opportunity',
  templateUrl: './opportunity.component.html',
  styleUrls: ['./opportunity.component.css']
})
export class OpportunityComponent implements OnInit {
  @Input() side: string;

  private _opportunities: Opportunity[] = [];
  private _opportunities$ = new Subject<Opportunity[]>();
  opportunities$: Observable<Opportunity[]> = this._opportunities$.asObservable();

  constructor(
    private router: ActivatedRoute,
    private cookieService: CookieService,
    private socketWebService: SocketWebService,
    private modalService: NgbModal,
    private opportunityModalDataService: OpportunityModalDataService
    ) {
    this.side = "Loading...";

    // buy BTC/USD ----- buy USD/MXN  ------ buy MXN/BTC
    // buy BTC/USD ----- sell MXN/USD  ------ buy MXN/BTC
    // buy BTC/USD ----- sell MXN/USD  ------ sell BTC/MXN

    this._opportunities = [
      { id: 1, a: { side: "buy", name: "ABC/XYZ", exchange: "KuCoin" }, b: { side: "buy", name: "XYZ/123", exchange: "Kraken" }, c: { side: "buy", name: "123/ABC", exchange: "Kraken" }, volume: 0.05, trade: 300 },
      { id: 2, a: { side: "buy", name: "ABC/XYZ", exchange: "Kraken" }, b: { side: "buy", name: "XYZ/ABC", exchange: "Gemini" }, volume: 0.05, trade: 250 },
      { id: 3, a: { side: "buy", name: "ABC/XYZ", exchange: "Coinbase" }, b: { side: "sell", name: "ABC/XYZ", exchange: "HitBTC" }, volume: 0.05, trade: 200 },
    ];
  }

  ngOnInit(): void {
    setTimeout(() => { this._opportunities$.next(this._opportunities); }, 0);
  }

  trade(id: number) {
    // we are using a service "OpportunityModalDataService" as a data bridge between the opportunity class and the modal
    this.opportunityModalDataService.data = `${this.side} Loading...`;
    const modalRef = this.modalService.open(OpportunityModalComponent);
  }


}
