import { Component } from '@angular/core';
import { noteDataSet } from '../../data/noteData';
import { NoteDataInt } from '../../core/interface/interfaces.share';
import { NoteinfoComponent } from "../../shared/noteinfo/noteinfo.component";

@Component({
  selector: 'app-notes',
  imports: [
    NoteinfoComponent
],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.css'
})
export class NotesComponent {

  data: NoteDataInt[] = noteDataSet; 

  protected colors = ['red', 'green', 'blue', 'yellow', 'violet', 'orange'];
  protected lastcolor = 'yellow';

  setRandomColor(colorss:string[], lastcolor:string) {
    var dd = colorss.indexOf(lastcolor);
    var array = colorss.splice(dd, 1);
    const index = Math.floor(Math.random() * colorss.length);
    var color = Array.from(colorss)[index];
    colorss.push(array[0]);
    console.log(color);
  }


  ngOnInit(): void {
    // console.log(this.data);
  }

}
