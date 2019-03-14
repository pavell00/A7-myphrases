import { Component, OnInit } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { DataService } from '../services/data.service';

@Component({
    selector: 'app-phrase-create',
    templateUrl: './phrase-create.component.html',
    styleUrls: ['./phrase-create.component.css']
})
export class PhraseCreateComponent implements OnInit {
    RUS_phrase: string;
    ENG_phrase: string;
    ESP_phrase: string;

    items  = [{ name: "archie", age:25 }, { name: "jake", age:25 }, { name: "richard", age:30 , manager:[{empl:"Jhon"}, {empl:"Dixy"}]}, { name: "poll", age:20 }];
    constructor(private dataService: DataService, private afstorage: AngularFireStorage) { }
    
    ngOnInit(): void { }

    addPhrase () {
        let newFile = new Blob([JSON.stringify(this.items)], {type: "application/json", endings: 'native'});
        this.afstorage.upload('/upload/'+localStorage.getItem('useremail')+'.json',  newFile);
    }

    getId () {
        this.dataService.getMaxId().subscribe(
            res => console.log(res)
        )

    }
}
