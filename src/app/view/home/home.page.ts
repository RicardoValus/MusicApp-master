import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Musica } from 'src/app/model/entities/Musica';
import { MusicaService } from 'src/app/model/services/musica.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public listaDeMusicas : Musica[] = [];

  constructor(private alertController : AlertController,
    private router : Router, private musicaService : MusicaService) {
      this.listaDeMusicas = this.musicaService.obterTodos();
    }
  
  irParaCadastrar(){
    this.router.navigate(["/cadastrar"]);
  }

  editar(indice : number){
    this.router.navigate(["/detalhar", indice]);
  }

}
