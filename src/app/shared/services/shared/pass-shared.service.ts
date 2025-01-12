import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PassData } from '../../../core/interface/api_int.share';

@Injectable({
  providedIn: 'root'
})
export class PassSharedService {

  constructor() { }

  private passesDataSubject = new BehaviorSubject<PassData[]>([]); // Initial list
  passesData$ = this.passesDataSubject.asObservable(); // Observable to subscribe to

  // Set the complete list of passes
  setPassesData(data: PassData[]): void {
    this.passesDataSubject.next(data); // Assign the new data to the list
  }

  // Add a new pass
  addPass(newPass: PassData): void {
    const currentData = this.passesDataSubject.value;
    this.passesDataSubject.next([...currentData, newPass]); // Add new pass and update the list
  }

  // Update an existing pass by ID
  updatePass(updatedPass: PassData): void {
    const currentData = this.passesDataSubject.value;
    const updatedData = currentData.map((pass) =>
      pass.id === updatedPass.id ? updatedPass : pass // Update the pass by ID
    );
    this.passesDataSubject.next(updatedData); // Update the list
  }

  // Remove a pass by its ID
  removePassById(id: number): void {
    const updatedData = this.passesDataSubject.value.filter((pass) => pass.id !== id);
    this.passesDataSubject.next(updatedData); // Update the list after deletion
  }

}
