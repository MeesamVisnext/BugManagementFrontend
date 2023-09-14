// jwt.service.ts

import { Injectable } from '@angular/core';
// import * as jwt from 'jsonwebtoken';

@Injectable({
  providedIn: 'root',
})
export class JwtService {
  // decodeToken(token: string, secretKey: string): any {
  //   try {
  //     const decodedToken = jwt.verify(token, secretKey);

  //     if (decodedToken) {
  //       return decodedToken;
  //     } else {
  //       console.error('Invalid JWT token');
  //       return null;
  //     }
  //   } catch (error) {
  //     console.error('Error decoding JWT:', error);
  //     return null;
  //   }
  // }
  decodeToken(token: string): any {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
  }
}
