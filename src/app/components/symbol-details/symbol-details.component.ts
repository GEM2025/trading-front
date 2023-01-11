import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Response } from 'src/app/interfaces/response.interface';
import { SymbolService } from 'src/app/services/symbol.service';

@Component({
  selector: 'app-symbol-details',
  templateUrl: './symbol-details.component.html',
  styleUrls: ['./symbol-details.component.css']
})
export class SymbolDetailsComponent implements OnInit {
  response?: Response;

  /**
   *
   */
  constructor(private activatedRoute: ActivatedRoute, private symbolService: SymbolService) {
    this.response = undefined;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      console.log(`View ID '${id}'`);
      this.symbolService.getSymbol(id!).subscribe(
        (response: any) => {
          console.log(response);
          this.response = response ;
        }
      )

    });
  }

}
