import { Component, OnInit } from '@angular/core';
import { PassinfoComponent } from '../../shared/components/passinfo/passinfo.component';
import { PassData } from '../../core/interface/api_int.share';
import { CentralApisService } from '../../shared/services/apis/central-apis.service';
import { CasheService } from '../../shared/services/shared/cashe.service';
import { ApiType } from '../../core/enums/api-type.enum';

@Component({
  selector: 'app-passwords',
  imports: [PassinfoComponent],
  templateUrl: './passwords.component.html',
  styleUrl: './passwords.component.css',
})
export class PasswordsComponent implements OnInit {
  data: PassData[] = [];

  constructor(
    private Api: CentralApisService,
    private casheService: CasheService
  ) {}

  ngOnInit(): void {
    // Subscribe to the cache observable
    this.casheService.cacheState$.subscribe((cache) => {
      const cachedPassData = cache.get(ApiType.Pass);
      if (cachedPassData) {
        this.data = cachedPassData;
      }
    });

    // Fetch data from API if not already cached
    if (!this.casheService.get(ApiType.Pass)) {
      this.Api.fetchAll(ApiType.Pass);
    }
  }
}
