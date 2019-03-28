  import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

import { Phrase } from './phrase';
import { Observable, pipe } from 'rxjs';
import { distinct, tap, flatMap, map } from 'rxjs/operators';

import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { FileUpload } from './fileupload';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  //dataUrl = '../assets/language.json';
  //dataUrl = 'https://firebasestorage.googleapis.com/v0/b/myfirstfbapp-4fa9f.appspot.com/o/language.json?alt=media&token=f822950a-d291-44be-8d8f-878cbda365cc';
  dataUrl = 'https://firebasestorage.googleapis.com/v0/b/myfirstfbapp-4fa9f.appspot.com/o/dictionary%2Flanguage.json?alt=media&token=2305b3a6-93d3-4035-9a93-d71557f80d2d';
  items: Observable<Phrase[]>;

  constructor(private http: HttpClient) { }

  getItems()  : Observable<Phrase[]> {
    return this.items
  }

  getPhrases() : Observable<Phrase[]>{
    return this.http.get<Phrase[]>(this.dataUrl)
  }

  fillItems(name: string) {
    let url: string;
    let newstr: string;
    newstr = name.slice(0, name.indexOf('@'));
    switch (newstr) {
      case 'mytest2':
        url = "https://firebasestorage.googleapis.com/v0/b/myfirstfbapp-4fa9f.appspot.com/o/uploads%2Fmytest2.json?alt=media&token=8b15caaa-64fb-49b4-b3c0-c104102aacbd";  
        break;
      case 'mytest' :
        url = "https://firebasestorage.googleapis.com/v0/b/myfirstfbapp-4fa9f.appspot.com/o/uploads%2Fmytest.json?alt=media&token=78285f98-c477-4f39-9f25-5c78bc9afcf1";
        break;
      default:
        break;
    }
    
    this.items = this.http.get<Phrase[]>(url);
  }
  /*getPhrases2() {
    this.items = this.getPhrases();
  }*/

  getThemes() {
    return this.http.get<any[]>(this.dataUrl).pipe(
      map((s) => s),
      flatMap(a => a),
      //tap((v: Phrase) => console.log(v.theme)),
      distinct((t: Phrase) => t.theme)
    );
  }

  addPhrase(newEmp) {
    let emps = JSON.parse(localStorage.getItem('employees'));
    emps.push(newEmp);
    localStorage.setItem('employees', JSON.stringify(emps));
  }

  deletePhrase(id) {
    let emps = JSON.parse(localStorage.getItem('employees'));
    for(let i = 0; i <emps.length; i++) {
      if(emps[i].id == id) {
        emps.splice(i, 1);
      }
    }
    localStorage.setItem('employees', JSON.stringify(emps));
  }

  updatePhrase(oldEmp, newEmp){  let emps = JSON.parse(localStorage.getItem('employees'));
    for(let i = 0; i <emps.length; i++) {
      if(emps[i].id == oldEmp.id) {
        emps[i] = newEmp;
      }
    }
    localStorage.setItem('employees', JSON.stringify(emps));
  }

}
