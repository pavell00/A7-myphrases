import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService} from './services/data.service';
import { defineBase } from '@angular/core/src/render3';

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

  constructor(db: AngularFirestore, public auth: AuthService, private afAuth: AngularFireAuth,
    private dataService: DataService, private router : Router) {
    //this.items = db.collection('employees').valueChanges();
  }

  ngOnInit() {
    //this.dataService.getPhrases2();
    this.auth.user2$.subscribe(
      res => {
        if (res) {
          this.email = res.email;
        } else { this.email = '' }
      }
    )
  }

  createPhrase() { this.router.navigateByUrl('phrase-create'); }

  getListIrrVerbs() { this.router.navigateByUrl('irrverbs'); }

  saveToCloudStore() {

  }
}
