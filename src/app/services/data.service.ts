import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';

import { Phrase } from './phrase';
import { Observable, pipe, of } from 'rxjs';
import { distinct, tap, flatMap, map, max } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  phrases$: Observable<Phrase>

  //dataUrl = '../assets/language.json';
  //dataUrl = 'https://firebasestorage.googleapis.com/v0/b/myfirstfbapp-4fa9f.appspot.com/o/language.json?alt=media&token=f822950a-d291-44be-8d8f-878cbda365cc';
  dataUrl = 'https://firebasestorage.googleapis.com/v0/b/myfirstfbapp-4fa9f.appspot.com/o/dictionary%2Flanguage.json?alt=media&token=2305b3a6-93d3-4035-9a93-d71557f80d2d';

  constructor(private http: HttpClient) { }

  getPhrases() : Observable<Phrase[]>{
    return this.http.get<Phrase[]>(this.dataUrl);
  }

  getMaxId() {
    return this.http.get<any[]>(this.dataUrl).pipe(
      map((s) => s),
      flatMap(a => a),
      max<Phrase>((a: Phrase, b: Phrase) => Number(a.id) < Number(b.id) ? -1 : 1)
    );
  }

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
