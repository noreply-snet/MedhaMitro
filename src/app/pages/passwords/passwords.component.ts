import { Component, OnInit } from '@angular/core';
import { PassinfoComponent } from '../../shared/components/passinfo/passinfo.component';
import { PassApiService } from '../../shared/services/apis/pass-api.service';
import { PassData } from '../../core/interface/api_int.share';
import { PassSharedService } from '../../shared/services/shared/pass-shared.service';

@Component({
  selector: 'app-passwords',
  imports: [
  PassinfoComponent,
  ],
  templateUrl: './passwords.component.html',
  styleUrl: './passwords.component.css'
})
export class PasswordsComponent implements OnInit {
  
  data: PassData[] = [];

  constructor(private passApi: PassApiService, private passShare: PassSharedService) { }
  
  ngOnInit(): void {
    // console.log(passDataSet);
    this.passShare.passesData$.subscribe((data) => {
      this.data = data;
    });

    this.passApi.fetchAllPasses();

  }
  


}
