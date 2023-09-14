// auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private router:Router) { }

  getUsers() : Observable<any>{
    return this.http.get('http://localhost:3000/api/v1/users');
  }

  getUsersByProjectId(project_id:number) : Observable<any>{

    // Create an instance of HttpParams and set the single parameter
    let params = new HttpParams().set('project_id', project_id);

    // Make the GET request with the query parameter
    return this.http.get<any>('http://localhost:3000/api/v1/users/userByProjectId', { params });
    }
    getAssignedUsers(project_id:number) : Observable<any>{

      // Create an instance of HttpParams and set the single parameter
      let params = new HttpParams().set('project_id', project_id);
  
      // Make the GET request with the query parameter
      return this.http.get<any>('http://localhost:3000/api/v1/users/assignedUsers', { params });
      }

}
