import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [
    CommonModule,
    MatFormFieldModule,  
    ReactiveFormsModule,
    MatIconModule,
    HeaderComponent,
    RouterLink,
  ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {

  btnS = [true, false, false, true, false];
  hide = true;
  chide = true;

  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a Value';
    }
    return this.email.hasError('email') ? 'Not a valid Email Address' : '';
  }


}
