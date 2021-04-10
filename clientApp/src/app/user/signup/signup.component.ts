import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/service/userservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  fg: FormGroup;
  error: string;
  busy = false;
  success = false;
  constructor(private builder: FormBuilder, private authService: UserService, private router: Router) {
    this.fg = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cfPassword: ['', [this.validateMismatch]]
    });
  }
  get formControls() { return this.fg.controls; }

  onSubmit(): void {
    this.busy = true;
    this.authService.signup(this.fg.value).subscribe(r => {
      this.busy = false;
      this.success = r.success;
      this.error = r.message;
    });
  }

  clearError() {
    this.error = null;
  }

  validateMismatch(control) {
    if (control.value != control.parent?.get('password').value) {
      return { mismatch: true };
    } else {
      return null;
    }
  }

}
