import { DecimalPipe } from '@angular/common';
import { Component, OnChanges, OnInit, PipeTransform, SimpleChanges } from '@angular/core';
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
export class SymbolsComponent implements OnInit, OnChanges {
  response?: Response;

  symbols$: Observable<Symbol[]>;
  filter = new FormControl('', { nonNullable: true });

  totalItems = 66;
  currentPage = 1;
  itemsPerPage = 25;

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

  pageChanged(event: any): void {
    console.log('Page changed to: ' + event.page);
    console.log('Number items per page: ' + event.itemsPerPage);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadData();
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData():void {
    // must subscribe to be notified by the observable
    this.symbolService.getSymbols(this.itemsPerPage).subscribe(
      (results: any) => {
        console.log(results);
        this.response = results;
      });
  }

}
