import { Component, OnDestroy, OnInit } from '@angular/core';
import { NoteinfoComponent } from '../../shared/components/noteinfo/noteinfo.component';
import { MatIconModule } from '@angular/material/icon';
import { NotefromComponent } from '../../forms/notefrom/notefrom.component';
import { MatDialog } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NoteData } from '../../core/interface/api_int.share';
import { CentralApisService } from '../../shared/services/apis/central-apis.service';
import { CasheService } from '../../shared/services/shared/cashe.service';
import { ApiType } from '../../core/enums/api-type.enum';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    NoteinfoComponent, 
    MatIconModule,
    MatButtonModule,
    MatTooltipModule
  ],
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css'],
})
export class NotesComponent implements OnInit, OnDestroy {
  data: NoteData[] = [];
  v1: Subscription = new Subscription();

  constructor(
    private dialog: MatDialog,
    private Api: CentralApisService,
    private casheService: CasheService
  ) {}

  ngOnInit(): void {
    // Subscribe to the cache observable
    this.casheService.cacheState$.subscribe((cache) => {
      const cachedNoteData = cache.get(ApiType.Note);
      if (cachedNoteData) {
        this.data = cachedNoteData;
      }
    });

    // Fetch data from API if not already cached
    if (!this.casheService.get(ApiType.Note)) {
      this.Api.fetchAll(ApiType.Note);
    }
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
