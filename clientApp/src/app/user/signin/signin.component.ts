import { AfterContentInit, Component, ContentChild, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/service/userservice.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  fg: FormGroup;
  error: string;
  busy = false;
  constructor(private builder: FormBuilder, private authService: UserService, private router: Router) {
    this.fg = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get formControls() { return this.fg.controls; }

  onSubmit(): void {
    this.busy = true;
    this.authService.signIn(this.fg.value).subscribe(r => {
      this.busy = false;
      if (r.success) {
        this.router.navigateByUrl('/admin');
        this.error = "success";
      } else {
        this.error = r.message;

      }
    });
  }

  clearError() {
    this.error = null;
  }

}
