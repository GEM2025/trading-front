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
  title: string = 'CTX';
  subtitle: string = 'Condor Trading Exchange';
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
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

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

    console.log(`Logging-in ${this.formControls['email'].value}`);

    this.loading = true;
    this.authService.login(this.formControls['email'].value, this.formControls['password'].value).subscribe({
      next: (value) => {
        this.router.navigate(['/home']);
      },
      error: (error) => {
        console.error(`login error ${error}`);
        this.error = "Invalid user/password" ;
        this.loading = false;
      },
      complete: () => {
        console.log('Completed');
        this.loading = false;
      }
    });

  }

}
