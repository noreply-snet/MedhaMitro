import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AtmfromComponent } from '../../forms/atmfrom/atmfrom.component';
import { CommonModule } from '@angular/common';
import { CommonImportsModule } from '../../core/modules/common-imports.module';
import { AtminfoComponent } from '../../shared/components/atminfo/atminfo.component';
import { AtmDataReUp } from '../../core/interface/api_int.share';
import { AtmService } from '../../shared/services/apis/atm.service';
import { AtmSharedService } from '../../shared/services/shared/atm-shared.service';

@Component({
  selector: 'app-cards',
  imports: [
    CommonModule,
    CommonImportsModule,
    MatTooltipModule,
    AtminfoComponent,
  ],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.css',
})

export class CardsComponent implements OnInit, OnDestroy {
  atmsData: AtmDataReUp[] = [];

  ddf: Subscription | undefined;

  constructor(private dialog: MatDialog,private atmApi: AtmService,private atmDataShear: AtmSharedService) {}

  openFromDialog(): void {
    this.dialog.open(AtmfromComponent, {
      width: '50%',
      data: { type: 'Form' },
    });
  }

  ngOnInit(): void {
    this.ddf = this.atmDataShear.atmsData$.subscribe((data: AtmDataReUp[]) => {
      this.atmsData = data;
    });

    this.atmApi.fetchAllAtms();
    
  }


  ngOnDestroy(): void {
    if (this.ddf) {
      this.ddf.unsubscribe();
    }
  }
}
