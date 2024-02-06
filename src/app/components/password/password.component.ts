import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  title: string = 'GEM';
  subtitle: string = 'Forgot Password';

  passwordForm: FormGroup;
  submitted = false;
  loading = false;
  error?: string;
  mode?: string | null;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService) {

    this.passwordForm = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      });
  }

  ngOnInit() {
    this.mode = this.route.snapshot.paramMap.get('mode');
    if (this.mode === 'passwordLost') {
      this.passwordForm.get('password')?.clearValidators();
      this.passwordForm.get('password')?.updateValueAndValidity();
    } else if (this.mode === 'passwordReset') {
      this.passwordForm.get('email')?.clearValidators();
      this.passwordForm.get('email')?.updateValueAndValidity();
    }
  }

  get formControls() {
    return this.passwordForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    if (this.passwordForm.invalid) {
      return;
    } else if (this.mode === 'passwordReset') {
      // Call resetPassword method on userService
      this.authService.resetPassword(this.formControls['email'].value, this.formControls['password'].value);
      this.loading = true;
    }
    else if (this.mode === 'passwordLost') {
      this.mode = 'passwordReset';
    }
  }
}
