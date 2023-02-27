import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _isLoggedIn = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this._isLoggedIn.asObservable();

  private readonly apiURL: string = 'auth/login';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService) {

    const json = this.cookieService.get('user');
    if (json) {
      const currentUser: User = JSON.parse(json);
      this._isLoggedIn.next(!!currentUser.token);
    }
  }

  login(email: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/${this.apiURL}`, { email, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(`Used successfully logged in - ${user.email}`);
          this.cookieService.set('user', JSON.stringify(user), 1, '/');
          this._isLoggedIn.next(true);
        }

        return user;
      }));
  }


  logout() {
    this._isLoggedIn.next(false);
    this.cookieService.delete('user');
    this.router.navigate(['/login']);
  }

}
