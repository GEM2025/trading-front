import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Response } from '../interfaces/response.interface';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly apiURL: string = 'auth';

  // https://www.youtube.com/watch?v=s1qgSzEtCRI
  private headers: HttpHeaders;

  constructor(
    private http: HttpClient,
    private cookieService: CookieService) {

    const currentUser: User = JSON.parse(this.cookieService.get('user'));

    this.headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${currentUser.token}`
    });
  }

  // fech Users
  getUsers(skip: number, limit: number): Observable<any> {
    const url = `${environment.apiUrl}/${this.apiURL}?skip=${skip}&limit=${limit}`;
    console.log(`UserService.getUsers url=${url}`);
    return this.http.get<any>(url, { headers: this.headers }).pipe(
      map(response => this.processResponse(response)));
  }

  private processResponse(response: Response): Response {
    return {
      info: { ...response.info },
      results: response.results.map((user: any) => (<User>{
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        enabled: user.enabled
      }))
    };
  }

}
