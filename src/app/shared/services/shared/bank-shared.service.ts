import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BankData } from '../../../core/interface/api_int.share';

@Injectable({
  providedIn: 'root'
})
export class BankSharedService {

  constructor() { }


  private banksDataSubject = new BehaviorSubject<BankData[]>([]); // Initial list
  banksData$ = this.banksDataSubject.asObservable(); // Observable to subscribe to

  // Set the complete list of banks
  setBanksData(data: BankData[]): void {
    this.banksDataSubject.next(data); // Assign the new data to the list
  }

  // Add a new bank
  addBank(newBank: BankData): void {
    const currentData = this.banksDataSubject.value;
    this.banksDataSubject.next([...currentData, newBank]); // Add new bank and update the list
  }

  // Update an existing bank by ID
  updateBank(updatedBank: BankData): void {
    const currentData = this.banksDataSubject.value;
    const updatedData = currentData.map((bank) =>
      bank.id === updatedBank.id ? updatedBank : bank // Update the bank by ID
    );
    this.banksDataSubject.next(updatedData); // Update the list
  }

  // Remove a bank by its ID
  removeBankById(id: number): void {
    const updatedData = this.banksDataSubject.value.filter((bank) => bank.id !== id);
    this.banksDataSubject.next(updatedData); // Update the list after deletion
  }
}
