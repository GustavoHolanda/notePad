import { Note } from "./../models/note";
import { createSelector } from "@ngrx/store";

export interface NotesModel {
  notes: Note[];
  filter: string;
  selectedNote: Note;
}

export const selectNote = (state: { nr: NotesModel }) => {
  return state.nr;
};

export const selectFilteredNotes = createSelector(
  selectNote,
  (state: NotesModel) =>
    state.notes.filter(note =>
      note.title.toLowerCase().includes(state.filter.toLowerCase())
    )
);

export const selectFilter = createSelector(
  selectNote,
  (state: NotesModel) => state.filter
);
