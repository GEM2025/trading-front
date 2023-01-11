import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Response } from 'src/app/interfaces/response.interface';
import { ExchangeService } from 'src/app/services/exchange.service';

@Component({
  selector: 'app-exchange-details',
  templateUrl: './exchange-details.component.html',
  styleUrls: ['./exchange-details.component.css']
})
export class ExchangeDetailsComponent implements OnInit {
  response?: Response;

  /**
   *
   */
  constructor(private activatedRoute: ActivatedRoute, private exchangeService: ExchangeService) {
    this.response = undefined;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      console.log(`View ID '${id}'`);
      this.exchangeService.getExchange(id!).subscribe(
        (response: any) => {
          console.log(response);
          this.response = response ;
        }
      )

    });
  }

}
