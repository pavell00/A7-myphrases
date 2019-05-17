import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Phrase } from '../models/phrase';
//const fs = require('fs');
//const fs = (<any>window).require("fs");
//import * as fs from 'fs';

@Component({
    selector: 'app-phrase-create',
    templateUrl: './phrase-create.component.html',
    styleUrls: ['./phrase-create.component.css']
})
export class PhraseCreateComponent implements OnInit {
    RUS_phrase: string;
    ENG_phrase: string;
    ESP_phrase: string;
    list: any;

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        this.dataService.items.subscribe(res => this.list = res)
    }

    addPhrase () {
        //console.log(this.RUS_phrase, this.ENG_phrase, this.ESP_phrase);
        let data = "Learning how to write in a file."
        // Write data in 'Output.txt' . 
        /*fs.writeFile('Output.txt', data, (err:any) => { 
            // In case of a error throw err. 
            if (err) throw err; 
        })*/
        let newPhrase = new Phrase();
        newPhrase.id = "10";
        newPhrase.langENG = "stop";
        newPhrase.langRUS = "стоп";
        newPhrase.langESP = "la stope";
        newPhrase.rating = 0;
        newPhrase.theme = "цвет";
        newPhrase.level = "A1";
        newPhrase.type = "General";
        this.dataService.addPhrase(newPhrase);
    }
}
