import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
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
import { MatChipInputEvent, MatChipsModule } from '@angular/material/chips';
import { MatSelectModule } from '@angular/material/select';
import { NoteData, NoteDataCreate } from '../../core/interface/api_int.share';
import { CentralApisService } from '../../shared/services/apis/central-apis.service';
import { ApiType } from '../../core/enums/api-type.enum';

@Component({
  selector: 'app-notefrom',
  standalone: true,
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
    MatSelectModule,
  ],
  templateUrl: './notefrom.component.html',
  styleUrls: ['./notefrom.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotefromComponent {
  title: string = 'Add Note';

  private colors = ['red', 'green', 'blue', 'yellow', 'violet', 'orange'];

  colorArray: { value: string; viewValue: string }[] = [];

  separatorKeysCodes: number[] = [ENTER, COMMA]; // Keys to separate tags
  tags: string[] = []; // Store tags
  duplicateTagError: boolean = false; // To track duplicate tag error

  updateBtn: boolean = false;
  edit_mode: boolean = false;
  clickedIcons: boolean[] = [false, false, false, false, false];

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: CentralApisService
  ) {
    this.form = this.fb.group({
      id: '',
      title: ['', Validators.required],
      tags: [[]], // Form control for tags
      massage: ['', Validators.required], // Form control for note
      color: [''],
      tagInput: [''], // Temporary form control for tag input
    });

    this.colorArray = this.colors.map((color) => ({
      value: `${color}`,
      viewValue: color.charAt(0).toUpperCase() + color.slice(1), // Capitalize the first letter
    }));

    // console.log(this.colorArray);
  }

  ngOnInit(): void {
    if (this.data.type === 'View') {
      
      // console.log(this.data);

      this.title = 'View Note';
      this.form.setValue({
        id: this.data.id,
        title: this.data.tit,
        tags: this.data.tag || [], // Ensure tags are an array
        massage: this.data.note,
        tagInput: '',
        color: this.data.color || '', // Default value if color is not provided
      });
      // this.form.disable(); // Disable the form in "View" mode
    }
  }

  onSubmit() {
    if (this.form.valid) {
      // Form is valid, handle the submission
      const newNote = this.noteSerialize(this.form.value);
      this.apiService.createData<NoteDataCreate>(ApiType.Note, newNote);
      console.log('Form Created:', this.form.value);
    } else {
      // Form is invalid, display error messages or take appropriate action
      console.log('Form is invalid');
    }
  }

  noteSerialize(value: any): NoteDataCreate {
    return {
      title: value.title,
      // tags: value.tags,
      tags: Array.isArray(value.tags) ? value.tags : [], // Ensure tags is an array
      massage: value.massage,
      color: value.color,
    };
  }

  onUpdate() {
    if (this.form.valid) {
      // Form is valid, handle the submission
      const updatedNote = this.noteUpdateSerialize(this.form.value);
      this.apiService.updateData<NoteData>(ApiType.Note, updatedNote);
      console.log('Form Updated:', this.form.value);
    } else {
      // Form is invalid, display error messages or take appropriate action
      console.log('Form is invalid');
    }
  }

  noteUpdateSerialize(value: any): NoteData {
    return {
      id: value.id,
      title: value.title,
      // tags: value.tags,
      tags: Array.isArray(value.tags) ? value.tags : [], // Ensure tags is an array
      massage: value.massage,
      color: value.color,
    };
  }

  onDelete(id: number): void {
    if (id) {
      this.apiService.deleteData(ApiType.Note, id);
    } else {
      console.error('Invalid ID');
    }
  }

  onClear() {
    this.form.reset();
  }

  // Add a tag
  addTag(event: MatChipInputEvent): void {
    const value = event.value.trim();

    if (value && !this.duplicateTagError) {
      if (!this.tags.includes(value)) {
        const currentTags = this.form.get('tags')?.value || []; // Retrieve existing tags from the form
        const updatedTags = [...currentTags, value]; // Append the new tag
        this.form.get('tags')?.setValue(updatedTags); // Update form control
        this.form.get('tagInput')?.setValue('');
      }
    }
  }

  // Remove a tag
  removeTag(tag: string): void {
    const currentTags = this.form.get('tags')?.value || []; // Retrieve the current tags from the form

    const index = currentTags.indexOf(tag);

    if (index >= 0) {
      // Remove the tag from the array
      currentTags.splice(index, 1);

      this.form.get('tags')?.setValue(currentTags); // Update the form control with the modified array
    }
  }

  // Check for duplicate tag during input
  checkDuplicateTag(event: KeyboardEvent): void {
    const input = (event.target as HTMLInputElement).value.trim();

    // Update the duplicate tag error status based on whether the tag exists in the tags array
    this.duplicateTagError = !!input && this.form.value.tags.includes(input);

    // Log the result for debugging
    console.log(`Input: "${input}", Duplicate: ${this.duplicateTagError}`);
  }

}
