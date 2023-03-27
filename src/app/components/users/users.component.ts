import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService)
  {
  }

  ngOnInit(): void {
    const currentUser: User = JSON.parse(this.cookieService.get('user'));
    if (currentUser.role !== "ADMIN" ) {
      this.router.navigate(['/home']);
    }
  }

}
