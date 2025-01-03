import { Component, input, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DatashareService } from '../../shared/services/datashare.service';
import { BankData } from '../../core/interface/interfaces.share';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { BankfromComponent } from '../../forms/bankfrom/bankfrom.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BankPipe } from '../../shared/pipes/bank.pipe';
import { bankDataSet } from '../../data/bankData';
import { BankinfoComponent } from '../../shared/components/bankinfo/bankinfo.component';
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

  dataChild: BankData[] = bankDataSet;
  filter: string = '';
  ddf: any;

  openFromDialog(): void {
    const dialogRef = this.dialog.open(BankfromComponent, {
      width: '50%',
      data: { type: 'Form' },
    });
  }

  constructor(private dataShare: DatashareService, private dialog: MatDialog) {}

  ngOnInit(): void {

    this.ddf = this.dataShare.data$.subscribe((data) => {
      this.filter = data;
    });
    // console.log(this.dataChild);
  }

  ngOnDestroy(): void {
    this.ddf.unsubscribe();
  }
}
