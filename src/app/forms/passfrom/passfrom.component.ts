import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { CdkCopyToClipboard } from '@angular/cdk/clipboard';
import { CommonModule } from '@angular/common';
import { PassMaskPipe } from '../../shared/pipes/masking.pipe';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { CentralApisService } from '../../shared/services/apis/central-apis.service';
import { ApiType } from '../../core/enums/api-type.enum';
import { PassData, PassDataCreate } from '../../core/interface/api_int.share';

@Component({
  selector: 'app-passfrom',
  standalone: true,
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
  providers: [CentralApisService],
  templateUrl: './passfrom.component.html',
  styleUrls: ['./passfrom.component.css'],
})
export class PassfromComponent {
  title: string = 'Add Password';
  hide: boolean = true;
  edit_mode: boolean = false;
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
  ];
  status: boolean = true;

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private apiService: CentralApisService
  ) {
    this.form = this.fb.group({
      id: '',
      url: [
        '',
        [
          Validators.required,
          this.multiplePatternValidator(this.getUrlPatterns()),
        ],
      ],
      acc_name: ['', Validators.required],
      loginid: ['', Validators.required],
      password: ['', Validators.required],
      ass_email: ['', [Validators.email]],
      notes: [''],
    });
  }

  ngOnInit(): void {
    if (this.data.type === 'View') {
      this.title = 'View Password';
      this.form.patchValue({
        id: this.data.id,
        url: this.data.url,
        acc_name: this.data.acc_name,
        loginid: this.data.loginid,
        password: this.data.password,
        ass_email: this.data.ass_email,
        notes: this.data.notes,
      });
    }
  }

  getUrlPatterns(): RegExp[] {
    return [
      /^(?:https?:\/\/)?(?:[a-z0-9\-]+\.)+[a-z]{2,6}(?::[0-9]+)?(?:[/\w .-]*)*\/?$/, // pattern for "https://material.angular.io/components/form-field/examples"
      /^(?:https?:\/\/)?localhost(?::[0-9]+)?(?:[/\w .-]*)*\/?$/, // pattern for "http://localhost:4200/home/passwords"
      /^(?:https?:\/\/)?(?:[0-9]{1,3}\.){3}[0-9]{1,3}(?::[0-9]+)?(?:[/\w .-]*)*\/?$/, // pattern for "http://192.168.0.1/index.html"
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
      const newPass = this.passSerialize(this.form.value);
      this.apiService.createData<PassDataCreate>(ApiType.Pass, newPass);
      console.log('Form Created:', this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }

  passSerialize(value: any): PassDataCreate {
    return {
      acc_name: value.acc_name,
      url: value.url,
      loginid: value.loginid,
      password: value.password,
      ass_email: value.ass_email,
      notes: value.notes,
    };
  }

  onUpdate() {
    if (this.form.valid) {
      const updatedPass = this.passUpdateSerialize(this.form.value);
      this.apiService.updateData<PassData>(ApiType.Pass, updatedPass);
      console.log('Form Updated:', this.form.value);
    } else {
      console.log('Form is invalid');
    }
  }

  passUpdateSerialize(value: any): PassData {
    return {
      id: value.id,
      acc_name: value.acc_name,
      url: value.url,
      loginid: value.loginid,
      password: value.password,
      ass_email: value.ass_email,
      notes: value.notes,
    };
  }

  onDelete(id: number): void {
    if (id) {
      this.apiService.deleteData(ApiType.Pass, id);
    } else {
      console.error('Invalid ID');
    }
  }
}
