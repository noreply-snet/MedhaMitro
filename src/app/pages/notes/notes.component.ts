import { Component } from '@angular/core';
import { noteDataSet } from '../../data/noteData';
import { NoteDataInt } from '../../core/interface/interfaces.share';
import { NoteinfoComponent } from '../../shared/components/noteinfo/noteinfo.component';


@Component({
  selector: 'app-notes',
  imports: [
    NoteinfoComponent,
],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
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


  ngOnInit(): void {
    // console.log(this.data);
  }

}
