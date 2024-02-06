import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  // Define form properties
  registerForm: FormGroup;
  submitted = false;
  loading = false;
  error = '';

  // Define form title and subtitle
  title: string = 'GEM';
  subtitle: string = 'Register Account';
  subtitle2: string = "Provide your details to register";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService) {
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
   }

  ngOnInit() {
  }

  // Convenience getter for easy access to form controls
  get formControls() { return this.registerForm.controls; }

  // Handle form submission
  onSubmit() {
    this.submitted = true;

    // Stop if form is invalid
    if (this.registerForm.invalid) {
      return;
    }

    // Perform registration logic here
    // ...

    // Set loading flag to display spinner
    this.loading = true;

    // Simulate a delay to simulate a server call
    this.authService.register(this.formControls['name'].value, this.formControls['email'].value, this.formControls['password'].value).subscribe({
      next: (value) => {
        this.router.navigate(['/login']);
      },
      error: (error) => {
        console.error(`register error ${error}`);
        this.error = "Invalid registration error" ;
        this.loading = false;
      },
      complete: () => {
        console.log('Completed');
        this.loading = false;
      }
    });

  }

}
