import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Musica } from 'src/app/model/entities/Musica';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  indice! : number;
  nome! : string;
  cantor! : string;
  genero! : number;
  data! : number;
  duracao! : string;
  musica! : Musica;
  edicao: boolean = true;
  imagem! : any;

  constructor(private actRoute : ActivatedRoute,
    private firebase : FirebaseService,
    private alertController : AlertController,
    private router : Router) { }

  ngOnInit() {
    this.musica = history.state.musica;
    this.nome = this.musica.nome;
    this.cantor = this.musica.cantor;
    this.genero = this.musica.genero;
    this.data = this.musica.data;
    this.duracao = this.musica.duracao;
  }

  uploadFile(imagem : any){
    this.imagem = imagem.files;

  }

  habilitar(){
    if(this.edicao){
      this.edicao = false;
    }else{
      this.edicao = true;
    }
  }

  editar(){
    if(this.nome && this.cantor){
      let novo: Musica = new Musica(this.nome, this.cantor);
      novo.genero = this.genero;
      novo.data = this.data;
      novo.duracao = this.duracao;
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo)?.then(() => this.router.navigate(['/home']))
        this.firebase.excluir(this.musica.id)
      }else{
        novo.downloadURL = this.musica.downloadURL
        this.firebase.editar(novo, this.musica.id)
      .then(()=> this.router.navigate(["/home"]))
      .catch((error) => {
        console.log(error)
        this.presentAlert("Erro", "Erro ao editar musica!");})
      }
    }else{
      this.presentAlert("Erro", "Nome e Cantor são campos obrigatórios!");
    }
  }

  mensagemDeConfirmacao(){
    this.presentAlertConfirm("Atenção!", "Você realmente deseja excluir?")

  }



  excluirMusica(){
    this.firebase.excluir(this.musica.id)
    .then(()=> this.router.navigate(["/home"]))
    .catch((error) => {
    console.log(error)
    this.presentAlert("Erro", "Erro ao excluir musica!");})
    this.router.navigate(["/home"]);
  }

  async presentAlert(subHeader: string, message: string){
    const alert = await this.alertController.create({
      header: 'Lista de Músicas',
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }

  async presentAlertConfirm(subHeader: string, message: string){
    const alert = await this.alertController.create({
      header: 'Lista de Músicas',
      subHeader: subHeader,
      message: message,
      buttons: [
        {text: 'Cancel', role: 'cancel', handler: () => {
          // this.handlerMessage = 'Alert canceled';
        }, },
        {text: 'OK', role: 'confirm', handler:() => { this.excluirMusica()
          // this.handlerMessage = 'Alert confirmed';
        },},
      ]
    });
    await alert.present();
  }
}
