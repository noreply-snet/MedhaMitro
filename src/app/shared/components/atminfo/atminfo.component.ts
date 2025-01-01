import { Component, input } from '@angular/core';
import { AtmData } from '../../core/interface/interfaces.share';


@Component({
  selector: 'app-atminfo',
  imports: [
  ],
  templateUrl: './atminfo.component.html',
  styleUrl: './atminfo.component.css'
})
export class AtminfoComponent {
  getDATA = input()
  
}
