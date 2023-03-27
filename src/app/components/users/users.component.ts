import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Response } from 'src/app/interfaces/response.interface';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  usersResponse?: Response;

  constructor(
    private userService: UserService,
    private router: Router,
    private cookieService: CookieService)
  {
  }

  ngOnInit(): void {
    const currentUser: User = JSON.parse(this.cookieService.get('user'));
    if (currentUser.role === "ADMIN" ) {
      this.userService.getUsers(0, 9999)
      .subscribe(
        (response: any) => {
          console.log(response.info);
          this.usersResponse = response.results ;
        });
    }
    else {
      this.router.navigate(['/home']);
    }
  }

}
