import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Phrase } from '../models/phrase';

@Component({
    selector: 'app-phrase-create',
    templateUrl: './phrase-create.component.html',
    styleUrls: ['./phrase-create.component.css']
})
export class PhraseCreateComponent implements OnInit {
    id: number;
    RUS_phrase: string;
    ENG_phrase: string;
    ESP_phrase: string;
    unit: number = 1;
    rating: number = 0;
    theme: string = 'public';
    level: string = 'A1';
    type: string = 'General';
    list: any;

    constructor(private dataService: DataService) { }

    ngOnInit(): void {
        //this.dataService.items.subscribe(res => this.list = res)
    }

    addPhrase () {
        let newPhrase = new Phrase();
        newPhrase.id = this.id;
        newPhrase.langRUS = this.RUS_phrase;
        newPhrase.langENG = this.ENG_phrase;
        newPhrase.langESP = this.ESP_phrase;
        newPhrase.unit = this.unit;
        newPhrase.rating = this.rating;
        newPhrase.theme = this.theme;
        newPhrase.level = this.level;
        newPhrase.type = this.type;
        this.dataService.addPhrase(newPhrase);
    }

    getMaxId() {
        this.dataService.getMaxIdFromItems().subscribe(
            data => (console.log(data))
        )
    }
}
