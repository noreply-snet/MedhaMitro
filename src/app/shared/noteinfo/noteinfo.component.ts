import { Component, input} from '@angular/core';
import { DatashareService } from '../../core/services/datashare.service';
import { MatDialog } from '@angular/material/dialog';
import { ColorInt, NoteDataInt } from '../../core/interface/interfaces.share';
import { NotefromComponent } from '../../forms/notefrom/notefrom.component';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';



@Component({
  selector: 'app-noteinfo',
  imports: [
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './noteinfo.component.html',
  styleUrl: './noteinfo.component.css'
})
export class NoteinfoComponent {

  dataChild = input<NoteDataInt[]>();

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
