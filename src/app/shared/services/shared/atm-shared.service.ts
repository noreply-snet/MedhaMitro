import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AtmData } from '../../../core/interface/api_int.share';

@Injectable({
  providedIn: 'root'
})

export class AtmSharedService {

  constructor() { }

  private atmsDataSubject = new BehaviorSubject<AtmData[]>([]); // Initial list
  atmsData$ = this.atmsDataSubject.asObservable(); // Observable to subscribe to

  setAtmsData(data: AtmData[]): void {
    this.atmsDataSubject.next(data); // Assign the new data to the list
  }

  addAtm(newAtm: AtmData): void {
    const currentData = this.atmsDataSubject.value;
    this.atmsDataSubject.next([...currentData, newAtm]); // Add new ATM and update the list
  }

  updateAtm(updatedAtm: AtmData): void {
    const currentData = this.atmsDataSubject.value;
    const updatedData = currentData.map((atm) =>
      atm.id === updatedAtm.id ? updatedAtm : atm // Update the ATM by ID
    );
    this.atmsDataSubject.next(updatedData); // Update the list
  }

  removeAtmById(id: number): void {
    const updatedData = this.atmsDataSubject.value.filter((atm) => atm.id !== id);
    this.atmsDataSubject.next(updatedData); // Update the list after deletion
  }

}
