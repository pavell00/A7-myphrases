import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

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
  displayedColumns: string[] = ['v0', 'v2', 'v3', 't'];;
  columnsToDisplay: string[] = this.displayedColumns;
  dataSource: any;

  v0: boolean = true;
  v2: boolean = true;
  v3: boolean = true;
  t: boolean = true;

  constructor(private dataService: DataService, private router : Router, private auth: AuthService) { }

  ngOnInit() {
    this.dataService.getIrrverbs().subscribe(
      res => {this.dataSource = new MatTableDataSource(res);
        //console.log(res);
      }
    )
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  changeColumns(e: any) {
    //console.log(e);
    //console.log(this.v0, this.v2, this.v3, this.t);
    /*if (this.v0) {
      this.columnsToDisplay.push('v0');
    };*/


  }

}
