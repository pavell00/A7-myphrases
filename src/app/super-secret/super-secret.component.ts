import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs';
import { FileUpload } from './fileupload';

@Component({
  selector: 'app-super-secret',
  templateUrl: './super-secret.component.html',
  styleUrls: ['./super-secret.component.css']
})
export class SuperSecretComponent implements OnInit {
  dictionary: string;
  item: Observable<any>;
  private itemDoc: AngularFirestoreDocument<any>;
  ref: any;
  task: AngularFireUploadTask;
  file: File;
  email: any;

  items  = [{ name: "archie", age:25 }, { name: "jake", age:25 }, { name: "richard", age:30 , manager:[{empl:"Jhon"}, {empl:"Dixy"}]}, { name: "poll", age:20 }];

  constructor(private auth: AuthService, private  afs: AngularFirestore, 
              private adb: AngularFireDatabase, private afstorage: AngularFireStorage) { }

  ngOnInit() {
    /*this.auth.user2$.subscribe(
      res => {
        if (res) {
          this.email = res.email;
        } else { this.email = '' }
      }
    )*/
  }

  getMyJson(event: any) {
    /*this.auth.user$.subscribe(
      res => {
        this.dictionary = res.uid;
        this.itemDoc = this.afs.doc<any>('/employees/'+res.uid);
        this.item = this.itemDoc.valueChanges();
      }
    )*/
    //console.log(event.target);
    //const ref = this.afstorage.ref('/dictionary/test.json');
    //this.task = this.afstorage.upload('/dictionary/test.json', event.target.files[0])
    //this.task = this.ref.put('./test.json');
    //console.log(this.user);
    this.afstorage.upload('/upload/'+this.email+'.json',  event.target.files[0]);
    //this.adb.list('dictionary').push('./test.json');
  }

  saveArrayToJson() {
    let newFile = new Blob([JSON.stringify(this.items)], {type: "application/json", endings: 'native'});
    this.afstorage.upload('/upload/'+this.email+'.json',  newFile);
  }
}
