import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { NoteData, NoteDataCreate } from '../../../core/interface/api_int.share';
import { NoteSharedService } from '../shared/note-shared.service';

@Injectable({
  providedIn: 'root'
})
export class NoteApiService {

  private apiUrl = 'http://127.0.0.1:8000/note'; // Replace with your backend endpoint

  constructor(private http: HttpClient, private noteDS: NoteSharedService) {}

  // API Requests
  getAllNotes(): Observable<NoteData[]> {
    return this.http.get<NoteData[]>(`${this.apiUrl}/all`);
  }

  createNote(note: NoteDataCreate): Observable<NoteData> {
    return this.http.post<NoteData>(`${this.apiUrl}/`, note);
  }

  readNote(noteId: number): Observable<NoteData> {
    return this.http.get<NoteData>(`${this.apiUrl}/${noteId}`);
  }

  updateNote(note: NoteData): Observable<NoteData> {
    return this.http.put<NoteData>(`${this.apiUrl}/`, note);
  }

  deleteNote(noteId: number): Observable<{ msg: string }> {
    return this.http.delete<{ msg: string }>(`${this.apiUrl}/${noteId}`);
  }

  // Handling API Request Functions
  fetchAllNotes(): void {
    this.getAllNotes().subscribe({
      next: (data: NoteData[]) => {
        this.noteDS.setNotesData(data);
        console.log('Fetched Notes Data:', data);
      },
      error: (error) => {
        console.error('Error fetching notes:', error);
      },
    });
  }

  noteCreate(data: NoteDataCreate): void {
    this.createNote(data).subscribe({
      next: (note: NoteData) => {
        this.noteDS.addNote(note);
        console.log('Note Created:', note);
      },
      error: (error) => {
        console.error('Error creating note:', error);
      },
    });
  }

  noteUpdate(data: NoteData): void {
    this.updateNote(data).subscribe({
      next: (note: NoteData) => {
        this.noteDS.updateNote(note);
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
        this.noteDS.removeNoteById(id);
        console.log('Note Deleted:', response);
      },
      error: (error) => {
        console.error('Error deleting note:', error);
      },
    });
  }
}
