import { Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-forgetpass',
  imports: [
    CommonModule,
    MatFormFieldModule,  
    ReactiveFormsModule,
    HeaderComponent,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './forgetpass.component.html',
  styleUrl: './forgetpass.component.css'
})
export class ForgetpassComponent {

  btnS=[true,false,true,false,false];

  hide = true;
  email = new FormControl('',[Validators.required,Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a Value';
    }

    return this.email.hasError('email') ? 'Not a valid Email Address' : '';
  }

  sEmail() {
    this.snackBer.open("Mail has been sent to your Email !", "Close", { duration: 2500});
  }


  constructor(private snackBer: MatSnackBar) { }


}
