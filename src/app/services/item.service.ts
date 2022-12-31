import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../interfaces/response.interface';
import { Car } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemService {

  private readonly apiURL: string = 'http://localhost:3002/item';

  constructor(private http: HttpClient) { }

  // fech items
  getItems(size: number = 25): Observable<any> {
    return this.http.get<any>(`${this.apiURL}?limit=${size}`).pipe(
      map(response => this.processResponse(response)));
  }

  // fetch specific item
  getItem(id: string = ""): Observable<any> {
    const url = `${this.apiURL}/${id}` ;
    console.log(`Get item '${url}'`);
    return this.http.get<any>(url).pipe(
      map(response => this.processResponse(response)));
  }

  private processResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map((car: any) => (<Car>{
        id: car._id,
        color: car.color,
        gas: car.gas,
        year: car.year,
        price: car.price*1.15,
        description: car.description || "No description available"
      }))
    };
  }

}
