import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators'
import { JwtService } from '../jwt/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  httpUrls: string = "http://localhost:8000";

  userData: any = {}

  constructor(private httpClient: HttpClient, private jwtService: JwtService) { }

  getProfile(): Observable<any> {
    return this.httpClient.get<any>(`${this.httpUrls}/api/users/tokenIsLive`, {
      headers: {
        Authorization: `duongductrong ${this.jwtService.getToken()}`
      }
    }).pipe(
      map(response => response),
      catchError(response => of(response.error))
    )
  }

  signUp(account): Observable<any> {
    return this.httpClient.post<any>(`${this.httpUrls}/api/users/signup`, account).pipe(

      map((response) => {
        const errors = response.payload.find(el => el["errors"]);
        if (errors) return;

        // response
        return response;
      }),

      catchError(data => {
        return of(data.error);
      })
    )
  }

  login(account): Observable<any> {
    return this.httpClient.post<any>(`${this.httpUrls}/api/users/login`, account).pipe(

      map((response) => {
        if (response.http_code === 200) {
          this.jwtService.setToken(response.token);
        }

        return response
      }),

      catchError(data => of(data.error))
    )
  }

  logout(): any {
    this.jwtService.clearToken();

    return true;
  }

  isAuthenticated(): Observable<any> {
    return this.httpClient.get<any>(`${this.httpUrls}/api/users/tokenIsLive`, {
      headers: {
        Authorization: `duongductrong ${this.jwtService.getToken()}`
      }
    }).pipe(

      map((response) => {
        if (response.http_code === 200) {
          return true
        }

        return false
      }),

      catchError(_ => of(false))
    )
  }

}
