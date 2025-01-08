import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteDataReUp, NoteDataCreate } from '../../../core/interface/api_int.share';

@Injectable({
  providedIn: 'root'
})
export class NoteApiService {

  private apiUrl = 'http://127.0.0.1:8000/note'; // Replace with your backend endpoint

  constructor(private http: HttpClient) {}

  // API Requests
  getAllNotes(): Observable<NoteDataReUp[]> {
    return this.http.get<NoteDataReUp[]>(`${this.apiUrl}/all`);
  }

  createNote(note: NoteDataCreate): Observable<NoteDataReUp> {
    return this.http.post<NoteDataReUp>(`${this.apiUrl}/`, note);
  }

  readNote(noteId: number): Observable<NoteDataReUp> {
    return this.http.get<NoteDataReUp>(`${this.apiUrl}/${noteId}`);
  }

  updateNote(note: NoteDataReUp): Observable<NoteDataReUp> {
    return this.http.put<NoteDataReUp>(`${this.apiUrl}/`, note);
  }

  deleteNote(noteId: number): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${this.apiUrl}/${noteId}`);
  }

  // Handling API Request Functions
  fetchAllNotes(): void {
    this.getAllNotes().subscribe({
      next: (data: NoteDataReUp[]) => {
        console.log('Fetched Notes Data:', data);
      },
      error: (error) => {
        console.error('Error fetching notes:', error);
      },
    });
  }

  noteCreate(data: NoteDataCreate): void {
    this.createNote(data).subscribe({
      next: (note: NoteDataReUp) => {
        console.log('Note Created:', note);
      },
      error: (error) => {
        console.error('Error creating note:', error);
      },
    });
  }

  noteUpdate(data: NoteDataReUp): void {
    this.updateNote(data).subscribe({
      next: (note: NoteDataReUp) => {
        console.log('Note Updated:', note);
      },
      error: (error) => {
        console.error('Error updating note:', error);
      },
    });
  }

  noteDelete(id: number): void {
    this.deleteNote(id).subscribe({
      next: (response: { msg: string }) => {
        console.log('Note Deleted:', response);
      },
      error: (error) => {
        console.error('Error deleting note:', error);
      },
    });
  }
}
