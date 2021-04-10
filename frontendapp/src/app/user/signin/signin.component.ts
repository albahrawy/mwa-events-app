import { AfterContentInit, Component, ContentChild, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { UserService } from 'src/app/service/userservice.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {

  // @Input() label: string;

  fg: FormGroup;
  error: string;
  constructor(private builder: FormBuilder, private authService: UserService, private router: Router) {
    this.fg = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get formControls() { return this.fg.controls; }

  onSubmit(): void {
    this.authService.signIn(this.fg.value).subscribe(r => {
      if (r.success) {
        this.router.navigateByUrl('/admin');
        this.error = "success";
      } else {
        this.error = r.errorMessage;

      }
    });
  }

}
