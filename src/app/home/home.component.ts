import { Component } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { DatashareService } from '../core/services/datashare.service';
import { filter } from 'rxjs';
import { NevbarComponent } from '../shared/components/nevbar/nevbar.component';
import { HeaderComponent } from '../shared/components/header/header.component';


@Component({
  selector: 'app-home',
  imports: [
    NevbarComponent,
    HeaderComponent,
    RouterOutlet,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  btnS = [false, true, false, false, true];
  dd: any;
  
  constructor(private rout: Router, private datashear:DatashareService) { }


  ngOnInit() {
    this.dd=this.rout.events.pipe(filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.datashear.setSharedData('');
      // console.log("Navigation Working");
    });
  }

  ngOnDestroy() {
    this.datashear.setSharedData('');
    this.dd.unsubscribe()
    // console.log("Navigation");
  }

}
