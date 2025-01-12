import { Component } from '@angular/core';
import { noteDataSet } from '../../data/noteData';
import { NoteDataInt } from '../../core/interface/interfaces.share';
import { NoteinfoComponent } from '../../shared/components/noteinfo/noteinfo.component';
import { MatIconModule } from '@angular/material/icon';
import { NotefromComponent } from '../../forms/notefrom/notefrom.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-notes',
  imports: [
    NoteinfoComponent, 
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css',
})
export class NotesComponent {
  data: NoteDataInt[] = noteDataSet;

  // protected colors = ['red', 'green', 'blue', 'yellow', 'violet', 'orange'];
  // protected lastcolor = 'yellow';

  // setRandomColor(colors:string[], lastcolor:string) {
  //   var dd = colors.indexOf(lastcolor);
  //   var array = colors.splice(dd, 1);
  //   const index = Math.floor(Math.random() * colors.length);
  //   var color = Array.from(colors)[index];
  //   colors.push(array[0]);
  //   console.log(color);
  // }

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    // console.log(this.data);
  }

  openDialog(): void {
    this.dialog.open(NotefromComponent, {
      width: '50%',
      data: { type: 'Form' },
    });
  }
}
