import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/interfaces/response.interface';
import { SymbolService } from 'src/app/services/symbol.service';

@Component({
  selector: 'app-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.css']
})
export class SymbolsComponent implements OnInit {
  response?: Response;

  constructor(private symbolService: SymbolService) {
    this.response = undefined;
  }

  ngOnInit(): void {
    // must subscribe to be notified by the observable
    this.symbolService.getSymbols().subscribe(
      (results: any) => {
        console.log(results);
        this.response = results;
      });
  }

}
