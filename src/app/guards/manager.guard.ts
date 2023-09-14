// import { CanActivateFn } from '@angular/router';
// import { UserModel } from '../interfaces/userModel';

// export const managerGuard: CanActivateFn = (route, state) => {
//    const user!:UserModel; 
//    const token = localStorage.getItem('token');
//     if (token) {
//       const decodedToken = this.jwtService.decodeToken(token);
//       if(decodedToken){

//         console.log(decodedToken.user);
//         this.user = decodedToken.user;
//         console.log(this.user);
//       }
// };
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { JwtService } from '../services/jwt.service';
import { UserModel } from '../interfaces/userModel';

@Injectable({
  providedIn: 'root',
})
export class ManagerGuard implements CanActivate {
  constructor(private router: Router, private jwtService:JwtService) {} // Inject the Router

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtService.decodeToken(token); // Use the injected service
      if (decodedToken.user.user_type === 'Manager') {
        return true; // User is authenticated, allow access
      }
      else{
        alert('Restricted access.');
        return false;
      }
    }
    return false;
  }
}

