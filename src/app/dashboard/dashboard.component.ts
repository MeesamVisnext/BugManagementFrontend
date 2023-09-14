import { Component, OnInit } from '@angular/core';
import { UserModel } from '../interfaces/userModel';
import { JwtService } from '../services/jwt.service';


@Component({
  selector: 'bug-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
 user!: UserModel;

  constructor(private jwtService: JwtService) { }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token);
      if(decodedToken){

        console.log(decodedToken.user);
        this.user = decodedToken.user;
        console.log(this.user);
      }
    }
  }
}

