import { Injectable } from '@angular/core';
import { Musica } from '../entities/Musica';

@Injectable({
  providedIn: 'root'
})
export class MusicaService {
  public listaDeMusicas : Musica[] = [];

  constructor() {}
  
  cadastrar(musica : Musica){
    this.listaDeMusicas.push(musica);
  }

  obterTodos() : Musica[]{
    return this.listaDeMusicas;
  }

  obterPorIndice(indice : number) : Musica{
    return this.listaDeMusicas[indice];
  }

  atualizar(indice : number, novo : Musica){
    this.listaDeMusicas[indice] = novo;
  }

  deletar(indice : number){
    this.listaDeMusicas.splice(indice, 1);
  }
}
