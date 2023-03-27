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

  private _isAdmin = new BehaviorSubject<boolean>(false);
  isAdmin$ = this._isAdmin.asObservable();

  private readonly apiURL: string = 'auth';

  constructor(
    private http: HttpClient,
    private router: Router,
    private cookieService: CookieService) {

    const json = this.cookieService.get('user');
    if (json) {
      const currentUser: User = JSON.parse(json);
      this._isLoggedIn.next(!!currentUser.token);
      this._isAdmin.next(currentUser.role === "ADMIN");
    }
  }

  public login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.apiURL}/login`, { email, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(`User successfully logged in - ${user.email} - role ${user.role}`);
          this.cookieService.set('user', JSON.stringify(user), 1, '/');
          this._isLoggedIn.next(true);
        }

        return user;
      }));
  }

  public logout() {
    this._isLoggedIn.next(false);
    this.cookieService.delete('user');
    this.router.navigate(['/login']);
  }

  public register(name: string, email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/${this.apiURL}/register`, { name, email, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          console.log(`Used successfully registered - ${user.email}`);
        }

        return user;
      }));
  }


  // hector.contact@gmail.com
  // hector@gmail.com

  public resetPassword(email: string, password: string): Observable<any> {
    const url = `${environment.apiUrl}/${this.apiURL}/resetpassword`;
    console.log(`Reset Password for ${email} ${password} ${url}`);
    return this.http.post<any>(url, { email, password })
      .pipe(map(response => {
        console.log('Password reset successful');
        // this.router.navigate(['/']);
        return response;
      }));
  }

}
