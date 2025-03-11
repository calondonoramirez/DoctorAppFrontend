import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SharedService } from '../shared/shared.service';

export const authGuard: CanActivateFn = (route, state) => {

  const sharedService = inject(SharedService);
  const router = inject(Router);
  const userToken = sharedService.getSession();

  if(userToken != null){
    return true;
  }
  else{
    router.navigate(['login']);
    return false;
  }

};
