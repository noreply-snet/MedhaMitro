import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { BankDataReUp } from '../../../core/interface/api_int.share';

@Injectable({
  providedIn: 'root'
})
export class BankSharedService {

  constructor() { }


  private banksDataSubject = new BehaviorSubject<BankDataReUp[]>([]); // Initial list
  banksData$ = this.banksDataSubject.asObservable(); // Observable to subscribe to

  // Set the complete list of banks
  setBanksData(data: BankDataReUp[]): void {
    this.banksDataSubject.next(data); // Assign the new data to the list
  }

  // Add a new bank
  addBank(newBank: BankDataReUp): void {
    const currentData = this.banksDataSubject.value;
    this.banksDataSubject.next([...currentData, newBank]); // Add new bank and update the list
  }

  // Update an existing bank by ID
  updateBank(updatedBank: BankDataReUp): void {
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
