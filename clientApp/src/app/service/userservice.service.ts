import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of, zip } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators';
import { IResponseResult, IUserCredential } from '../user/model';
import { getUrl } from '../service/config';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private userInfo: { token: string, email: string };

  loggedInChanges: BehaviorSubject<boolean>;

  constructor(private http: HttpClient, private router: Router) {
    this.loggedInChanges = new BehaviorSubject(false);
  }

  getToken() {
    return this.getUserInfo()?.token;
  }

  getUserInfo() {
    if (!this.userInfo) {
      const cachedInfo = localStorage.getItem('userInfo');
      if (!!cachedInfo) {
        this.userInfo = JSON.parse(cachedInfo);
      }
    }
    return this.userInfo;
  }

  logout() {
    if (!!this.getToken()) {
      this.userInfo = null;
      this.loggedInChanges.next(false);
      localStorage.removeItem('userInfo');
      this.router.navigate(['/']);
    }
  }

  signIn(user: IUserCredential): Observable<IResponseResult> {
    return this.http.post<{ token: string, email: string }>(getUrl('users', 'signin'), user)
      .pipe(map(res => {
        this.userInfo = res;
        localStorage.setItem('userInfo', JSON.stringify(this.userInfo));
        this.loggedInChanges.next(true);
        return { success: true };
      }), catchError(error => of({ success: false, message: error.error?.message || error.message })));
  }

  signup(user: any): Observable<IResponseResult> {
    return this.http.post<{ message: string }>(getUrl('users', 'signup'), user)
      .pipe(map(res => {
        return { success: true, message: res.message };
      }), catchError(error => {
        return of({ success: false, message: error.error?.message || error.message })
      }));
  }

}
