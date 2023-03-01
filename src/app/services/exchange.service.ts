import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Response } from '../interfaces/response.interface';
import { Exchange } from '../interfaces/exchange.interface';

@Injectable({
  providedIn: 'root'
})
export class ExchangeService {

  private readonly apiURL: string = 'exchange';

  constructor(private http: HttpClient) {
  }

  // fech symbols
  getExchanges(size: number = 25): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.apiURL}?limit=${size}`).pipe(
      map(response => this.processResponse(response)));
  }

  // fetch specific symbol
  getExchange(id: string = ""): Observable<any> {
    const url = `${environment.apiUrl}/${this.apiURL}/${id}`;
    console.log(`Get symbol '${url}'`);
    return this.http.get<any>(url).pipe(
      map(response => this.processResponse(response)));
  }

  private processResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map((exchange: any) => (<Exchange>{
        id: exchange._id,
        name: exchange.name,
        description: exchange.description || "No description available",
        markets: exchange.markets,
        key: exchange.key,
        secret: exchange.secret,
        extra: exchange.extra,
        enabled: exchange.enabled,
      }))
    };
  }

}
