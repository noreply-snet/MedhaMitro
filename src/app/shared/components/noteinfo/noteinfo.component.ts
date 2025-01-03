import { Component, input} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NotefromComponent } from '../../../forms/notefrom/notefrom.component';
import { ColorInt, NoteDataInt } from '../../../core/interface/interfaces.share';
import { DatashareService } from '../../../core/services/datashare.service';
import { NotePipe } from '../../pipes/note.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';



@Component({
  selector: 'app-noteinfo',
  imports: [
    MatCardModule,
    MatIconModule,
    NotePipe,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './noteinfo.component.html',
  styleUrl: './noteinfo.component.css'
})
export class NoteinfoComponent {

  dataChild = input<NoteDataInt[]>([]);

  filter: string = '';
  subs: any;


  colorsbord: ColorInt = {
    red: "--primary-card:#fd0000;     --background-card:#ff00008a;",
    yellow: "--primary-card:#b4b400;     --background-card:#ffff009c;",
    green: "--primary-card:#00b400;     --background-card:#00ff00bf;",
    blue: "--primary-card:#0000ff;     --background-card:#0000ff8a;",
    violet: "--primary-card:#9400D3;     --background-card:#9400D38a; ",
    orange: "--primary-card:#e99900;     --background-card:#ffa5008a;",
  };

  onclick() {
    console.log("Working");
    // this.setRandomColor(this.colors,this.lastcolor);
  }

  applyColor(color: string) {
    return this.colorsbord[color];
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NotefromComponent, {
      width: '50%',
      data: { type: 'Form' }
    });
  }

  openViewDialog(title: string, subt: string, note: string): void {
    const dialogRef = this.dialog.open(NotefromComponent, {
      width: '45%',
      data: { type: 'View', tit: title, tag: subt, note: note }
    });
  }

  constructor(private dataShare: DatashareService, private dialog: MatDialog) { };



  ngOnInit(): void {
    this.subs = this.dataShare.data$.subscribe((data) => {
      this.filter = data;
      // console.log(this.filter);
    })
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


}
