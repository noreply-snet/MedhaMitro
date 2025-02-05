import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiType } from '../../../core/enums/api-type.enum';
import { CasheService } from '../shared/cashe.service';


@Injectable({
  providedIn: 'root'
})
export class CentralApisService {

  constructor(private http: HttpClient, private cacheService: CasheService) { }

  // Base URL
  url : string = 'http://127.0.0.1:8000';

  // For Deployment and Testing porposes 
  url : string = 'https://passbackend-api.onrender.com';
  

  private baseUrls = {
    [ApiType.Bank]: '${this.url}/bank',
    [ApiType.Atm]: '${this.url}/atm',
    [ApiType.Note]: '${this.url}/note',
    [ApiType.Pass]: '${this.url}/pass',
  };

  // API Requests
  getAll<T>(type: ApiType): Observable<T[]> {
    return this.http.get<T[]>(`${this.baseUrls[type]}/all`);
  }

  create<T>(type: ApiType, data: T): Observable<T> {
    return this.http.post<T>(`${this.baseUrls[type]}/`, data);
  }

  getById<T>(type: ApiType, id: number): Observable<T> {
    return this.http.get<T>(`${this.baseUrls[type]}/${id}`);
  }

  update<T>(type: ApiType, data: T): Observable<T> {
    return this.http.put<T>(`${this.baseUrls[type]}/`, data);
  }

  delete(type: ApiType, id: number): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${this.baseUrls[type]}/${id}`);
  }

  // Handling API Request Data Using Functions
  fetchAll<T>(type: ApiType): void {
    const cachedData = this.cacheService.get(type);

    if (cachedData) {
      console.log(`Fetched ${type} Data from Cache:`, cachedData);
    } else {
      this.getAll<T>(type).subscribe({
        next: (data: T[]) => {
          this.cacheService.set(type, data);
          console.log(`Fetched ${type} Data from API:`, data);
        },
        error: (error) => {
          console.error(`Error fetching ${type} data:`, error);
        },
      });
    }
  }

  createData<T>(type: ApiType, data: T): void {
    this.create<T>(type, data).subscribe({
      next: (createdData: T) => {
        this.cacheService.addItem(type, createdData);
        console.log(`${type} Created:`, createdData);
      },
      error: (error) => {
        console.error(`Error creating ${type}:`, error);
      },
    });
  }

  updateData<T>(type: ApiType, data: T): void {
    this.update<T>(type, data).subscribe({
      next: (updatedData: T) => {
        this.cacheService.updateItem(type, updatedData);
        console.log(`${type} Updated:`, updatedData);
      },
      error: (error) => {
        console.error(`Error updating ${type}:`, error);
      },
    });
  }

  deleteData(type: ApiType, id: number): void {
    this.delete(type, id).subscribe({
      next: (response: { msg: string }) => {
        this.cacheService.deleteItem(type, id);
        console.log(`${type} Deleted:`, response);
      },
      error: (error) => {
        console.error(`Error deleting ${type}:`, error);
      },
    });
  }
}
