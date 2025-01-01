import { Routes } from '@angular/router';
import { CardsComponent } from './pages/cards/cards.component';
import { AtmfromComponent } from './forms/atmfrom/atmfrom.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupComponent } from './pages/signup/signup.component';
import { ForgetpassComponent } from './pages/forgetpass/forgetpass.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { NotesComponent } from './pages/notes/notes.component';
import { PassinfoComponent } from './shared/components/passinfo/passinfo.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'forgot_password', component: ForgetpassComponent },
  {
    path: 'home',
    component: HomeComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'cards', component: CardsComponent },
      { path: 'atmFrom', component: AtmfromComponent },
      { path: 'notes', component: NotesComponent },
      { path: 'password', component: PassinfoComponent },
    ],
  },
];
