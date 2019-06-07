import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { DataService } from './services/data.service';
import { UploadFileService } from './services/upload-file.service';
import { defineBase } from '@angular/core/src/render3';
import { FileUpload } from './models/fileupload';
import { Phrase } from './models/phrase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'A7-FsAuth';
  //items: Observable<any[]>;
  phrases: Phrase[] = [];
  email: string;
  password: string;
  progress: { percentage: number } = { percentage: 0 };

  constructor(db: AngularFirestore, public auth: AuthService, private afAuth: AngularFireAuth,
    private dataService: DataService, private router : Router, private uploadService: UploadFileService) {
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

    this.dataService.getItems() //getPhrases()
    .subscribe(
      data => { this.phrases = data; }
    )
  }

  createPhrase() { this.router.navigateByUrl('phrase-create'); }

  getListIrrVerbs() { this.router.navigateByUrl('irrverbs'); }

  saveToCloudStore() {
    let myBlob = new Blob([JSON.stringify(this.phrases)], {type: "application/json", endings: 'native'});
    let nameFile = this.email.slice(0, this.email.indexOf('@')); // name file is first part of user email
    var myFile = this.blobToFile(myBlob, nameFile + ".json");
    this.uploadService.pushFileToStorage(new FileUpload(myFile), this.progress);
  }

  public blobToFile = (theBlob: Blob, fileName:string): File => {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;
    //Cast to a File() type
    return <File>theBlob;
  }
}
