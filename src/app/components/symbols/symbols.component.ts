import { DecimalPipe } from '@angular/common';
import { Component, OnInit, PipeTransform } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { Response } from 'src/app/interfaces/response.interface';
import { SymbolService } from 'src/app/services/symbol.service';

@Component({
  selector: 'app-symbols',
  templateUrl: './symbols.component.html',
  styleUrls: ['./symbols.component.css'],
  providers: [DecimalPipe],
})
export class SymbolsComponent implements OnInit {
  response?: Response;

  symbols$: Observable<Symbol[]>;
  filter = new FormControl('', { nonNullable: true });

  constructor(private symbolService: SymbolService, pipe: DecimalPipe) {
    this.response = undefined;
    this.symbols$ = this.filter.valueChanges.pipe(
      startWith(''),
      map((text) => this.search(text, pipe)),
    );
  }

  search = (text: string, pipe: PipeTransform): Symbol[] => {
    if (this.response) {
      return this.response.results.filter((symbol) => {
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

  ngOnInit(): void {
    // must subscribe to be notified by the observable
    this.symbolService.getSymbols().subscribe(
      (results: any) => {
        console.log(results);
        this.response = results;
      });
  }

}
