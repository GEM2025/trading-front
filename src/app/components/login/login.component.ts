import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading: boolean = false;
  submitted: boolean = false;
  error: string = "";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {

    console.log("LoginComponent constructor");

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // redirect to home if already logged in
    if (this.authService.isLoggedIn()) {
      console.log("User Logged In already");
      this.router.navigate(['/home']);
    }
  }

  ngOnInit(): void {
    console.log("ngOnInit");
  }

  get formControls() { return this.loginForm.controls; }

  onSubmit(): void {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }

    this.loading = true;
    this.authService.login(this.formControls['username'].value, this.formControls['password'].value)
      .subscribe(
        data => {
          this.router.navigate(['/home']);
        },
        error => {
          this.error = error;
          this.loading = false;
        });

  }

}
