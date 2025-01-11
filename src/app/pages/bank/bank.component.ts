import { Component } from '@angular/core';
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
import { BankSharedService } from '../../shared/services/shared/bank-shared.service';
import { BankApiService } from '../../shared/services/apis/bank-api.service';
@Component({
  selector: 'app-bank',
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    BankPipe,
    BankinfoComponent,
  ],
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.css',
})
export class BankComponent {
  dataChild: BankData[] = [];
  filter: string = '';

  v1: Subscription = new Subscription();
  v2: Subscription = new Subscription();

  constructor(
    private filterShare: DatashareService,
    private dialog: MatDialog,
    private bankData: BankSharedService,
    private bankApi: BankApiService
  ) {}

  openFromDialog(): void {
    this.dialog.open(BankfromComponent, {
      width: '50%',
      data: { type: 'Form' },
    });
  }

  ngOnInit(): void {
    this.v1 = this.filterShare.data$.subscribe((data) => {
      this.filter = data;
    });

    this.v2 = this.bankData.banksData$.subscribe((data) => {
      this.dataChild = data;
    });

    this.bankApi.fetchAllBanks();
  }

  ngOnDestroy(): void {
    this.v1.unsubscribe();
    this.v2.unsubscribe();
  }
}
