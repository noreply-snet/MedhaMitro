import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtmDataCreate, AtmDataReUp } from '../../core/interface/api_int.share';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AtmService {
  private apiUrl = "http://127.0.0.1:8000/atm";

  constructor(private http: HttpClient) {}

  getAllAtms(): Observable<AtmDataReUp[]> {
    return this.http.get<AtmDataReUp[]>(`${this.apiUrl}/all`);
  }  

  createAtm(atm: AtmDataCreate): Observable<AtmDataReUp> {
    return this.http.post<AtmDataReUp>(`${this.apiUrl}/`, atm);
  }

  readAtm(atm_id: number): Observable<AtmDataReUp> {
    return this.http.get<AtmDataReUp>(`${this.apiUrl}/${atm_id}`);
  }

  updateAtm(atm: AtmDataReUp): Observable<AtmDataReUp> {
    return this.http.put<AtmDataReUp>(`${this.apiUrl}/`, atm);
  }
  
  deleteAtm(atm_id: number): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${this.apiUrl}/${atm_id}`);
  }
  
}
