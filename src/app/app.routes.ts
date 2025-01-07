import { Routes } from '@angular/router';
import { CardsComponent } from './pages/cards/cards.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgetpassComponent } from './pages/forgetpass/forgetpass.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotesComponent } from './pages/notes/notes.component';
import { BankComponent } from './pages/bank/bank.component';
import { PasswordsComponent } from './pages/passwords/passwords.component';
import { authGuard } from './shared/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot_password', component: ForgetpassComponent },
  {
    path: 'home',
    component: HomeComponent,
    // canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent , canActivate: [authGuard]},
      { path: 'cards', component: CardsComponent },
      { path: 'notes', component: NotesComponent },
      { path: 'passwords', component: PasswordsComponent },
      { path: 'banks', component: BankComponent}
    ],
  },
  

  { path: '**', redirectTo: 'login', pathMatch: 'full' },

];
