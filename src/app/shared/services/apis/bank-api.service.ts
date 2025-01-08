import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BankDataReUp, BankDataCreate } from '../../../core/interface/api_int.share';

@Injectable({
  providedIn: 'root'
})

export class BankApiService {

  private apiUrl = 'http://127.0.0.1:8000/bank'; // Updated API URL for Bank

  constructor(private http: HttpClient, private bankDS: BankSharedService) {}

  // API Requests
  getAllBanksApi(): Observable<BankDataReUp[]> {
    return this.http.get<BankDataReUp[]>(`${this.apiUrl}/all`);
  }

  createBankApi(bank: BankDataCreate): Observable<BankDataReUp> {
    return this.http.post<BankDataReUp>(`${this.apiUrl}/`, bank);
  }

  readBankApi(bankId: number): Observable<BankDataReUp> {
    return this.http.get<BankDataReUp>(`${this.apiUrl}/${bankId}`);
  }

  updateBankApi(bank: BankDataReUp): Observable<BankDataReUp> {
    return this.http.put<BankDataReUp>(`${this.apiUrl}/`, bank);
  }

  deleteBankApi(bankId: number): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${this.apiUrl}/${bankId}`);
  }

  // Handling API Request Functions
  fetchAllBanks(): void {
    this.getAllBanksApi().subscribe({
      next: (data: BankDataReUp[]) => {
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
      next: (bank: BankDataReUp) => {
        console.log('Bank Created:', bank);
        this.bankDS.addBank(bank); // Add to shared data service
      },
      error: (error) => {
        console.error('Error creating bank:', error);
      },
    });
  }

  bankUpdate(data: BankDataReUp): void {
    this.updateBankApi(data).subscribe({
      next: (bank: BankDataReUp) => {
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
