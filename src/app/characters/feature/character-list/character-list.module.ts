import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CharacterListRoutingModule } from './character-list-routing.module';
import { CharacterListComponent } from './character-list.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CharacterListComponent
  ],
  imports: [
    CommonModule,
    CharacterListRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class CharacterListModule { }
