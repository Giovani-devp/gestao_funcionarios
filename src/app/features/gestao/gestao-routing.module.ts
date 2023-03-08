import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GestaoComponent } from './gestao.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'dashboard',
    pathMatch: 'full',
  },
  {
    path: 'filtros-gerais',
    component: GestaoComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GestaoRoutingModule { }
