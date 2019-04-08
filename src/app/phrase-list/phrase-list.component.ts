import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Phrase } from '../models/phrase';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-phrase-list',
  templateUrl: './phrase-list.component.html',
  styleUrls: ['./phrase-list.component.css']
})
export class PhraseListComponent implements OnInit {
  phrases: Phrase[] = [];
  phrasesFiltered: Phrase[] = [];//lng
  themes: string[] = ['ALL'];
  ratings: string[] = ['ALL'];
  currentTheme: string;
  currentRating: string;
  
  lngRUS: boolean = false;
  lngENG: boolean = false;
  lngESP: boolean = false;

  displayedColumns: string[] = [];
  columnsToDisplay: string[] = [];

  constructor(private dataService: DataService, private router : Router, private auth: AuthService) { }

  ngOnInit(): void {
    //this.onStart();
    this.onThemes();
    this.onRating();
  }

  onSearch() {
    this.displayedColumns = [];
    if (this.lngRUS) this.displayedColumns.push('langRUS');
    if (this.lngENG) this.displayedColumns.push('langENG');
    if (this.lngESP) this.displayedColumns.push('langESP');
    this.columnsToDisplay = this.displayedColumns.slice();
    this.dataService.getItems() //getPhrases()
    .subscribe(
      data => { this.parseObject(data); }
      //data => { this.phrasesFiltered  = data }
    )
  }

  parseObject(obj : Phrase[]) {
    this.phrases = [];
    obj.forEach(element => {
      let oo = new Phrase();
      if (this.lngRUS) oo.langRUS = element.langRUS;
      if (this.lngENG) oo.langENG = element.langENG;
      if (this.lngESP) oo.langESP = element.langESP;
      oo.rating = element.rating;
      oo.unit = element.unit;
      oo.theme = element.theme;
      if (this.lngRUS || this.lngENG || this.lngESP) {
        this.phrases.push(oo);
      }
    });
     //this.phrasesFiltered = this.phrases.filter(v => v.theme === this.currentTheme && v.rating === 2);
     //this.phrasesFiltered = this.phrases.filter(v => v.theme === this.currentTheme);
     //this.phrasesFiltered = this.phrases.filter(v => v.theme.match('.*'));
     if (this.currentTheme === 'ALL') this.currentTheme = '.*';
     if (this.currentRating === 'ALL') this.currentRating = '.*';
     this.phrasesFiltered = this.phrases.filter(v => v.theme.match(this.currentTheme) && v.rating.toString().match(this.currentRating));
     //console.log(this.phrasesFiltered);
  }

  onTest() {
    let oo = new Phrase();
    oo.id = '10';
    oo.langRUS = 'ыыыы';
    oo.langENG = 'sssssss';
    oo.langESP = 'qqqq';
    oo.rating = 5;
    oo.unit = 33;
    oo.theme = 'test';
    this.phrasesFiltered.splice(1, 0, oo);
  }

  onThemes() {
    this.dataService.getThemesFromItems() //getThemes()
      .subscribe(
        data => {this.themes.push(data.theme)}
      )
  }

  onRating() {
    this.dataService.getRatingFromItems()
      .subscribe(
        data => {this.ratings.push(data.rating.toString())}
      )
  }


  changeThemes(value: string) {
    this.currentTheme = value;
  }

  changeRating(value: string) {
    this.currentRating = value;
  }

  createPhrase() { this.router.navigateByUrl('phrase-create'); }

  getListIrrVerbs() { this.router.navigateByUrl('irrverbs'); }
}
