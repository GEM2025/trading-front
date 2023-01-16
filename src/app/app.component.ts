import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  dateTime: Date;

  /**
   *
   */
  constructor(public authService: AuthService) {
    this.dateTime = new Date();
  }

  ngOnInit(): void {
    setInterval(() =>
    {
      this.dateTime = new Date();
    }, 1000);

  }

  logout(): void {
    this.authService.logout();
  }

}
