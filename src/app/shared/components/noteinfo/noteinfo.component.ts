import { Component, input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { NotefromComponent } from '../../../forms/notefrom/notefrom.component';
import {
  ColorInt,
} from '../../../core/interface/interfaces.share';
import { DatashareService } from '../../services/shared/datashare.service';
import { NotePipe } from '../../pipes/note.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoteData } from '../../../core/interface/api_int.share';


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
  styleUrl: './noteinfo.component.css',
})
export class NoteinfoComponent {
  dataChild = input<NoteData[]>([{
    id: 0,
    title: 'N/A',
    tags: ['N/A'], 
    massage: 'N/A',
    color: 'red'
  }]);

  filter: string = '';
  subs: any;
  colorsbord: ColorInt = {
    red: '--primary-card:#fd0000;     --background-card:#ff00008a;',
    yellow: '--primary-card:#b4b400;     --background-card:#ffff009c;',
    green: '--primary-card:#00b400;     --background-card:#00ff00bf;',
    blue: '--primary-card:#0000ff;     --background-card:#0000ff8a;',
    violet: '--primary-card:#9400D3;     --background-card:#9400D38a; ',
    orange: '--primary-card:#e99900;     --background-card:#ffa5008a;',
  };

  constructor(private dataShare: DatashareService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.subs = this.dataShare.data$.subscribe((data) => {
      this.filter = data;
      // console.log(this.filter);
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }


  openViewDialog(id:number,title: string, tags: string[], note: string, color: string): void {
    this.dialog.open(NotefromComponent, {
      width: '45%',
      data: { type: 'View', id: id, tit: title, tag: tags, note: note , color: color},
    });
  }

  applyColor(color: string) {
    if (!color || color=='' || !this.colorsbord.hasOwnProperty(color)) {
      return this.colorsbord['red'];
    }
    return this.colorsbord[color];
  }

}
