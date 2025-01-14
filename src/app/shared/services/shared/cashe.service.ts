import { HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CasheService {

  constructor() { }

  private cache = new Map<string, HttpResponse<any>>();

  get(url: string): HttpResponse<any> | undefined {
    return this.cache.get(url);
  }

  set(url: string, response: HttpResponse<any>): void {
    this.cache.set(url, response);
  }

  clear(): void {
    this.cache.clear(); // Clear all cached data
  }

  
}
