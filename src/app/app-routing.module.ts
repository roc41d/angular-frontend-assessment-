import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'characters',
    loadChildren: () =>
      import(
        './characters/feature/character-shell/character-shell.module'
      ).then((m) => m.CharacterShellModule),
  },
  {
    path: '',
    redirectTo: 'characters',
    pathMatch: 'full',
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
