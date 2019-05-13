import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource, MatSnackBar} from '@angular/material';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InVerb } from '../models/inverb';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-irrverbs',
  templateUrl: './irrverbs.component.html',
  styleUrls: ['./irrverbs.component.css']
})

export class IrrverbsComponent implements OnInit {
  displayedColumns: string[] = ['v0', 'v2', 'v3', 't'];
  columnsToDisplay: string[] = this.displayedColumns;
  dataSource: any;
  testRowData: string[] = ['v0', 'v2', 'v3', 't'];
  displayedFootColumns = this.testRowData;

  v0: boolean = true;
  v2: boolean = true;
  v3: boolean = true;
  t: boolean = true;
  newArray : any[] = this.displayedColumns;
  shv0 = false
  shv2 = false

  constructor(private dataService: DataService, private router : Router, private auth: AuthService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.dataService.getIrrverbs().subscribe(
      res => {this.dataSource = new MatTableDataSource(res);
        //console.log(res);
      }
    )
  }

  get myStylesV0() :any {
    return {'display': this.shv0 ? 'true' : 'false'};
  }

  get myStylesV2() :any {
    return {'display': this.shv2 ? 'true' : 'false'};
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changeColumns(e: string, ev:any) {
    //console.log(e, ev);
    //console.log(this.v0, this.v2, this.v3, this.t);
    /*if (this.v0) {
      this.columnsToDisplay.push('v0');
    };*/
    const insert = (arr, index, newItem) => [
      // part of the array before the specified index
      ...arr.slice(0, index),
      // inserted item
      newItem,
      // part of the array after the specified index
      ...arr.slice(index)
    ]

    //Remove item to display
    if (!ev.checked) { 
      const index = this.newArray.indexOf(e);
      this.newArray = (index > -1) ? [
          ...this.newArray.slice(0, index),
          ...this.newArray.slice(index + 1)
      ] : this.newArray;
      this.columnsToDisplay = this.newArray;
    // Add item to display
    } else {
      switch (e) {
        case 'v0':
          this.newArray = [e, ...this.newArray];
          break;
        case 'v2':
          if (this.newArray[0] == 'v0' && (this.newArray[1] == 'v3' || this.newArray[1] == 't') || this.newArray[1] == undefined)  {
            this.newArray = insert(this.newArray, 1, e);
          } else if (this.newArray[0] == 'v3' || this.newArray[0] == 't') {this.newArray = insert(this.newArray, 0, e);}
            else if (this.newArray.length == 0 ) {this.newArray = [e, ...this.newArray];}
          break;
        case 'v3':
        if (this.newArray[0] == 'v0' && this.newArray[1] == 'v2')  {
          this.newArray = insert(this.newArray, 2, e);
        } else if (this.newArray[0] == 'v0' || this.newArray[0] == 'v2') {this.newArray = insert(this.newArray, 1, e);}
          else if (this.newArray[0] == 't') {this.newArray = insert(this.newArray, 0, e);}
          else if (this.newArray.length == 0 ) {this.newArray = [e, ...this.newArray];}
          break;
        case 't':
          this.newArray = [...this.newArray, e];
          break;
      }
      this.columnsToDisplay = this.newArray;
    }
    //console.log(this.newArray);
  }

}
