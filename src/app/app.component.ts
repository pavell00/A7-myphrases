import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'A7-FsAuth';
  items: Observable<any[]>;
  email: string;
  password: string;
  isLogged : Observable<boolean>;

  constructor(db: AngularFirestore, public auth: AuthService, private afAuth: AngularFireAuth) {
    //this.items = db.collection('employees').valueChanges();
    this.isLogged = this.auth.isLoggedIn();
  }

  ngOnInit() {
    /*this.auth.user2$.subscribe(
      res => {
        if (res) {
          this.email = res.email;
        } else { this.email = '' }
      }
    )*/
  }

  public createUser() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(
      res => console.log(res)
    ).catch(
      error => console.log('ERROR creating nuw user', error)
    )
  }
}
