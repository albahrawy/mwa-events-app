import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { IResponseResult, IUserCredential } from '../user/model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  token: string | null = '';

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
      }), catchError(error => of({ success: false, message: error.error?.message || error.message })));
  }

  signup(user: any): Observable<IResponseResult> {
    return this.http.post<{ message: string }>(this.baseUrl + '/signup', user)
      .pipe(map(res => {
        return { success: true, message: res.message };
      }), catchError(error => {
        return of({ success: false, message: error.error?.message || error.message })
      }));
  }

}
