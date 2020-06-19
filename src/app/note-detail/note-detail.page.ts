import { Note } from "./../../models/note";
import { NotesTypes } from "./../../storage/notes.actions";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";
import * as uuid from "uuid";
import * as moment from "moment";
import { NavController, ToastController } from "@ionic/angular";
import { Subscription, Observable, of } from "rxjs";
import { GalleryService } from "../../services/gallery/gallery.service";
import { GeolocationService } from "../../services/geolocation/geolocation.service";

@Component({
  selector: "app-note-detail",
  templateUrl: "./note-detail.page.html",
  styleUrls: ["./note-detail.page.scss"]
})
export class NoteDetailPage implements OnInit, OnDestroy {
  form: FormGroup;
  selectedNote: Note;
  noteSubs$ = new Subscription();
  imgUrl: string;
  loc: string;

  constructor(
    private store: Store<any>,
    public navCtrl: NavController,
    public toastController: ToastController,
    public gaSer: GalleryService,
    public glSer: GeolocationService
  ) {}

  ngOnInit() {
    this.noteSubs$ = this.store
      .select(state => state.nr.selectedNote)
      .subscribe((note: Note) => {
        if (note) {
          this.selectedNote = note;
        }
      });
    if (this.selectedNote) {
      this.imgUrl = this.selectedNote.imgUrl;
      this.loc = this.selectedNote.location;
    }
    this.initForm();
  }

  /**
   *  Função que cria e inicia o formulário.
   */

  initForm = () => {
    this.form = new FormGroup({
      title: new FormControl(this.selectedNote ? this.selectedNote.title : "", [
        Validators.minLength(1),
        Validators.required
      ]),
      description: new FormControl(
        this.selectedNote ? this.selectedNote.description : "",
        Validators.required
      )
    });
  }

  /**
   * Função principal. Recebe os dados do formulário, valida e  envia para atualização ou para a criação de uma nova nota
   */
  onSubmit = form => {
    if (form.status === "VALID") {
      this.store.dispatch({
        type: this.selectedNote ? NotesTypes.UPDATE_NOTE : NotesTypes.SAVE_NOTE,
        note: this.buildNote(form.value)
      });
      this.presentToast(
        `Nota ${this.selectedNote ? "atualizada" : "criada"} com sucesso!`
      );
      this.popView();
    } else {
      this.presentToast("verifique os dados para prosseguir.");
    }
  }

  /**
   *  Função que cria a nota que vai ser salva ou atualizada.
   */
  buildNote = (formValue): Note => {
    return {
      id: this.selectedNote ? this.selectedNote.id : uuid.v4(),
      title: formValue.title,
      description: formValue.description,
      imgUrl: this.imgUrl,
      location: this.loc,
      lastModification: moment().format("DD-MM-YYYY HH:mm")
    };
  }

  /**
   *  Função que chama a action de remover nota.
   */
  removeNote = () => {
    this.store.dispatch({
      type: NotesTypes.DELETE_NOTE,
      note: this.selectedNote
    });
    this.popView();
  }

  /**
   *  Função que remove a tela atual.
   */
  popView = () => {
    this.store.dispatch({ type: NotesTypes.REMOVE_SELECTED_NOTE });
    this.navCtrl.pop();
  }

  /**
   *  Lifecycle hook que dispara a action para remover a nota selecionada
   */
  ionViewWillLeave() {
    this.store.dispatch({ type: NotesTypes.REMOVE_SELECTED_NOTE });
  }

  /**
   *  Função que chama o serviço de abertura da galeria e inputa o retorno em uma variável
   */
  openGallery = () => {
    this.gaSer
      .takePicture()
      .then(imgUrl => {
        this.imgUrl = imgUrl;
      })
      .catch(err => {
        this.presentToast("Erro ao abrir a galeria.");
        throw Error(err);
      });
  }

  /**
   *  Função que chama o serviço de Geolocalização e chama a API do Google, retornado o resultado em uma variável
   */
  getLocation = () => {
    this.glSer.getLocationGoogleAPI().subscribe((val: any) => {
      this.loc = val.results[0].formatted_address;
    });
  }

  /**
   *  Função de apresentação do toast, com parametro mensagem customizado.
   */
  async presentToast(message) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  ngOnDestroy() {
    this.noteSubs$.unsubscribe();
  }
}
