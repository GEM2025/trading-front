import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from '../models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isAuthenticated = false;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  private readonly apiURL: string = 'users/authenticate';

  constructor(
    private http: HttpClient,
    private router: Router) {
    const currentUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<User>(currentUser ? JSON.parse(currentUser) : {});
    this.currentUser = this.currentUserSubject.asObservable();
  }

  login(username: string, password: string) {
    return this.http.post<any>(`${environment.apiUrl}/${this.apiURL}`, { username, password })
      .pipe(map(user => {
        // login successful if there's a jwt token in the response
        if (user && user.token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
        }

        return user;
      }));
  }


  logout() {
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  isLoggedIn() {
    return this.isAuthenticated;
  }

}
