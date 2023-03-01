import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../interfaces/response.interface';
import { environment } from 'src/environments/environment';
import { Market } from '../interfaces/market.interface';

@Injectable({
  providedIn: 'root'
})
export class MarketService {

  private readonly apiURL: string = 'market';

  constructor(private http: HttpClient) { }

  // fech Markets
  getMarkets(skip: number, limit: number): Observable<any> {
    const url = `${environment.apiUrl}/${this.apiURL}?skip=${skip}&limit=${limit}` ;
    console.log(`MarketService.getMarkets url=${url}`);
    return this.http.get<any>(url).pipe(
      map(response => this.processResponse(response)));
  }

  // fetch specific Market
  getMarket(id: string = ""): Observable<any> {
    const url = `${environment.apiUrl}/${this.apiURL}/${id}`;
    console.log(`Get Market '${url}'`);
    return this.http.get<any>(url).pipe(
      map(response => this.processResponse(response)));
  }

  private processResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map((market: any) => (<Market>{
        id: market._id,
        items: market.items,
        enabled: market.enabled,
      }))
    };
  }

}
