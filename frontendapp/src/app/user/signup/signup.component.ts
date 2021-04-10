import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/service/userservice.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupForm: FormGroup;
  error: string;
  // isLoading: boolean = false;
  isSubmitted  =  false;
  
  constructor(private builder: FormBuilder, private authService: UserService) {
    this.signupForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  get formControls() { return this.signupForm.controls; }

  onSubmit(): void {
    this.authService.signup(this.signupForm.value).subscribe(r => {
      if (r.success) {
        this.error = "success";
      } else {
        this.error = r.errorMessage;

      }
    });
  }

  // onSubmit() {
  //   this.isLoading = true;
  //   const account = {
  //     email: this.signupForm.value.email,
  //     password: this.signupForm.value.password
  //   };

  //   this.isLoading = true;
  //   const response = this.authService.signup(account);

  //   if (response) {
  //     this.isLoading = false;
  //     console.log(response);
  //   } else {
  //     this.error = response;
  //     this.isLoading = false;
  //   }
  // }

}
