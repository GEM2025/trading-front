import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../interfaces/response.interface';
import { environment } from 'src/environments/environment';
import { Symbol } from '../interfaces/symbol.interface';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class SymbolService {

  private readonly apiURL: string = 'symbol';

  // https://www.youtube.com/watch?v=s1qgSzEtCRI
  private headers: HttpHeaders;

  constructor(private http: HttpClient, private cookieService: CookieService) {

    const currentUser: User = JSON.parse(this.cookieService.get('user'));

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.token}`
    });
  }

  // fech symbols
  getSymbols(skip: number, limit: number): Observable<any> {
    const url = `${environment.apiUrl}/${this.apiURL}?skip=${skip}&limit=${limit}`;
    console.log(`SymbolService.getSymbols url=${url}`);
    return this.http.get<any>(url, { headers: this.headers }).pipe(
      map(response => this.processResponse(response)));
  }

  // fetch specific symbol
  getSymbol(id: string = ""): Observable<any> {
    const url = `${environment.apiUrl}/${this.apiURL}/${id}`;
    console.log(`Get symbol '${url}'`);
    return this.http.get<any>(url, { headers: this.headers }).pipe(
      map(response => this.processResponse(response)));
  }

  private processResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map((symbol: any) => (<Symbol>{
        id: symbol._id,
        name: symbol.name,
        exchange: symbol.exchange,
        pair: symbol.pair,
        bid: symbol.bid,
        ask: symbol.ask,
        enabled: symbol.enabled,
      }))
    };
  }

}
