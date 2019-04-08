import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InVerb } from '../models/inverb';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-Irrverbs',
  templateUrl: './irrverbs.component.html',
  styleUrls: ['./irrverbs.component.css']
})

export class IrrverbsComponent implements OnInit {
  displayedColumns: string[] = ['Verb', 'II form', 'III from', 'Translate'];;
  columnsToDisplay: string[] = [];
  Irrverbs: InVerb[] = [];

  constructor(private dataService: DataService, private router : Router, private auth: AuthService) { }

  ngOnInit() {
    this.dataService.getIrrverbs().subscribe(
      res => this.Irrverbs = res
    )
  }

}
