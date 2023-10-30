import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Musica } from 'src/app/model/entities/Musica';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  public nome! : string;
  public cantor! : string;
  public genero! : number;
  public data! : number;
  public duracao! : string;
  public imagem! : any;

  constructor(private alertController: AlertController,
    private router : Router, private firebase : FirebaseService) { }

  ngOnInit() {
  }

  uploadFile(imagem : any){
    this.imagem = imagem.files;
  }

  cadastrar(){
    if(this.nome && this.cantor && this.imagem){
      let novo: Musica = new Musica(this.nome, this.cantor);
      novo.genero = this.genero;
      novo.data = this.data;
      novo.duracao = this.duracao;
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo)?.then(() => {this.router.navigate(['/home'])})
      }else{
        this.firebase.cadastrar(novo)
      .then(()=> this.router.navigate(["/home"]))
      .catch((error) => {
        console.log(error)
        this.presentAlert("Erro", "Erro ao salvar musica!");
      })
      }   
    }else{
      this.presentAlert("Erro", "Nome, Cantor e imagem são campos obrigatórios!");
    }
  }

  async presentAlert(subHeader: string, message: string){
    const alert = await this.alertController.create({
      header: 'Playlist',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }
}
