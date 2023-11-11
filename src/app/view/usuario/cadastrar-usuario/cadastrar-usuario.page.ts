import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Alert } from 'src/app/common/alert';
import { AutenticacaoService } from 'src/app/model/services/autenticacao.service';

@Component({
  selector: 'cadastrar-usuario',
  templateUrl: './cadastrar-usuario.page.html',
  styleUrls: ['./cadastrar-usuario.page.scss'],
})
export class CadastrarUsuarioPage implements OnInit {
  registerForm!: FormGroup;

  constructor(private router: Router, private auth: AutenticacaoService, private alert: Alert, private builder: FormBuilder){
    this.registerForm = new FormGroup({
      email: new FormControl(''),
      password: new FormControl(''),
      confPassword: new FormControl('')
    });
  }

  ngOnInit(){
    this.registerForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confPassword: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
  get errorControl(){
    return this.registerForm.controls;
  }
  submitForm(){
    if(!this.registerForm.valid){
      this.alert.presentAlert("OK", "Erro ao Logar!");
    }else{
      this.register();
    }
 }
  private register(){
    this.auth.register(this.registerForm.value['email'],this.registerForm.value['password'])
    .then((res)=>{
      this.alert.presentAlert("OK", "Seja bem Vindo!");
      this.router.navigate(['/logar']);})
    .catch((error) => {
      this.alert.presentAlert("Erro", "Erro ao cadastrar!");
      console.log(error);
    });
  }
}