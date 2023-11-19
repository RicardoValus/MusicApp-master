import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Musica } from 'src/app/model/entities/Musica';
import { AutenticacaoService } from 'src/app/model/services/autenticacao.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public listaDeMusicas : Musica[] = [];

  constructor(private alertController : AlertController,
    private router : Router, private firebase : FirebaseService, private auth: AutenticacaoService) {
    console.log(this.auth.getUserLogged())
    this.firebase.buscarTodos() 
    .subscribe(res => {
      this.listaDeMusicas = res.map(musica => {
        return{
          id: musica.payload.doc.id,
            ...musica.payload.doc.data() as any
      }as Musica
    })
    })
    }
  
  irParaCadastrar(){
    this.router.navigate(["/cadastrar"]);
  }

  editar(musica : Musica){
    this.router.navigateByUrl("/detalhar", {state : {musica : musica}});
  }

}



