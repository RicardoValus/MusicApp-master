import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Alert } from 'src/app/common/alert';
import { Musica } from 'src/app/model/entities/Musica';
import { AutenticacaoService } from 'src/app/model/services/autenticacao.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-detalhar',
  templateUrl: './detalhar.page.html',
  styleUrls: ['./detalhar.page.scss'],
})
export class DetalharPage implements OnInit {
  detalharForm!: FormGroup;
  user: any;
  musica!: Musica;
  imagem: any;
  edicao: boolean = true;

  constructor(private actRoute : ActivatedRoute,
    private firebase : FirebaseService,
    private alertController : AlertController,
    private router : Router, private alert: Alert, private builder: FormBuilder, private auth: AutenticacaoService){
      this.user = this.auth.getUserLogged();
    }

  ngOnInit() {
    this.musica = history.state.musica;

    this.detalharForm = this.builder.group({
      nome: [this.musica.nome, [Validators.required]],
      cantor: [this.musica.cantor, [Validators.required]],
      genero: [this.musica.genero, [Validators.required]],
      data: [ this.musica.data, [Validators.required]],
      duracao: [this.musica.duracao, [Validators.required]],
      imagem: [null]
    })
  }

  uploadFile(event: any) {
    console.log('uploadFile() chamado');
    this.imagem = event.target.files;
    console.log('this.imagem:', this.imagem);
  }
  
  

  editar(){
    if(this.detalharForm.valid){
      const novo: Musica = {...this.detalharForm.value, uid: this.user.uid, id: this.musica.id, downloadURL: this.musica.downloadURL};
      if(this.imagem){
        this.firebase.uploadImage(this.imagem, novo)?.then(() => {
          this.router.navigate(['/home'])
        });
      }else{
        novo.downloadURL = this.musica.downloadURL;

        this.firebase.editar(novo, this.musica.id).then(() => this.router.navigate(['/home'])).catch((error) => {
          console.log(error);
          this.alert.presentAlert('Erro', 'Erro ao atualizar a música!');
        });
      }
    }else{
      this.alert.presentAlert('Erro', 'Verifique os campos obrigatórios!');
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
    this.alert.presentAlert("Erro", "Erro ao excluir musica!");})
    this.router.navigate(["/home"]);
  }


  async presentAlertConfirm(subHeader: string, message: string){
    const alert = await this.alertController.create({
      header: 'Lista de Músicas',
      subHeader: subHeader,
      message: message,
      buttons: [
        {text: 'Cancel', role: 'cancel', handler: () => {
        }, },
        {text: 'OK', role: 'confirm', handler:() => { this.excluirMusica()
        },},
      ]
    });
    await alert.present();
  }
}
