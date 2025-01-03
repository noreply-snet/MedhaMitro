import { AfterViewInit, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-nevbar',
  imports: [
    MatIconModule,
    RouterLink
  ],
  templateUrl: './nevbar.component.html',
  styleUrl: './nevbar.component.css'
})
export class NevbarComponent implements AfterViewInit {


  ngAfterViewInit(): void {
    // console.log(this.items);
  }

  constructor (private authService: AuthService) { }

  status = 1;

  items = [
    {
      link: "/home/dashboard",
      icon: "dashboard", // Material Icon name
      name: "Dashboard"
    },
    {
      link: "/home/passwords",
      icon: "lock", // Material Icon name
      name: "Passwords"
    },
    {
      link: "/home/notes",
      icon: "sticky_note_2", // Material Icon name
      name: "Notes"
    },
    {
      link: "/home/cards",
      icon: "credit_card", // Material Icon name
      name: "Payment Cards"
    },
    {
      link: "/home/banks",
      icon: "account_balance", // Material Icon name
      name: "Bank Accounts"
    },
    {
      link: "",
      icon: "logout", // Material Icon name
      name: "LogOut"
    }
  ];

  logOut() {
    this.authService.logout();
  }


}
