import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatashareService } from '../../shared/services/shared/datashare.service';
import { MatIconModule } from '@angular/material/icon';
import { BankfromComponent } from '../../forms/bankfrom/bankfrom.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BankPipe } from '../../shared/pipes/bank.pipe';
import { BankinfoComponent } from '../../shared/components/bankinfo/bankinfo.component';
import { BankData } from '../../core/interface/api_int.share';
import { Subscription } from 'rxjs';
import { CentralApisService } from '../../shared/services/apis/central-apis.service';
import { CasheService } from '../../shared/services/shared/cashe.service';
import { ApiType } from '../../core/enums/api-type.enum';

@Component({
  selector: 'app-bank',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    BankPipe,
    BankinfoComponent,
  ],
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.css'],
})
export class BankComponent implements OnInit, OnDestroy {
  dataChild: BankData[] = [];
  filter: string = '';

  v1: Subscription = new Subscription();
  v2: Subscription = new Subscription();

  constructor(
    private filterShare: DatashareService,
    private dialog: MatDialog,
    private Api: CentralApisService,
    private casheService: CasheService
  ) {}



  ngOnInit(): void {
    this.v1 = this.filterShare.data$.subscribe((data) => {
      this.filter = data;
    });

    this.v2 = this.casheService.cacheState$.subscribe((cache) => {
      const cachedBankData = cache.get(ApiType.Bank);
      if (cachedBankData) {
        this.dataChild = cachedBankData;
      }
    });

    if (!this.casheService.get(ApiType.Bank)) {
      this.Api.fetchAll(ApiType.Bank);
    }
  }

  ngOnDestroy(): void {
    this.v1.unsubscribe();
    this.v2.unsubscribe();
  }

  openFromDialog(): void {
    this.dialog.open(BankfromComponent, {
      width: '50%',
      data: { type: 'Form' },
    });
  }

  
}
