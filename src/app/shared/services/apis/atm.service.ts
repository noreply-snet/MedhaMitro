import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtmDataCreate, AtmData } from '../../../core/interface/api_int.share';
import { Observable} from 'rxjs';
import { AtmSharedService } from '../shared/atm-shared.service';

@Injectable({
  providedIn: 'root',
})
export class AtmService {
  private apiUrl = 'http://127.0.0.1:8000/atm/';

  constructor(private http: HttpClient, private atmDS: AtmSharedService) {}
  
  // API Requests
  get_atms_api(): Observable<AtmData[]> {
    return this.http.get<AtmData[]>(`${this.apiUrl}all`);
  }

  create_atm_api(atm: AtmDataCreate): Observable<AtmData> {
    return this.http.post<AtmData>(`${this.apiUrl}`, atm);
  }

  read_atm_api(atm_id: number): Observable<AtmData> {
    return this.http.get<AtmData>(`${this.apiUrl}${atm_id}`);
  }

  update_atm_api(atm: AtmData): Observable<AtmData> {
    return this.http.put<AtmData>(`${this.apiUrl}`, atm);
  }

  delete_atm_api(atm_id: number): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${this.apiUrl}${atm_id}`);
  }

  // Handling API Request Functions
  fetchAllAtms(): void {
    this.get_atms_api().subscribe({
      next: (data: AtmData[]) => {
        this.atmDS.setAtmsData(data); 
        console.log('Fetched ATM Data:', data);
      },
      error: (error) => {
        console.error('Error fetching ATM data:', error);
      },
    });
  }

  atmCreate(data: AtmDataCreate): void {
    this.create_atm_api(data).subscribe({
      next: (atm: AtmData) => {
        console.log('Form Submitted:', atm);
        this.atmDS.addAtm(atm);
      },
      error: (error) => {
        console.error('Form Submission Error:', error);
      },
    });
  }

  atmUpdate(data: AtmData): void {
    this.update_atm_api(data).subscribe({
      next: (atm: AtmData) => {
        console.log('ATM Updated:', atm);
        this.atmDS.updateAtm(atm);
      },
      error: (error) => {
        console.error('Update Error:', error);
      },
    });
  }

  atmDelete(id: number): void {
    if (id) {
      this.delete_atm_api(id).subscribe({
        next: (response: { msg: string }) => {
          console.log(response);
          this.atmDS.removeAtmById(id); 
        },
        error: (error) => {
          console.error('Delete Error:', error);
        },
      });
    } else {
      console.error('Invalid ID');
    }
  }

}
