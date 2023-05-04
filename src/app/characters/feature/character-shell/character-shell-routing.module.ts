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
    loadComponent: () =>
      import('../character-details/character-details.component').then(
        (c) => c.CharacterDetailsComponent
      ),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CharacterShellRoutingModule { }
