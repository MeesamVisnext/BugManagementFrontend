import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Bug } from '../interfaces/bug';


@Injectable({
  providedIn: 'root',
})
export class BugService {
  constructor(private http: HttpClient, private router: Router) { }

  getBugsCreated(): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/bugs/created');
  }
  getBugsAssigned(): Observable<any> {
    return this.http.get('http://localhost:3000/api/v1/bugs/assigned');
  }
  addBug(bugData: any, selectedImage: File| undefined) {
    // const apiUrl = 'http://localhost:3000/api/v1/bugs/addbug';

    // // Send a POST request to the API with the user-entered data
    // return this.http.post(apiUrl, data, { headers: { 'Content-Type': 'application/json' }});
    const formData = new FormData();
    if(selectedImage){
    formData.append('image', selectedImage); // Pass the selectedImage here
    }
    formData.append('bugData', JSON.stringify(bugData));

    const apiUrl = 'http://localhost:3000/api/v1/bugs/addbug';

    return this.http.post(apiUrl, formData)
  }
  updateBugStatus(bug: Bug): Observable<any> {
    const apiUrl = `http://localhost:3000/api/v1/bugs/${bug.bug_id}`;

    // Send a PUT request to update the bug's status
    return this.http.put(apiUrl, { state: bug.state });
  }
}
