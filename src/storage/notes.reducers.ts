import { NotesModel } from './notes.model';
import { Action, on } from "@ngrx/store";
import { State, createReducer } from "@ngrx/store";

import * as notesActions from "./notes.actions";

export const initialState: NotesModel = {
  notes: [],
  filter: '',
  selectedNote: null
};

const reducer = createReducer(
  initialState,
  on(notesActions.saveNoteAction, (state, { note }) => {
    const contatedNotes =  state.notes.concat(note);
    return ({ ...state,  notes: contatedNotes, filteredNotes: contatedNotes });
  }),
  on(notesActions.updateNoteAction, (state, { note }) => {
    return ({ ...state, notes: state.notes.map(n => n.id === note.id ? note : n)});
  }),
  on(notesActions.selectNoteAction, (state, { note }) => {
    return ({ ...state,  selectedNote: note });
  }),
  on(notesActions.removeNoteAction, (state, { note }) => {
    return ({ ...state, notes: state.notes.filter(n => n.id !== note.id)});
  }),
  on(notesActions.removeSelectedNoteAction, (state) => {
    return ({ ...state, selectedNote: null });
  }),
  on(notesActions.filterNotesAction, (state, { filter }) => {
    return ({ ...state, filter });
  }),
);

export function notesReducer(state: NotesModel | undefined, action: Action) {
  return reducer(state, action);
}
