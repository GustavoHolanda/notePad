import { localStorageSync } from "ngrx-store-localstorage";
import * as fromNotes from "./../storage/notes.reducers";
import { NotesModel } from "src/storage/notes.model";
import {
  ActionReducerMap,
  ActionReducer,
  MetaReducer
} from "@ngrx/store";

export const reducers: ActionReducerMap<{ nr: NotesModel }> = {
  nr: fromNotes.notesReducer
};

export function localStorageSyncReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSync({
    keys: [
      {
        nr: ["notes"]
      }
    ],
    rehydrate: true
  })(reducer);
}
export function localStorageSyncMetaReducer(
  reducer: ActionReducer<any>
): ActionReducer<any> {
  return localStorageSyncReducer(reducer);
}
const meta = [localStorageSyncMetaReducer];

export const metaReducers: Array<MetaReducer<any, any>> = meta;
