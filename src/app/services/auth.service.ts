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
  user$: Observable<User>;
  user2$ = new BehaviorSubject(null);

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router) {
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

  async googleSignin() {
    const provider = new auth.GoogleAuthProvider();
    //const credential = await this.afAuth.auth.signInWithPopup(provider);
    //return this.updateUserData(credential.user);
    this.afAuth.auth.signInWithRedirect(provider);
    this.afAuth.auth.getRedirectResult()
    .then(
      result => {
        if (result.user) {
          this.updateUserData(result.user);
        }
      }
    ).catch(
      error => console.log('ERROR', error)
    )
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    return this.router.navigate(['/']);
  }

  private updateUserData({uid, email, displayName, photoURL}: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${uid}`);
    const data = {uid,  email, displayName, photoURL};
    console.log(data);
    return userRef.set(data, {merge: true});
  }

  async emailSignin(email: string, password: string) {
    //this.afAuth.auth.signInWithEmailAndPassword('mytest@test.com', '123456').then(
    this.afAuth.auth.signInWithEmailAndPassword(email, password).then(
      (success) =>  {console.log(success.user.email); 
                     this.user2$.next(success.user);
                     this.router.navigate(['/phrases']);}
    ).catch(
      (error) => console.log('ERROR', error)
    )
    //const provider = new auth.EmailAuthProvider();
    //const credential = await this.afAuth.auth.signInWithPopup(provider);
    //return this.updateUserData(credential.user);
  }

}
