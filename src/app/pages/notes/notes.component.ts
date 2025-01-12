import { Component, OnDestroy, OnInit } from '@angular/core';
import { NoteinfoComponent } from '../../shared/components/noteinfo/noteinfo.component';
import { MatIconModule } from '@angular/material/icon';
import { NotefromComponent } from '../../forms/notefrom/notefrom.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoteData } from '../../core/interface/api_int.share';
import { NoteApiService } from '../../shared/services/apis/note-api.service';
import { NoteSharedService } from '../../shared/services/shared/note-shared.service';
import { Subscription } from 'rxjs';

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
export class NotesComponent implements OnInit, OnDestroy {
  data: NoteData[] = [];

  v1: Subscription = new Subscription();


  constructor(private dialog: MatDialog, private noteApi: NoteApiService, private noteShare: NoteSharedService) {}

  ngOnInit(): void {
    this.v1 = this.noteShare.notesData$.subscribe((data) => {
      this.data = data;
    });

    this.noteApi.fetchAllNotes();
    
  }

  ngOnDestroy(): void {
    this.v1.unsubscribe();
  }

  openDialog(): void {
    this.dialog.open(NotefromComponent, {
      width: '50%',
      data: { type: 'Form' },
    });
  }
}
