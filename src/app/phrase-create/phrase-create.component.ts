import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
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
    }
}
