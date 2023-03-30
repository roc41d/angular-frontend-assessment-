import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('../character-list/character-list.module').then(
        (m) => m.CharacterListModule
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
