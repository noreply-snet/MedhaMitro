import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder,FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../shared/services/auth/auth.service';

@Component({
  selector: 'app-login',
  imports: [
  CommonModule,
    MatFormFieldModule,  
    ReactiveFormsModule,
    MatIconModule,
    HeaderComponent,
    RouterLink,
    MatButtonModule,
    MatInputModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  btnS=[false,false,true,true,false];

  hide = true;

  form : FormGroup;

  constructor(private fb: FormBuilder,private authService: AuthService) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  login() {
    this.authService.login();
  }
  
}
