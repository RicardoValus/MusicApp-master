import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { Alert } from 'src/app/common/alert';
import { Musica } from 'src/app/model/entities/Musica';
import { AutenticacaoService } from 'src/app/model/services/autenticacao.service';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.page.html',
  styleUrls: ['./cadastrar.page.scss'],
})
export class CadastrarPage implements OnInit {
  cadastrarForm!: FormGroup;
  user: any;
  
  constructor(private alertController: AlertController,
    private router : Router, private firebase : FirebaseService, private auth: AutenticacaoService, private builder: FormBuilder, private alert: Alert){
      this.user = this.auth.getUserLogged();
      this.cadastrarForm = new FormGroup({
        nome: new FormControl(''),
        cantor: new FormControl(''),
        genero: new FormControl(''),
        data: new FormControl(''),
        duracao: new FormControl(''),
        imagem: new FormControl('')
      })
    }

  ngOnInit(){
    this.cadastrarForm = this.builder.group({
      nome: ['', [Validators.required]],
      cantor: ['', [Validators.required]],
      genero: ['', [Validators.required]],
      data: ['', [Validators.required]],
      duracao: ['', [Validators.required]],
      imagem: ['', [Validators.required]]
    })
  }

  uploadFile(event : any){
    const imagem = event.target.files;

    if(imagem && imagem.length > 0){
      this.cadastrarForm.patchValue({ imagem: imagem});
    }
  }

  cadastrar(){
    if(this.cadastrarForm.valid){
      const novo: Musica = new Musica(this.cadastrarForm.value.nome, this.cadastrarForm.value.cantor);
      novo.genero = this.cadastrarForm.value.genero;
      novo.data = this.cadastrarForm.value.data;
      novo.duracao = this.cadastrarForm.value.duracao;
      novo.uid = this.user.uid;
      if(this.cadastrarForm.value.imagem){
        this.firebase.uploadImage(this.cadastrarForm.value.imagem, novo)?.then(() =>{
          this.router.navigate(['/home']);
        });
      }else{
        this.firebase.cadastrar(novo).then(() => this.router.navigate(['/home'])).catch((error) =>{
          console.log(error);
          this.alert.presentAlert('Erro', 'Erro ao salvar a musica!');
        });
      }
    }else{
      this.alert.presentAlert('Erro', 'Todos os campos são obrigatórios!')
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
