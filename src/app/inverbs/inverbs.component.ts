import { Component, OnInit, ViewChild } from '@angular/core';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';

import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { InVerb } from '../models/inverb';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-inverbs',
  templateUrl: './inverbs.component.html',
  styleUrls: ['./inverbs.component.css']
})

export class InverbsComponent implements OnInit {
  displayedColumns: string[] = ['Verb', 'II form', 'III from', 'Translate'];;
  columnsToDisplay: string[] = [];
  inverbs: InVerb[] = [];

  constructor(private dataService: DataService, private router : Router, private auth: AuthService) { }

  ngOnInit() {
    this.dataService.getInverbs().subscribe(
      res => this.inverbs = res
    )
  }

}
