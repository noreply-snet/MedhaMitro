import { AfterViewInit, Component, input, signal } from '@angular/core';
import { DatashareService } from '../../services/shared/datashare.service';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule, 
    MatToolbarModule, 
    MatButtonModule,
    RouterLink,],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements AfterViewInit {

  filterValue = signal<string>('');

  status = input<boolean[]>([]);

  items = [
    {
      link: '/login',
      name: 'Log In',
    },
    {
      link: '/login',
      name: 'Log Out',
    },
    {
      link: '/signup',
      name: 'Sign Up',
    },
    {
      link: '/home',
      name: 'Dashboard',
    },
  ];

  onDataChange() {
    this.dataShare.setSharedData(this.filterValue());
  }

  constructor(private dataShare: DatashareService) {
    this.dataShare.data$.subscribe((data) => {
      this.filterValue.set(data);
    });



  }
  ngAfterViewInit(): void {
    // console.log(this.status());
  }

}
