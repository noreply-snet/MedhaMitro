import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { NoteData } from '../../../core/interface/api_int.share';

@Injectable({
  providedIn: 'root'
})
export class NoteSharedService {

  constructor() { }

  private notesDataSubject = new BehaviorSubject<NoteData[]>([]); // Initial list
  notesData$ = this.notesDataSubject.asObservable(); // Observable to subscribe to

  // Set the complete list of notes
  setNotesData(data: NoteData[]): void {
    this.notesDataSubject.next(data); // Assign the new data to the list
  }

  // Add a new note
  addNote(newNote: NoteData): void {
    const currentData = this.notesDataSubject.value;
    this.notesDataSubject.next([...currentData, newNote]); // Add new note and update the list
  }

  // Update an existing note by ID
  updateNote(updatedNote: NoteData): void {
    const currentData = this.notesDataSubject.value;
    const updatedData = currentData.map((note) =>
      // note.id === updatedNote.id ? {...note, ...updatedNote, tags: [...updatedNote.tags]} : note // Ensure tags are updated
      note.id === updatedNote.id ? updatedNote : note
    );
    this.notesDataSubject.next(updatedData); // Update the list
  }

  // Remove a note by its ID
  removeNoteById(id: number): void {
    const updatedData = this.notesDataSubject.value.filter((note) => note.id !== id);
    this.notesDataSubject.next(updatedData); // Update the list after deletion
  }

}
