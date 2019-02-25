import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-super-secret',
  templateUrl: './super-secret.component.html',
  styleUrls: ['./super-secret.component.css']
})
export class SuperSecretComponent implements OnInit {
  dictionary: string;
  item: Observable<any>;
  private itemDoc: AngularFirestoreDocument<any>;

  constructor(private auth: AuthService, private  afs: AngularFirestore) { }

  ngOnInit() {
  }

  getMyJson() {
    this.auth.user$.subscribe(
      res => {
        this.dictionary = res.uid;
        //console.log(`/employees/`+res.uid);
        this.itemDoc = this.afs.doc<any>('/employees/'+res.uid);
        this.item = this.itemDoc.valueChanges();
      }
    )

  }
}
