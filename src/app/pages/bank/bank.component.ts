import { Component, input, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { BankinfoComponent } from '../../shared/bankinfo/bankinfo.component';
import { DatashareService } from '../../core/services/datashare.service';
import { BankData } from '../../core/interface/interfaces.share';
import { MatIconModule } from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';
import { MaskingPipe } from '../../core/pipes/masking.pipe';
@Component({
  selector: 'app-bank',
  imports: [
    MatIconModule,
    MatCardModule,
    MaskingPipe
    
  ],
  templateUrl: './bank.component.html',
  styleUrl: './bank.component.css',
})
export class BankComponent {
  // @Input() dataChild: DataArray[] = [];
  dataChild = input<BankData[]>();

  filter: string = '';
  ddf: any;

  openFromDialog(): void {
    const dialogRef = this.dialog.open(BankinfoComponent, {
      width: '50%',
      data: { type: 'Form' },
    });
  }

  openViewDialog(
    id: number,
    name: string,
    rmn: string,
    bname: string,
    brname: string,
    acc_typ: string,
    acc_num: string,
    ifsc: string,
    mirc: string,
    note: string
  ): void {
    const dialogRef = this.dialog.open(BankinfoComponent, {
      width: '45%',
      data: {
        type: 'View',
        bid: id,
        name: name,
        rmn: rmn,
        bname: bname,
        brname: brname,
        acc_typ: acc_typ,
        acc_num: acc_num,
        ifsc: ifsc,
        mirc: mirc,
        note: note,
      },
    });
  }

  constructor(private dataShare: DatashareService, private dialog: MatDialog) {}

  ngOnInit(): void {
    // this.sortdata = this.dataChild.map(data => {
    //   return {
    //     name: data.name,
    //     acc_number: data.acc_number,
    //   };
    // });

    this.ddf = this.dataShare.data$.subscribe((data) => {
      this.filter = data;
    });
    // console.log(this.dataChild);
  }

  ngOnDestroy(): void {
    this.ddf.unsubscribe();
  }
}
