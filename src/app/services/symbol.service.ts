import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../interfaces/response.interface';
import { environment } from 'src/environments/environment';
import { Symbol } from '../interfaces/symbol.interface';

@Injectable({
  providedIn: 'root'
})
export class SymbolService {

  private readonly apiURL: string = 'symbol';

  constructor(private http: HttpClient) { }

  // fech symbols
  getSymbols(size: number = 25): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.apiURL}?limit=${size}`).pipe(
      map(response => this.processResponse(response)));
  }

  // fetch specific symbol
  getSymbol(id: string = ""): Observable<any> {
    const url = `${environment.apiUrl}/${this.apiURL}/${id}`;
    console.log(`Get symbol '${url}'`);
    return this.http.get<any>(url).pipe(
      map(response => this.processResponse(response)));
  }

  private processResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map((symbol: any) => (<Symbol>{
        id: symbol._id,
        name: symbol.name,
        exchange: symbol.exchange,
        description: symbol.description || "No description available",
        bid: symbol.bid,
        ask: symbol.ask
      }))
    };
  }

}
