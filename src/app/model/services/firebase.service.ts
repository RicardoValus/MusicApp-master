import { Inject, Injectable, Injector } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Musica } from '../entities/Musica';
import { finalize } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AutenticacaoService } from './autenticacao.service';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private PATH : string = "musicas";
  user : any;

  constructor(private firestore : AngularFirestore, private storage : AngularFireStorage, @Inject(Injector)private readonly injector: Injector) { 
    
  }

  
 private injectAuthService(){
  return this.injector.get(AutenticacaoService)
 }
  
  buscarTodos(){
    this.user = this.injectAuthService().getUserLogged();
    return this.firestore.collection(this.PATH, ref => ref.where('uid', '==', this.user.uid)).snapshotChanges();
  }


  cadastrar(musica : Musica){
    return this.firestore.collection(this.PATH)
    .add({nome : musica.nome, cantor : musica.cantor, genero : musica.genero,
       data : musica.data, duracao : musica.duracao, downloadURL : musica.downloadURL, uid: musica.uid})
  }

  editar(musica : Musica, id : string){
    return this.firestore.collection(this.PATH).doc(id)
    .update({nome : musica.nome, cantor : musica.cantor, genero : musica.genero,
       data : musica.data, duracao : musica.duracao, downloadURL : musica.downloadURL, uid: musica.uid})
  }
  
  excluir(id : string){
    return this.firestore.collection(this.PATH).doc(id)
    .delete();}

  uploadImage(imagem: any, musica: Musica){
      const file = imagem.item(0);
      if(file.type.split('/')[0] !== 'image'){
        console.error("Tipo não suportado!");
        return;
      }
      const path = `images/${musica.nome}_${file.name}`;
      const fileRef = this.storage.ref(path);
      let task = this.storage.upload(path, file);
      task.snapshotChanges().pipe(
        finalize(() => {let uploadFileURL = fileRef.getDownloadURL(); uploadFileURL.subscribe(resp => {
          musica.downloadURL = resp;
        if(!musica.id){
          this.cadastrar(musica);
        }else{
          this.editar(musica, musica.id);
        }})})).subscribe();
        return task;
    }

  }



