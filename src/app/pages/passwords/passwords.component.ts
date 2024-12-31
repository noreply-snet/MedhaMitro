import { Component } from '@angular/core';
import { passDataSet } from '../../data/passData';
import { PassDataInt } from '../../core/interface/interfaces.share';

@Component({
  selector: 'app-passwords',
  imports: [],
  templateUrl: './passwords.component.html',
  styleUrl: './passwords.component.css'
})
export class PasswordsComponent {

  data: PassDataInt[] = passDataSet;

}
