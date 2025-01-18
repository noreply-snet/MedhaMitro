import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ApiType } from '../../../core/enums/api-type.enum';

@Injectable({
  providedIn: 'root',
})
export class CasheService {
  constructor() {}

  private cache = new Map<ApiType, any[]>();
  private cacheStateSubject = new BehaviorSubject<Map<ApiType, any[]>>(this.cache);

  // Observable for cache state
  cacheState$: Observable<Map<ApiType, any[]>> = this.cacheStateSubject.asObservable();

  get(type: ApiType): any[] | null {
    const cachedData = this.cache.get(type);
    return cachedData !== undefined ? cachedData : null;
  }

  set(type: ApiType, data: any[]): void {
    this.cache.set(type, data);
    this.emitCacheState();
  }

  addItem(type: ApiType, newItem: any): void {
    const cachedData = this.cache.get(type) || [];
    this.cache.set(type, [...cachedData, newItem]);
    this.emitCacheState();
  }

  updateItem(type: ApiType, updatedItem: any): void {
    const cachedData = this.cache.get(type) || [];
    const updatedData = cachedData.map((item) =>
      item.id === updatedItem.id ? { ...item, ...updatedItem } : item
    );
    this.cache.set(type, updatedData);
    this.emitCacheState();
  }

  deleteItem(type: ApiType, id: number): void {
    const cachedData = this.cache.get(type) || [];
    const updatedData = cachedData.filter((item) => item.id !== id);
    this.cache.set(type, updatedData);
    this.emitCacheState();
  }

  private emitCacheState(): void {
    this.cacheStateSubject.next(new Map(this.cache));
  }
}
