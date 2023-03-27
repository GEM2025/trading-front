import { Component, OnInit } from '@angular/core';
import { Exchange } from 'src/app/interfaces/exchange.interface';
import { ExchangeService } from 'src/app/services/exchange.service';
import { SocketWebService } from 'src/app/services/socket-web.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Info } from 'src/app/interfaces/info.interface';

@Component({
  selector: 'app-exchanges',
  templateUrl: './exchanges.component.html',
  styleUrls: ['./exchanges.component.css']
})
export class ExchangesComponent implements OnInit {
  info?: Info;
  exchange?: Exchange;
  exchanges?: Array<Exchange>;

  // ---------------------------------------------------------------------------------------
  constructor(private exchangeService: ExchangeService, private socketWebService: SocketWebService, private modalService: NgbModal) {
    this.info = undefined;
    this.exchanges = undefined;
    this.exchange = undefined;
  }

  // ---------------------------------------------------------------------------------------
  ngOnInit(): void {
    // must subscribe to be notified by the observable
    this.exchangeService.getExchanges().subscribe(
      (response: any) => {
        console.log(`ExchangesComponent - ngOnInit ${response}`);
        this.info = response.info;
        this.exchanges = response.results;
      });
  }

  // ---------------------------------------------------------------------------------------
  // We'll persist this SocketIO method because for plain enable/disable (or online updates) it tends to act quicker
  onUpdateExchange(ex: Exchange): void {
    console.log(`ExchangesComponent - onUpdateExchange ${ex}`);
    this.socketWebService.Socket().emit("UpdateExchange", ex.id, ex);
  }

  // ---------------------------------------------------------------------------------------
  openDetailsDialog(content: any, exchange_id: string) {
    console.log(`ExchangesComponent - Details Dialog ${exchange_id}`);
    this.exchange = undefined;

    this.exchangeService.getExchange(exchange_id)
      .subscribe(
        (response: any) => {
          console.log(`ExchangesComponent - getExchange ${exchange_id} subscribe response ${response}`);
          this.exchange = response.results[0];
        }
      );

    this.openDialog(content);
  }

  // ---------------------------------------------------------------------------------------
  openAddNewDialog(content: any) {
    console.log(`ExchangesComponent - Add New Dialog ${content.name}`);

    this.exchange = {
      id: '',
      name: '',
      description: '',
      markets: [],
      key: '',
      secret: '',
      extra: '',
      enabled: false
    };

    this.openDialog(content);

  }

  // ---------------------------------------------------------------------------------------
  private openDialog(content: any) {
    this.modalService.open(content, { ariaLabelledBy: content, size: 'lg', centered: true }).result.then(
      (result) => {
        console.log(`ExchangesComponent - Closed with: ${result}`);
        if (result === "Update") {
          // Let's use pure REST operations for major data assets management
          this.exchange && this.exchangeService.updateExchange(this.exchange).subscribe(
            (response: any) => {
              this.info = undefined;
              this.exchanges = undefined;
              this.ngOnInit();
            });
        }
        else if (result === "Delete") {
          this.exchange && this.exchangeService.deleteExchange(this.exchange).subscribe(
            (response: any) => {
              this.info = undefined;
              this.exchanges = undefined;
              this.ngOnInit();
            });
        }
        else if (result === "Post") {
          this.exchange && this.exchangeService.postExchange(this.exchange).subscribe(
            (response: any) => {
              this.info = undefined;
              this.exchanges = undefined;
              this.ngOnInit();
            });
        }
      },
      (reason) => {
        console.log(`ExchangesComponent - Dismissed ${this.getDismissReason(reason)}`);
      },
    );
  }

  // ---------------------------------------------------------------------------------------
  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  // ---------------------------------------------------------------------------------------
  deleteExchange(content: any) {
    console.log(`ExchangesComponent - Deleting ${content}`);
  }

}
