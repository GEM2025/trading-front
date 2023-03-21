import { HttpClient, HttpHeaders } from '@angular/common/http';
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

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };

  constructor(private http: HttpClient) {
  }

  // fech objects
  getExchanges(size: number = 25): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}/${this.apiURL}?limit=${size}`).pipe(
      map(response => this.processResponse(response)));
  }

  // fetch specific object
  getExchange(id: string = ""): Observable<any> {
    const url = `${environment.apiUrl}/${this.apiURL}/${id}`;
    console.log(`ExchangeService - Get object '${url}'`);
    return this.http.get<any>(url).pipe(
      map(response => {
        console.log(`ExchangeService - Get Request ${this.apiURL} ${response}`);
        return this.processResponse(response);
      }));
  }

  // insert specific object
  postExchange(exchange: Exchange): Observable<any> {
    const url = `${environment.apiUrl}/${this.apiURL}`;
    console.log(`ExchangeService - Post ${this.apiURL} '${url}'`);
    return this.http.post(url, exchange, this.httpOptions)
      .pipe(
        map(response => {
          console.log(`ExchangeService - Post Request ${this.apiURL} ${response}`);
          return response;
        }));

  }

  // update specific object
  updateExchange(exchange: Exchange): Observable<any> {
    const url = `${environment.apiUrl}/${this.apiURL}/${exchange.id}`;
    console.log(`ExchangeService - Put ${this.apiURL} '${url}'`);
    return this.http.put(url, exchange, this.httpOptions)
      .pipe(
        map(response => {
          console.log(`ExchangeService - Put Request ${this.apiURL} ${response}`);
          return response;
        }));
  }

  // delete specific object
  deleteExchange(exchange: Exchange): Observable<any> {
    const url = `${environment.apiUrl}/${this.apiURL}/${exchange.id}`;
    console.log(`ExchangeService - Delete ${this.apiURL} '${url}'`);
    return this.http.delete(url)
      .pipe(
        map(response => {
          console.log(`ExchangeService - Delete Request ${this.apiURL} ${response}`);
          return response;
        }));
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
