import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignUpService {
  constructor(private http: HttpClient) {}

  sendDataToApi(data: any) {
    const apiUrl = 'http://localhost:3000/api/v1/users/signup';

    // Send a POST request to the API with the user-entered data
    return this.http.post(apiUrl, data);
  }
}
