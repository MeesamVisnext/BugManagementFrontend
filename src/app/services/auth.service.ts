
// auth.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient, private router:Router) { }

  login(credentials: { email: string; password: string }) : Observable<any>{
    return this.http.post('http://localhost:3000/api/v1/users/login', credentials);
  }
  logout() {
    // Clear the token from cookies
    localStorage.removeItem('token');
    this.router.navigate(['/Login'])
  }
}

