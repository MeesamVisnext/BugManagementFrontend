import { Component, ElementRef, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms'
import { SignUpService } from '../services/sign-up.service';
import { AuthService } from '../services/auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'bug-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {

  isMatch: boolean = true;
  msg: string = '';

  constructor(private signUpService: SignUpService,
    private authService: AuthService,
    private router: Router) { }

  // @ViewChild('usernameField') usernameField!: ElementRef;
  // @ViewChild('emailField') emailField!: ElementRef;
  // @ViewChild('passwordField') passwordField!: ElementRef;
  // @ViewChild('confirmPasswordField') confirmPasswordField!: ElementRef;
  // @ViewChild('userTypeField') userTypeField!: ElementRef;
  onSubmit(signupForm: NgForm) {
    if (signupForm.valid) {
      // Perform signup logic here (e.g., API request)
      console.log('Form submitted with data:', signupForm.value);
      const data = {
        username: signupForm.value.username,
        email: signupForm.value.email,
        password: signupForm.value.password,
        userType: signupForm.value.userType
      }
      if (signupForm.value.password === signupForm.value.confirmPassword) {
        this.addUser(data);
        signupForm.resetForm();
      }
      else{
        alert('Password do not matched')
      }
    }
    // if(this.passwordField.nativeElement.value !== this.confirmPasswordField.nativeElement.value){
    //   alert('Password not match');
    // } 
    // if(this.isMatch){
    //   this.isMatch=true;
    //   const data: any = {
    //     username : this.usernameField.nativeElement.value,
    //     email : this.emailField.nativeElement.value,
    //     password : this.passwordField.nativeElement.value,
    //     userType : this.userTypeField.nativeElement.value,
    //   }
    //   this.addUser( data);
    //    // Reset the form
    // form.resetForm();
    // }
    //  // Reset the form
    //  form.resetForm();
  }
  addUser(data: any) {
    this.signUpService.sendDataToApi(data).subscribe((response: any) => {
      this.msg = response.message;
      this.authService.login(data).subscribe((response) => {
        console.log('comming in subscription of login')
        localStorage.setItem('token', response.token);
        console.log(response.token);
        this.router.navigate(['/dashboard']);
      }, (error) => {

        this.msg = error.error.message;
        alert(this.msg + '. If you have not sign up then first SignUp and then come here');
      }
      );
    }, (error: any) => {
      this.msg = error.error.message;
      alert(this.msg)
    })
  }
}


