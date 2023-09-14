import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { UserModel } from '../interfaces/userModel';



@Component({
  selector: 'bug-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  msg!:string;
  constructor(private authService: AuthService, private router: Router) { }
  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(token){
      this.router.navigate(['/dashboard']);
    }
  }
  onSubmit(loginForm: NgForm) {

    if (loginForm.valid) {
      const credentials = {
        email: loginForm.value.email,
        password: loginForm.value.password,
      };
      this.authService.login(credentials).subscribe((response) => {
        console.log('comming in subscription of login')
        localStorage.setItem('token', response.token);
        console.log(response.token);
        this.router.navigate(['/dashboard']);
      }, (error) => {
      
          this.msg = error.error.message;
          alert(this.msg+'. If you have not sign up then first SignUp and then come here');
      }
      );
      loginForm.resetForm();
    }
  }
}