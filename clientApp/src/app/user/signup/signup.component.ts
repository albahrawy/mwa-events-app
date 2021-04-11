import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PopupService } from 'src/app/service/popup-msg.service';
import { UserService } from 'src/app/service/userservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  fg: FormGroup;
  busy = false;
  constructor(private builder: FormBuilder, private authService: UserService, private router: Router, private popupService: PopupService) {
    this.fg = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      cfPassword: ['', [this.validateMismatch]],
      name: this.builder.group({
        first: ['', [Validators.required]],
        last: ['', [Validators.required]]
      }),
      address: this.builder.group({
        state: ['', [Validators.required]],
        city: ['', [Validators.required]],
        zip: ['', [Validators.required]]
      })
    });
  }
  get formControls() { return this.fg.controls; }

  onSubmit(): void {
    this.busy = true;
    this.authService.signup(this.fg.value).subscribe(r => {
      this.busy = false;
      this.popupService.show(r.message);
      if (r.success) {
        this.router.navigate(['/']);
      }
    });
  }

  validateMismatch(control) {
    if (control.value != control.parent?.get('password').value) {
      return { mismatch: true };
    } else {
      return null;
    }
  }

}
