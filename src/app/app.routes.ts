import { Routes } from '@angular/router';
import { CardsComponent } from './pages/cards/cards.component';
import { AtmfromComponent } from './forms/atmfrom/atmfrom.component';
import { HomeComponent } from './home/home.component';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'atmFrom', component: AtmfromComponent },
    { path: 'cards', component: CardsComponent },

];
