import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PassDataReUp, PassDataCreate } from '../../../core/interface/api_int.share';

@Injectable({
  providedIn: 'root'
})
export class PassApiService {

  private apiUrl = 'http://127.0.0.1:8000/pass'; // Replace with your backend endpoint

  constructor(private http: HttpClient) {}

  // API Requests
  getAllPasses(): Observable<PassDataReUp[]> {
    return this.http.get<PassDataReUp[]>(`${this.apiUrl}/all`);
  }

  createPass(pass: PassDataCreate): Observable<PassDataReUp> {
    return this.http.post<PassDataReUp>(`${this.apiUrl}/`, pass);
  }

  readPass(passId: number): Observable<PassDataReUp> {
    return this.http.get<PassDataReUp>(`${this.apiUrl}/${passId}`);
  }

  updatePass(pass: PassDataReUp): Observable<PassDataReUp> {
    return this.http.put<PassDataReUp>(`${this.apiUrl}/`, pass);
  }

  deletePass(passId: number): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${this.apiUrl}/${passId}`);
  }

  // Handling API Request Functions
  fetchAllPasses(): void {
    this.getAllPasses().subscribe({
      next: (data: PassDataReUp[]) => {
        console.log('Fetched Passes Data:', data);
      },
      error: (error) => {
        console.error('Error fetching passes:', error);
      },
    });
  }

  passCreate(data: PassDataCreate): void {
    this.createPass(data).subscribe({
      next: (pass: PassDataReUp) => {
        console.log('Pass Created:', pass);
      },
      error: (error) => {
        console.error('Error creating pass:', error);
      },
    });
  }

  passUpdate(data: PassDataReUp): void {
    this.updatePass(data).subscribe({
      next: (pass: PassDataReUp) => {
        console.log('Pass Updated:', pass);
      },
      error: (error) => {
        console.error('Error updating pass:', error);
      },
    });
  }

  passDelete(id: number): void {
    this.deletePass(id).subscribe({
      next: (response: { msg: string }) => {
        console.log('Pass Deleted:', response);
      },
      error: (error) => {
        console.error('Error deleting pass:', error);
      },
    });
  }
}
