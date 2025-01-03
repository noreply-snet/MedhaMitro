import { AfterViewInit, Component, Input, input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { PassDataInt } from '../../../core/interface/interfaces.share';
import {MatTableDataSource, MatTableModule,} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { passDataSet } from '../../../data/passData';
import { MatDialog } from '@angular/material/dialog';
import { PassfromComponent } from '../../../forms/passfrom/passfrom.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-passinfo',
  imports: [
    MatPaginator,
    MatFormFieldModule,
    MatTableModule,
    MatInputModule,
    MatSort,
    MatInputModule, 
    MatSortModule, 
    MatPaginatorModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './passinfo.component.html',
  styleUrl: './passinfo.component.css'
})
export class PassinfoComponent implements AfterViewInit, OnChanges {
    dataBase = input<PassDataInt[]>([]);
    // @Input() dataBase: PassDataInt[] = [];

    displayedColumns: string[] = ['id', 'name', 'url', 'password', 'username', 'notes', 'last_seen', 'action'];

    dataTable: MatTableDataSource<PassDataInt>;
  
    @ViewChild(MatPaginator) paginator!: MatPaginator ;
    @ViewChild(MatSort) sort!: MatSort ;

    constructor (private dialog: MatDialog) { 
      this.dataTable = new MatTableDataSource(this.dataBase()); 
    }

    ngOnChanges(changes: SimpleChanges): void {
      if (changes['dataBase'] && this.dataBase()) {
        this.dataTable.data = this.dataBase() ;
      }
    }
  
  
    ngAfterViewInit(): void {
      this.dataTable.paginator = this.paginator;
      this.dataTable.sort = this.sort;

      // console.log(this.dataTable);
    }
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataTable.filter = filterValue.trim().toLowerCase();
  
      if (this.dataTable.paginator) {
        this.dataTable.paginator.firstPage();
      }
    }

    openFormDialog(): void {
      const dialogRef = this.dialog.open(PassfromComponent, {
        width: '50%',
        data: { type: 'Form'}
      });
    }
  
    openViewDialog(id: string, nam: string, url:string,usernam:string,logid:string,pass:string,note:string): void {
      const dialogRef = this.dialog.open(PassfromComponent, {
        width: '45%',
        data: { type: 'View', id:id,name:nam, url:url,username:usernam,loginid:logid,pass:pass,note:note}
      });
    }


  }
  

