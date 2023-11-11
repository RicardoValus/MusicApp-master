import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./view/musica/home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'logar',
    pathMatch: 'full'
  },
  {
    path: 'cadastrar',
    loadChildren: () => import('./view/musica/cadastrar/cadastrar.module').then( m => m.CadastrarPageModule)
  },
  {
    path: 'detalhar',
    loadChildren: () => import('./view/musica/detalhar/detalhar.module').then( m => m.DetalharPageModule)
  },
  {
    path: 'cadastrar-usuario',
    loadChildren: () => import('./view/usuario/cadastrar-usuario/cadastrar-usuario.module').then( m => m.CadastrarUsuarioPageModule)
  },
  {
    path: 'logar',
    loadChildren: () => import('./view/usuario/logar/logar.module').then( m => m.LogarPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }