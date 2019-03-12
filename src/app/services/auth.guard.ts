import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

import { take, map, tap,  } from 'rxjs/operators';
import { addAllToArray } from '@angular/core/src/render3/util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (localStorage.getItem('useremail')) 
      return true;
        
    //console.log('access denided');
    return false;
  }
}
