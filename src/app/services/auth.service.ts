import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import {auth} from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Observable, of, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from './user.model';
import { error } from 'util';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private isLogged$ = new BehaviorSubject<boolean>(false);

  constructor(private afAuth: AngularFireAuth, private afs: AngularFirestore, private router: Router) {
      /*this.afAuth.authState.subscribe(
        res => this.user2$.next(res)
      )*/
      /*this.user$ = this.afAuth.authState.pipe(
        switchMap(user => {
          if(user) {
            return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
          } else {
            return of(null);
          }
        })
      );*/
  }

  isLoggedIn(): Observable<boolean> {
    return this.isLogged$.asObservable();
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.isLogged$.next(false);
    localStorage.removeItem('useremail');
    return this.router.navigate(['/login']);
  }

  async emailSignin(email: string, password: string) {
    //this.afAuth.auth.signInWithEmailAndPassword('mytest@test.com', '123456').then(
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      (success) =>  {console.log(success.user.email);
                    localStorage.setItem('useremail', success.user.email);
                    this.isLogged$.next(true);
                    //this.user2$.next(success.user);
                    this.router.navigate(['/phrases']);}
    ).catch(
      (error) => console.log('ERROR', error)
    )
    //const provider = new auth.EmailAuthProvider();
    //const credential = await this.afAuth.auth.signInWithPopup(provider);
    //return this.updateUserData(credential.user);
  }

}
