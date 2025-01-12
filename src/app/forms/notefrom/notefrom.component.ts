import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject, ViewChild } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import {MatChipGrid, MatChipInputEvent, MatChipsModule} from '@angular/material/chips';

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
    MatButtonModule,
    MatInputModule,
    MatChipsModule,



  ],
  templateUrl: './notefrom.component.html',
  styleUrl: './notefrom.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotefromComponent {
  title: string = 'Add Note';

  separatorKeysCodes: number[] = [ENTER, COMMA]; // Keys to separate tags
  tags: string[] = []; // Store tags
  duplicateTagError: boolean = false; // To track duplicate tag error

  updateBtn: boolean = false;
  edit_mode: boolean = false;
  clickedIcons: boolean[] = [false, false, false, false, false];

  form: FormGroup;

  @ViewChild('chipList', { static: true }) chipOptions!: MatChipGrid;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      tags: [[]], // Form control for tags
      para: ['', Validators.required], // Form control for note
      tagInput: [''], // Temporary form control for tag input
    });
  }

  ngOnInit(): void {
    if (this.data.type === 'View') {
      this.title = 'View Note';
      this.form.setValue({
        title: this.data.tit,
        tags: this.data.tag || [], // Ensure tags are an array
        para: this.data.note,
        color: this.data.color || '', // Default value if color is not provided
      });
      this.form.disable(); // Disable the form in "View" mode
    }
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

  onClear() {
    this.form.reset();
  }

  // Add a tag
  addTag(event: MatChipInputEvent): void {
    const input = event;
    const value = event.value.trim();

    if (value) {
      if (this.tags.includes(value)) {
        this.duplicateTagError = true; // Show error for duplicate tag
      } else {
        this.tags.push(value);
        this.duplicateTagError = false; // Reset error if tag is valid
        this.form.get('tags')?.setValue(this.tags); // Update form control
        this.form.get('tagInput')?.setValue('');
      }
    }

    if (input) {
      input.value = ''; // Clear the input field
    }
  }

  // Remove a tag
  removeTag(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
      this.form.get('tags')?.setValue(this.tags); // Update form control
    }
  }

}
