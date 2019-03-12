import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

import { take, map, tap,  } from 'rxjs/operators';
import { addAllToArray } from '@angular/core/src/render3/util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private auth: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user2$.pipe(
      take(1),
      map(user => !!user),
      tap(loggedIn => {
        if (!loggedIn) {
          console.log('access denided');
          this.router.navigate(['/login']);
        }
      })
    );
    /*return this.auth.user2$.pipe(
      tap(loggedIn => {
        console.log(loggedIn);
        if (!loggedIn) {
          console.log('access denided', loggedIn);
          this.router.navigate(['/login']);
        }
      })
    );*/
    
    //return of(true)
    }
}
