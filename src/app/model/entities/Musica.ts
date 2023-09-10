export class Musica{
    private _nome: string;
    private _cantor: string;
    private _genero!: number;
    private _data!: number;
    private _duracao!: string;
   
    constructor(nome : string, cantor: string){
     this._nome = nome;
     this._cantor = cantor;
    }
   
    public get nome() : string{
     return this._nome;
    }
   
    public set nome(nome: string){
     this._nome = nome;
    }
   
    public get cantor() : string{
     return this._cantor;
    }
   
    public set cantor(cantor: string){
     this._cantor = cantor;
    }
   
    public get genero(): number {
      return this._genero;
    }
    public set genero(value: number) {
      this._genero = value;
    }
    
    public get data(): number {
     return this._data;
   }
   public set data(value: number) {
     this._data = value;
   }

   public get duracao() : string{
     return this._duracao;
   }
  
   public set duracao(duracao: string){
     this._duracao = duracao;
   }
}