import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PassData, PassDataCreate } from '../../../core/interface/api_int.share';
import { PassSharedService } from '../shared/pass-shared.service';

@Injectable({
  providedIn: 'root'
})
export class PassApiService {

  private apiUrl = 'http://127.0.0.1:8000/pass'; // Replace with your backend endpoint

  constructor(private http: HttpClient, private passDS: PassSharedService) {}

  // API Requests
  getAllPasses(): Observable<PassData[]> {
    return this.http.get<PassData[]>(`${this.apiUrl}/all`);
  }

  createPass(pass: PassDataCreate): Observable<PassData> {
    return this.http.post<PassData>(`${this.apiUrl}/`, pass);
  }

  readPass(passId: number): Observable<PassData> {
    return this.http.get<PassData>(`${this.apiUrl}/${passId}`);
  }

  updatePass(pass: PassData): Observable<PassData> {
    return this.http.put<PassData>(`${this.apiUrl}/`, pass);
  }

  deletePass(passId: number): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${this.apiUrl}/${passId}`);
  }

  // Handling API Request Functions
  fetchAllPasses(): void {
    this.getAllPasses().subscribe({
      next: (data: PassData[]) => {
        this.passDS.setPassesData(data);
        console.log('Fetched Passes Data:', data);
      },
      error: (error) => {
        console.error('Error fetching passes:', error);
      },
    });
  }

  passCreate(data: PassDataCreate): void {
    this.createPass(data).subscribe({
      next: (pass: PassData) => {
        this.passDS.addPass(pass);
        console.log('Pass Created:', pass);
      },
      error: (error) => {
        console.error('Error creating pass:', error);
      },
    });
  }

  passUpdate(data: PassData): void {
    this.updatePass(data).subscribe({
      next: (pass: PassData) => {
        this.passDS.updatePass(pass);
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
        this.passDS.removePassById(id);
        console.log('Pass Deleted:', response);
      },
      error: (error) => {
        console.error('Error deleting pass:', error);
      },
    });
  }
}
