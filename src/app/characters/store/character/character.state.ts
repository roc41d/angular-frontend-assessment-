import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetCharacters } from './character.actions';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { CharacterResponse } from '../../model/character-response';
import { CharacterApiService } from '../../data-access/character-api.service';

interface CharacterStateModel {
    characters: CharacterResponse;
}

@State<CharacterStateModel>({
    name: 'characters',
    defaults: {
        characters: {
            count: 0,
            next: '',
            previous: '',
            results: []
        }
    }
})

@Injectable()
export class CharacterState {
    constructor(private characterApiService: CharacterApiService) {}

    @Selector()
    static getCharacters(state: CharacterStateModel) {
        return state.characters;
    }

    @Action(GetCharacters)
    getCharacters(ctx: StateContext<CharacterStateModel>) {
        return this.characterApiService.getCharacters().pipe(tap((response: CharacterResponse) => {
            ctx.patchState({
                characters: response
            });
        }));
    }
}