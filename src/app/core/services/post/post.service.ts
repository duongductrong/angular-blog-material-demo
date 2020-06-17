import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { JwtService } from '../jwt/jwt.service';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  httpUrls: string = "http://localhost:8000";

  constructor(private httpClient: HttpClient, private jwtService: JwtService) { }

  getPosts(): Observable<any> {
    return this.httpClient.get(`${this.httpUrls}/api/posts`, { headers: { Authorization: `duongductrong ${this.jwtService.getToken()}` } }).pipe(
      map(response => response),
      catchError(response => of(response.error))
    )
  }

  getPost(postId): Observable<any> {
    return this.httpClient.get(`${this.httpUrls}/api/posts/${postId}`, { headers: { Authorization: `duongductrong ${this.jwtService.getToken()}` } }).pipe(
      map(response => response),
      catchError(response => of(response.error))
    )
  }

  createPost(data): Observable<any> {
    return this.httpClient.post(`${this.httpUrls}/api/posts`, data, { headers: { Authorization: `duongductrong ${this.jwtService.getToken()}` } }).pipe(
      map(response => response),
      catchError(response => of(response.error))
    )
  }
}
