import { Note } from "./../models/note";
import { createAction, props } from "@ngrx/store";

export enum NotesTypes {
  SAVE_NOTE = "[Notes] Save Note",
  UPDATE_NOTE = "[Notes] Update Note",
  DELETE_NOTE = "[Notes] Delete Note",
  SELECT_NOTE = "[Notes] Select Note",
  FILTER_NOTES = "[Notes] Filter Notes",
  REMOVE_SELECTED_NOTE = "[Notes] Remove Selected Note",
}

export const saveNoteAction = createAction(
  NotesTypes.SAVE_NOTE,
  props<{ note: Note }>()
);

export const selectNoteAction = createAction(
  NotesTypes.SELECT_NOTE,
  props<{ note: Note }>()
);

export const updateNoteAction = createAction(
  NotesTypes.UPDATE_NOTE,
  props<{ note: Note }>()
);

export const removeNoteAction = createAction(
  NotesTypes.DELETE_NOTE,
  props<{ note: Note }>()
);

export const removeSelectedNoteAction = createAction(
  NotesTypes.REMOVE_SELECTED_NOTE
);

export const filterNotesAction = createAction(
  NotesTypes.FILTER_NOTES,
  props<{ filter: string }>()
);


