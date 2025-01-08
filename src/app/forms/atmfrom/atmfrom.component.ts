import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { CommonImportsModule } from '../../core/modules/common-imports.module';
import { PassMaskPipe } from '../../shared/pipes/masking.pipe';
import { AtmDataCreate, AtmDataReUp } from '../../core/interface/api_int.share';
import { AtmService } from '../../shared/services/atm.service';
import { AtmSharedService } from '../../shared/services/atm-shared.service';

@Component({
  selector: 'app-atmfrom',
  imports: [
    CommonImportsModule,
    MatDialogModule,
    MatDividerModule,
    MatSelectModule,
    PassMaskPipe,
    ReactiveFormsModule,
    MatInputModule,
  ],
  providers: [AtmService],
  templateUrl: './atmfrom.component.html',
  styleUrls: ['./atmfrom.component.css'],
})
export class AtmfromComponent implements OnInit {
  title: string = 'Add Card Details';

  clickedIcons: boolean[] = [false, false, false, false, false];
  edit_mode: boolean = false;
  status: boolean[] = [true, true]; // Set to true for hide cvv

  form: FormGroup;

  years: string[] = [];
  months: string[] = [
    '01',
    '02',
    '03',
    '04',
    '05',
    '06',
    '07',
    '08',
    '09',
    '10',
    '11',
    '12',
  ];

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public dialogData: any ,
    private atmService: AtmService,
    private atmShareData : AtmSharedService,
  ) {
    this.form = this.fb.group({
      id:'',
      card_number: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{16}$')],
      ],
      name: ['', Validators.required],
      exp_month: ['', Validators.required],
      exp_year: ['', Validators.required],
      cvv: ['', [Validators.required, Validators.pattern('^[0-9]{3}$')]],
    });

    // Dynamically populate the years
    const currentYear = new Date().getFullYear();
    this.years = this.generateYearRange(currentYear, 10);
  }

  ngOnInit(): void {
    if (this.dialogData.type === 'View') {
      this.title = 'View Card Details';
      this.form.patchValue({
        id: this.dialogData.card_id,
        card_number: this.dialogData.cno,
        name: this.dialogData.cname,
        exp_month: this.dialogData.exp.split('/')[0],
        exp_year: '20'+String(this.dialogData.exp).split('/')[1],
        cvv: this.dialogData.cvv
      });
    }
  }

  onClear() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.valid) {
      const newAtm: AtmDataCreate = this.atmSerialize(this.form.value);
      this.atmService.createAtm(newAtm).subscribe({
        next: (atm: AtmDataReUp) => {
          console.log('Form Submitted:', atm);
          this.atmShareData.addAtm(atm);
        },
        error: (error) =>{
          console.error('Form Submission Error:', error);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }

  atmSerialize(value: any): AtmDataCreate {
    return {
      card_number: String(value.card_number), // Ensure it's a string
      name: value.name, // Name remains as-is
      exp_date: `${value.exp_month}/${String(value.exp_year).slice(-2)}`, // Format as MM/YY
      cvv: value.cvv
    };
  }

  onUpdate() {
    if (this.form.valid) {
      const updatedAtm: AtmDataReUp = this.atmUpdateSerialize(this.form.value);
      this.atmService.updateAtm(updatedAtm).subscribe({
        next: (atm: AtmDataReUp) => {
          console.log('ATM Updated:', atm);
          this.atmShareData.updateAtm(atm);
        },
        error: (error) => {
          console.error('Update Error:', error);
        },
      });
    } else {
      console.error('Form is invalid');
    }
  }

  atmUpdateSerialize(value: any): AtmDataReUp {
    return {
      id: value.id, // Ensure the ID is passed correctly
      card_number: String(value.card_number), // Ensure it's a string
      name: value.name, // Name remains as-is
      exp_date: `${value.exp_month}/${String(value.exp_year).slice(-2)}`, // Format as MM/YY
      cvv: value.cvv, // CVV remains as-is
    };
  }
  
  onDelete(id: number): void {
    if (id) {
      this.atmService.deleteAtm(id).subscribe({
        next: (response: { msg: string }) => {
          console.log(response);

          // You can also update the UI to reflect the deletion
          this.atmShareData.removeAtmById(id);
        },
        error: (error) => {
          console.error('Delete Error:', error);
        },
      });
    } else {
      console.error('Invalid ID');
    }
  }
  
  

  

  generateYearRange(currentYear: number, numYears: number): string[] {
    const years: string[] = [];
    for (let i = 0; i <= numYears; i++) {
      years.push(String(currentYear + i));
    }
    return years;
  }

  toggleClick(index: number): void {
    this.clickedIcons[index] = !this.clickedIcons[index];
  }


}
