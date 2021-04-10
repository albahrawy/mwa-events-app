import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { IResponseResult, IUserCredential } from '../user/mode';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string | null = '';
  responseMessage: any;

  baseUrl: string = 'http://localhost:3000/users';

  constructor(private http: HttpClient) { }

  getToken() {
    return this.token || (this.token = localStorage.getItem('token'));
  }

  signIn(user: IUserCredential): Observable<IResponseResult> {
    return this.http.post<{ token: string }>(this.baseUrl + '/signin', user)
      .pipe(map(res => {
        this.token = res.token;
        localStorage.setItem('token', this.token);
        return { success: true };
      }), catchError(error => of({ success: false, message: error })));
  }

  signup(user: any) {
    this.http.post(this.baseUrl + '/signup', user)
      .subscribe(resp => {
        console.log(resp);
        this.responseMessage = resp;
      })
    return this.responseMessage;
  }

}
