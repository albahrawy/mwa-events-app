

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './../service/userservice.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: UserService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        console.log("Intercept method called from JWTInterceptor..");
        // add authorization header with jwt token if available  
        const token = this.authenticationService.getToken();
        if (!!token) {
            request = request.clone({
                headers: request.headers.set("Authorization", "Bearer " + token)
            });
        }
        return next.handle(request);
    }
} 