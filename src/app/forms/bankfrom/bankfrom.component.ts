import { ClipboardModule } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { CardNoMaskPipe, PassMaskPipe } from '../../shared/pipes/masking.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { BankData, BankDataCreate } from '../../core/interface/api_int.share';
import { CentralApisService } from '../../shared/services/apis/central-apis.service';
import { ApiType } from '../../core/enums/api-type.enum';

@Component({
  selector: 'app-bankfrom',
  standalone: true,
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    ClipboardModule,
    MatDialogModule,
    MatDividerModule,
    MatSelectModule,
    CardNoMaskPipe,
    PassMaskPipe,
    ReactiveFormsModule,
    MatButtonModule,
    MatInputModule,
  ],
  providers: [CentralApisService],
  templateUrl: './bankfrom.component.html',
  styleUrls: ['./bankfrom.component.css'],
})
export class BankfromComponent {
  title: string = 'Add Bank Details';

  clickedIcons: boolean[] = [
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
    false,
  ];
  edit_mode: boolean = false;
  status: boolean[] = [true, true];
  acc_types: string[] = ['Saving', 'Current'];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: any,
    private apiService: CentralApisService
  ) {
    this.form = this.fb.group({
      id: '',
      bank_name: ['', Validators.required],
      branch_name: ['', Validators.required],
      name: ['', Validators.required],
      acc_type: ['', Validators.required],
      acc_number: ['', Validators.required],
      ifsc_code: ['', Validators.required],
      mirc_code: [''],
      rmn: ['', Validators.required],
      note: [''],
    });
  }

  ngOnInit(): void {
    if (this.dialogData.type === 'View') {
      this.title = 'View Bank Details';
      this.form.patchValue({
        id: this.dialogData.id,
        bank_name: this.dialogData.bank_name,
        branch_name: this.dialogData.branch_name,
        name: this.dialogData.name,
        acc_type: this.dialogData.acc_type,
        acc_number: this.dialogData.acc_number,
        ifsc_code: this.dialogData.ifsc_code,
        mirc_code: this.dialogData.mirc_code,
        rmn: this.dialogData.rmn,
        note: this.dialogData.note,
      });
    }
  }

  onClear() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.valid) {
      const newBank: BankDataCreate = this.bankSerialize(this.form.value);
      this.apiService.createData<BankDataCreate>(ApiType.Bank, newBank);
    } else {
      console.error('Form is invalid');
    }
  }

  bankSerialize(value: any): BankDataCreate {
    return {
      bank_name: value.bank_name,
      branch_name: value.branch_name,
      name: value.name,
      acc_type: value.acc_type,
      acc_number: String(value.acc_number),
      ifsc_code: value.ifsc_code,
      mirc_code: value.mirc_code,
      rmn: String(value.rmn),
      note: value.note,
    };
  }

  onUpdate() {
    if (this.form.valid) {
      const updatedBank: BankData = this.bankUpdateSerialize(this.form.value);
      this.apiService.updateData<BankData>(ApiType.Bank, updatedBank);
    } else {
      console.error('Form is invalid');
    }
  }

  bankUpdateSerialize(value: any): BankData {
    return {
      id: value.id,
      bank_name: value.bank_name,
      branch_name: value.branch_name,
      name: value.name,
      acc_type: value.acc_type,
      acc_number: String(value.acc_number),
      ifsc_code: value.ifsc_code,
      mirc_code: value.mirc_code,
      rmn: value.rmn,
      note: value.note,
    };
  }

  onDelete(id: number): void {
    if (id) {
      this.apiService.deleteData(ApiType.Bank, id);
    } else {
      console.error('Invalid ID');
    }
  }
}
