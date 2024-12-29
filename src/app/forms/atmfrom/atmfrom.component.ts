import { Component, Inject, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { ClipboardModule } from '@angular/cdk/clipboard';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { CardNoMaskPipe, PassMaskPipe } from '../../core/pipes/masking.pipe';

@Component({
  selector: 'app-atmfrom',
  imports: [
    CommonModule,
    MatDialogModule,
    MatIconModule,
    ClipboardModule,
    MatDividerModule,
    MatFormFieldModule,
    MatSelectModule,
    PassMaskPipe,
    CardNoMaskPipe,
    ReactiveFormsModule,
  ],
  templateUrl: './atmfrom.component.html',
  styleUrls: ['./atmfrom.component.css'],
})
export class AtmfromComponent implements OnInit {
  title: string = 'Add Card Details';

  clickedIcons: boolean[] = [false, false, false, false, false];
  edit_mode: boolean = false;
  status: boolean[] = [true, true]; // Set to true for hide cvv

  form: FormGroup;

  years: number[] = [];
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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      cardno: ['', Validators.required],
      name: ['', Validators.required],
      exp_month: ['', Validators.required],
      exp_year: ['', Validators.required],
      cvv: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(2),
          Validators.pattern('^[0-9]{3}$'),
        ],
      ],
    });

    // Dynamically populate the years
    const currentYear = new Date().getFullYear();
    this.years = this.generateYearRange(currentYear, 10);
  }

  ngOnInit(): void {
    if (this.data.type === 'View') {
      this.title = 'View Card Details';
      this.form = this.fb.group({
        cardno: [this.data.cno],
        name: [this.data.cname, Validators.required],
        exp_month: [
          new Date(this.data.exp).getMonth().toString().padStart(2, '0'),
        ],
        exp_year: [new Date(this.data.exp).getFullYear()],
        cvv: [this.data.cvv, Validators.required],
      });
    }
  }

  onClear() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.valid) {
      console.log('Form Submitted:', this.form.value);
    } else {
      console.error('Form is invalid');
    }
  }

  onUpdate() {
    if (this.form.valid) {
      console.log('Form Updated:', this.form.value);
    } else {
      console.error('Form is invalid');
    }
  }

  onDelete(id: string) {
    console.log('Deleted ID:', id);
  }

  generateYearRange(currentYear: number, numYears: number): number[] {
    const years: number[] = [];
    for (let i = 0; i <= numYears; i++) {
      years.push(currentYear + i);
    }
    return years;
  }

  toggleClick(index: number): void {
    this.clickedIcons[index] = !this.clickedIcons[index];
  }
}
