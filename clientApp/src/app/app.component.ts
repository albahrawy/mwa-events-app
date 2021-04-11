import { Component } from '@angular/core';
import { UserService } from './service/userservice.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(private userservice: UserService) { }

  logout() {
    this.userservice.logout();
  }

  get isLoggedIn() {
    return !!this.userservice.getToken();
  }
}
