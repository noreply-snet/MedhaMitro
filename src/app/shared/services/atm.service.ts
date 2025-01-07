import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AtmDataCreate, AtmDataRead, AtmDataUpdate } from '../../core/interface/api_int.share';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AtmService {
  private apiUrl = "http://127.0.0.1:8000/atm/";

  constructor(private http: HttpClient) {}

  createAtm(atm: AtmDataCreate): Observable<AtmDataRead> {
    return this.http.post<AtmDataRead>(this.apiUrl, atm);
  }

  readAtm(atm_id: number): Observable<AtmDataRead> {
    return this.http.get<AtmDataRead>(`${this.apiUrl}/${atm_id}`);
  }

  updateAtm(atm_id: number, atm: AtmDataUpdate): Observable<AtmDataRead> {
    return this.http.put<AtmDataRead>(`${this.apiUrl}/${atm_id}`, atm);
  }
  
  deleteAtm(atm_id: number): Observable<AtmDataRead> {
    return this.http.delete<AtmDataRead>(`${this.apiUrl}/${atm_id}`);
  }
}
