
import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { GetSpecies, GetSpeciesCollection } from "./species.actions";
import { forkJoin, Observable, tap } from 'rxjs';
import { CharacterApiService } from '../../data-access/character-api.service';
import { Species } from "../../model/species";
import { SpeciesResponse } from "../../model/species-response";


interface SpeciesStateModel {
    speciesCollection: Species[];
    species: Species[];
}

@State<SpeciesStateModel>({
    name: 'species',
    defaults: {
        speciesCollection: [],
        species: []
    }
})

@Injectable()
export class SpeciesState {
    constructor(private characterApiService: CharacterApiService) { }

    @Selector()
    static getSpeciesList(state: SpeciesStateModel) {
        return state.species;
    }

    @Action(GetSpecies)
    getSpecies(ctx: StateContext<SpeciesStateModel>) {
        return this.characterApiService.getSpecies().pipe(
            tap((result: SpeciesResponse) => {
                ctx.patchState({
                    species: result.results
                });
            })
        );
    }

    @Action(GetSpeciesCollection)
    getSpeciesCollection(ctx: StateContext<SpeciesStateModel>, { speciesCollectionUrl }: GetSpeciesCollection) {
        if (speciesCollectionUrl.length === 0) {
            return ctx.patchState({
                speciesCollection: []
            });
        } else {
            const requestArr: Observable<Object>[] = []
            speciesCollectionUrl.forEach(url => requestArr.push(this.characterApiService.get(url)));

            return forkJoin(requestArr).subscribe((res: any) => {
                ctx.patchState({
                    speciesCollection: res
                });
            });
        }
    }
}