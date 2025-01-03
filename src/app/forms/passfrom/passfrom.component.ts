import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { PassMaskPipe } from '../../shared/pipes/masking.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-passfrom',
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatIconModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatDividerModule,
    PassMaskPipe,
    CdkCopyToClipboard,
    MatButtonModule,
    MatInputModule,

  ],
  templateUrl: './passfrom.component.html',
  styleUrl: './passfrom.component.css'
})
export class PassfromComponent {

  title: string = 'Add Password';
  hide: boolean = true;
  edit_mode: boolean = false;
  clickedIcons: boolean[] = [false, false, false, false, false, false, false, false, false];
  status: boolean = true;


  form: FormGroup;

  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      url: ['', [Validators.required, this.multiplePatternValidator(this.getUrlPatterns())]],
      name: ['', Validators.required],
      username: ['', Validators.required],
      loginid: ['', Validators.required],
      password: ['', Validators.required],
      notes: ['']
      // Other form controls
    });
  }

  ngOnInit(): void {
    if (this.data.type === 'View') {
      this.title = 'View Password';
      this.form = this.fb.group({
        url: [this.data.url],
        name: [this.data.name],
        username: [this.data.username],
        loginid: [this.data.loginid],
        password: [this.data.pass],
        notes: [this.data.note]
      });
    }
    // console.log(this.data);
  }

  getUrlPatterns(): RegExp[] {
    return [
      /^(?:https?:\/\/)?(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?::[0-9]+)?(?:[/\w .-]*)*\/?$/, // pattern for "https://material.angular.io/components/form-field/examples"
      /^(?:https?:\/\/)?localhost(?::[0-9]+)?(?:[/\w .-]*)*\/?$/,  // pattern for "http://localhost:4200/home/passwords"
      /^(?:https?:\/\/)?(?:[0-9]{1,3}\.){3}[0-9]{1,3}(?::[0-9]+)?(?:[/\w .-]*)*\/?$/, // pattern for "http://192.168.0.1/index.html"
      // Add more patterns for different URL variations
    ];
  }

  multiplePatternValidator(patterns: RegExp[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const url = control.value;
      for (const pattern of patterns) {
        if (pattern.test(url)) {
          return null;
        }
      }
      return { invalidUrl: true };
    };
  }

  isUrlInvalid(): boolean {
    const urlControl = this.form.get('url');
    if (urlControl && urlControl.dirty && urlControl.invalid) {
      for (const pattern of this.getUrlPatterns()) {
        if (pattern.test(urlControl.value)) {
          return false;
        }
      }
      return true;
    }
    return false;
  }

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

}
