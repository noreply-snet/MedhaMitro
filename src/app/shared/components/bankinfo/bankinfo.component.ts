import { Component, input } from '@angular/core';
import { BankData } from '../../../core/interface/interfaces.share';
import { BankfromComponent } from '../../../forms/bankfrom/bankfrom.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MaskingPipe } from '../../pipes/masking.pipe';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-bankinfo',
  imports: [
    MatCardModule,
    MatIconModule,
    MaskingPipe,
    MatButtonModule,
  ],
  templateUrl: './bankinfo.component.html',
  styleUrl: './bankinfo.component.css'
})
export class BankinfoComponent {
  dataObj = input<BankData>({        
    "acc_number": "0",
    "acc_type": "N/A",
    "bank_name": "N/A",
    "branch_name": "N/A",
    "id": 0,
    "ifsc_code": "N/A",
    "mirc_code": "N/A",
    "name": "N/A",
    "note": "N/A",
    "rmn": "N/A"});

    constructor(private dialog: MatDialog) {}

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
    const dialogRef = this.dialog.open(BankfromComponent, {
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

}
