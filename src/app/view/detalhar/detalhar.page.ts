import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Musica } from 'src/app/model/entities/Musica';
import { MusicaService } from 'src/app/model/services/musica.service';

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

  constructor(private actRoute : ActivatedRoute,
    private musicaService : MusicaService,
    private alertController : AlertController,
    private router : Router) { }

  ngOnInit() {
    this.actRoute.params.subscribe((parametros) => {
      if(parametros["indice"]){
        this.indice = parametros["indice"];
      }
    })
    this.musica = this.musicaService.obterPorIndice(this.indice);
    this.nome = this.musica.nome;
    this.cantor = this.musica.cantor;
    this.genero = this.musica.genero;
    this.data = this.musica.data;
    this.duracao = this.musica.duracao;
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
      this.musicaService.atualizar(this.indice, novo);
      this.router.navigate(["/home"]);
    }else{
      this.presentAlert("Erro", "Nome e Cantor são campos obrigatórios!");
    }
  }

  excluir(){
    this.musicaService.deletar(this.indice);
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
        {text: 'OK', role: 'confirm', handler:() => {
          // this.handlerMessage = 'Alert confirmed';
        },},
      ]
    });
    await alert.present();
  }
}
