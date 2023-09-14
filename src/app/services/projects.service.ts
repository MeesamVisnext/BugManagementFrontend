import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient, private router:Router) { }

  getProjects() : Observable<any>{
    return this.http.get('http://localhost:3000/api/v1/projects');
  }
  addProject(data: any) {
    const apiUrl = 'http://localhost:3000/api/v1/projects/addproject';

    // Send a POST request to the API with the user-entered data
    return this.http.post(apiUrl, data);
  }
  updateProject(data:any){
    const apiUrl = 'http://localhost:3000/api/v1/projects/updateproject';
    return this.http.put(apiUrl, data);
  }
}

