import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../character-list/character-list.component').then(
        (c) => c.CharacterListComponent
      ),
  },
  {
    path: ':id',
    loadChildren: () =>
      import('../character-details/character-details.module').then(
        (m) => m.CharacterDetailsModule
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterShellRoutingModule { }
