import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { AtmfromComponent } from '../../forms/atmfrom/atmfrom.component';
import { CommonModule } from '@angular/common';
import { CommonImportsModule } from '../../core/modules/common-imports.module';
import { AtminfoComponent } from '../../shared/components/atminfo/atminfo.component';
import { AtmData } from '../../core/interface/api_int.share';
import { CentralApisService } from '../../shared/services/apis/central-apis.service';
import { CasheService } from '../../shared/services/shared/cashe.service';
import { ApiType } from '../../core/enums/api-type.enum';

@Component({
  selector: 'app-cards',
  standalone: true,
  imports: [
    CommonModule,
    CommonImportsModule,
    MatTooltipModule,
    AtminfoComponent,
  ],
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})

export class CardsComponent implements OnInit, OnDestroy {
  atmsData: AtmData[] = [];
  ddf: Subscription = new Subscription();

  constructor(
    private dialog: MatDialog,
    private Api: CentralApisService,
    private casheService: CasheService
  ) {}

  ngOnInit(): void {
    // Subscribe to the cache observable
    this.ddf = this.casheService.cacheState$.subscribe((cache) => {
      const cachedAtmData = cache.get(ApiType.Atm);
      if (cachedAtmData) {
        this.atmsData = cachedAtmData;
      }
    });

    // Fetch data from API if not already cached
    if (!this.casheService.get(ApiType.Atm)) {
      this.Api.fetchAll(ApiType.Atm);
    }
  }

  ngOnDestroy(): void {
    if (this.ddf) {
      this.ddf.unsubscribe();
    }
  }

  openFromDialog(): void {
    this.dialog.open(AtmfromComponent, {
      width: '50%',
      data: { type: 'Form' },
    });
  }
}
