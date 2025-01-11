import { Component, input } from '@angular/core';
import { BankfromComponent } from '../../../forms/bankfrom/bankfrom.component';
import { MatDialog } from '@angular/material/dialog';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MaskingPipe } from '../../pipes/masking.pipe';
import { MatButtonModule } from '@angular/material/button';
import { BankData } from '../../../core/interface/api_int.share';

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
    id: 0,
    bank_name: "N/A",
    branch_name: "N/A",
    name: "N/A",
    acc_type: "N/A",
    acc_number: "0",
    ifsc_code: "N/A",
    mirc_code: "N/A",
    rmn: "N/A",
    note: "N/A",
  });

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
        id: id,
        bank_name: bname,
        branch_name: brname,
        name: name,
        acc_type: acc_typ,
        acc_number: acc_num,
        ifsc_code: ifsc,
        mirc_code: mirc,
        rmn: rmn,
        note: note,
      },
    });
  }

}
