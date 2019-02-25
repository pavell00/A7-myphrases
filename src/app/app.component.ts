import { Component } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'A7-FsAuth';
  items: Observable<any[]>;
  email: string;
  password: string;

  constructor(db: AngularFirestore, public auth: AuthService, private afAuth: AngularFireAuth) {
    //this.items = db.collection('employees').valueChanges();
  }

  public createUser() {
    this.afAuth.auth.createUserWithEmailAndPassword(this.email, this.password).then(
      res => console.log(res)
    ).catch(
      error => console.log('ERROR creating nuw user', error)
    )
  }
}
