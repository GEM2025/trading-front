import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../interfaces/response.interface';
import { environment } from 'src/environments/environment';
import { Currency } from '../interfaces/currency.interface';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {

  private readonly apiURL: string = 'currency';

  constructor(private http: HttpClient) { }

  // fech currencies
  getCurrencies(skip: number, limit: number): Observable<any> {
    const url = `${environment.apiUrl}/${this.apiURL}?skip=${skip}&limit=${limit}` ;
    console.log(`CurrencyService.getCurrencies url=${url}`);
    return this.http.get<any>(url).pipe(
      map(response => this.processResponse(response)));
  }

  // fetch specific currency
  getCurrency(id: string = ""): Observable<any> {
    const url = `${environment.apiUrl}/${this.apiURL}/${id}`;
    console.log(`Get currency '${url}'`);
    return this.http.get<any>(url).pipe(
      map(response => this.processResponse(response)));
  }

  private processResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map((currency: any) => (<Currency>{
        id: currency._id,
        name: currency.name,
        enabled: currency.enabled,
      }))
    };
  }
}
