import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';
import jwt_decode from 'jwt-decode';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {

  const sharedService = inject(SharedService);
  const router = inject(Router);
  const cookieService = inject(CookieService);
  const user = sharedService.getSession();

  let token = cookieService.get('Authorization');

  if(token && user){
    token = token.replace('Bearer ', '');
    const decodeToken:any = jwt_decode(token);

    const expirationDate = decodeToken.exp * 1000;
    const actualDate = new Date().getTime();

    if(expirationDate < actualDate){
      router.navigate(['login']);
      return false;
    }

    return true;
  }
  else{
    router.navigate(['login']);
    return false;
  }

};
