import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankData, BankDataCreate } from '../../../core/interface/api_int.share';
import { BankSharedService } from '../shared/bank-shared.service';

@Injectable({
  providedIn: 'root'
})

export class BankApiService {

  private apiUrl = 'http://127.0.0.1:8000/bank'; // Updated API URL for Bank

  constructor(private http: HttpClient, private bankDS: BankSharedService) {}

  // API Requests
  getAllBanksApi(): Observable<BankData[]> {
    return this.http.get<BankData[]>(`${this.apiUrl}/all`);
  }

  createBankApi(bank: BankDataCreate): Observable<BankData> {
    return this.http.post<BankData>(`${this.apiUrl}/`, bank);
  }

  readBankApi(bankId: number): Observable<BankData> {
    return this.http.get<BankData>(`${this.apiUrl}/${bankId}`);
  }

  updateBankApi(bank: BankData): Observable<BankData> {
    return this.http.put<BankData>(`${this.apiUrl}/`, bank);
  }

  deleteBankApi(bankId: number): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${this.apiUrl}/${bankId}`);
  }

  // Handling API Request Functions
  fetchAllBanks(): void {
    this.getAllBanksApi().subscribe({
      next: (data: BankData[]) => {
        this.bankDS.setBanksData(data); // Using shared service to store data
        console.log('Fetched Bank Data:', data);
      },
      error: (error) => {
        console.error('Error fetching bank data:', error);
      },
    });
  }

  bankCreate(data: BankDataCreate): void {
    this.createBankApi(data).subscribe({
      next: (bank: BankData) => {
        console.log('Bank Created:', bank);
        this.bankDS.addBank(bank); // Add to shared data service
      },
      error: (error) => {
        console.error('Error creating bank:', error);
      },
    });
  }

  bankUpdate(data: BankData): void {
    this.updateBankApi(data).subscribe({
      next: (bank: BankData) => {
        console.log('Bank Updated:', bank);
        this.bankDS.updateBank(bank); // Update shared data
      },
      error: (error) => {
        console.error('Error updating bank:', error);
      },
    });
  }

  bankDelete(id: number): void {
    if (id) {
      this.deleteBankApi(id).subscribe({
        next: (response: { msg: string }) => {
          console.log(response);
          this.bankDS.removeBankById(id); // Remove from shared data
        },
        error: (error) => {
          console.error('Error deleting bank:', error);
        },
      });
    } else {
      console.error('Invalid Bank ID');
    }
  }
}
