import { Component, OnInit } from '@angular/core';
import { passDataSet } from '../../data/passData';
import { PassDataInt } from '../../core/interface/interfaces.share';
import { PassinfoComponent } from '../../shared/components/passinfo/passinfo.component';

@Component({
  selector: 'app-passwords',
  imports: [
  PassinfoComponent,
  ],
  templateUrl: './passwords.component.html',
  styleUrl: './passwords.component.css'
})
export class PasswordsComponent implements OnInit {
  ngOnInit(): void {
    // console.log(passDataSet);
  }

  data: PassDataInt[] = passDataSet;

  





}
