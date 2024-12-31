import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-notefrom',
  imports: [
        CommonModule,
    MatFormFieldModule,  
    MatIconModule,
    MatDialogModule,
    MatDividerModule,
    ReactiveFormsModule,
    CdkCopyToClipboard,
  ],
  templateUrl: './notefrom.component.html',
  styleUrl: './notefrom.component.css'
})
export class NotefromComponent {
  
  title: string = 'Add Note';
  updateBtn: boolean = false;
  edit_mode: boolean = false;
  clickedIcons: boolean[] = [false, false, false, false, false];

  form: FormGroup;


  onClear() {
    this.form.reset();
  }

  onSubmit() {
    if (this.form.valid) {
      // Form is valid, handle the submission
      // console.log('Form submitted:', this.form.value);
    } else {
      // Form is invalid, display error messages or take appropriate action
      // console.log('Form is invalid');
    }
  }

  onUpdate() {
    if (this.form.valid) {
      // Form is valid, handle the submission
      // console.log('Form Updated:', this.form.value);
    } else {
      // Form is invalid, display error messages or take appropriate action
      // console.log('Form is invalid');
    }
  }

  onDelete(id: string) {
    // console.log(id);
  }

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      tag: [''],
      notes: ['', Validators.required]
      // Other form controls
    });
  }

  ngOnInit(): void {
    if (this.data.type === 'View') {
      this.title='View Note';
      this.form = this.fb.group({
        title: [this.data.tit],
        tag: [this.data.tag],
        notes: [this.data.note]
      });
    }
  }
}
