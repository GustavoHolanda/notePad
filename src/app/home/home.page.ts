import { NotesTypes } from "./../../storage/notes.actions";
import { Note } from "./../../models/note";
import { Component } from "@angular/core";
import { Observable } from "rxjs";
import { Store, select } from "@ngrx/store";
import { selectFilteredNotes, selectFilter } from "./../../storage/notes.model";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"]
})
export class HomePage {
  constructor(private store: Store<any>) {}

  notes$: Observable<Note[]> = this.store.pipe(select(selectFilteredNotes));
  filter$: Observable<string> = this.store.pipe(select(selectFilter));

  /**
   *  Função que dispara action de seleção da nota
   */
  selectNote = note => {
    this.store.dispatch({ type: NotesTypes.SELECT_NOTE, note });
  }

  /**
   *  Função que dispara action de remoção de uma nota
   */
  removeNote = note => {
    this.store.dispatch({ type: NotesTypes.DELETE_NOTE, note });
  }

  /**
   *  Função que dispara action de pesquisa, recebendo o que foi inputado no ion-searchbar
   */
  searchNote = ev => {
    this.store.dispatch({
      type: NotesTypes.FILTER_NOTES,
      filter: ev.detail.value
    });
  };
}
