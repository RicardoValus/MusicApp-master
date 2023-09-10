import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Musica } from 'src/app/model/entities/Musica';
import { MusicaService } from 'src/app/model/services/musica.service';

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

  constructor(private alertController: AlertController,
    private router : Router, private musicaService : MusicaService) { }

  ngOnInit() {
  }

  cadastrar(){
    if(this.nome && this.cantor){
      let novo: Musica = new Musica(this.nome, this.cantor);
      novo.genero = this.genero;
      novo.data = this.data;
      novo.duracao = this.duracao;
      this.musicaService.cadastrar(novo);
      this.router.navigate(["/home"]);
    }else{
      this.presentAlert("Erro", "Nome e Cantor são campos obrigatórios!");
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
