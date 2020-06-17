import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  constructor() { }

  getToken() {
    return localStorage.getItem('access_token');
  }

  setToken(token) {
    return localStorage.setItem('access_token', token);
  }

  clearToken() {
    return localStorage.removeItem('access_token');
  }

  isToken() {
    return localStorage.getItem('access_token') ? true : false;
  }
}
