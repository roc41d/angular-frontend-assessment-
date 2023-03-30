
import { Injectable } from "@angular/core";
import { Action, State, StateContext } from "@ngxs/store";
import { GetSpeciesCollection } from "./species.actions";
import { forkJoin, Observable } from 'rxjs';
import { CharacterApiService } from '../../data-access/character-api.service';
import { Species } from "../../model/species";


interface SpeciesStateModel {
    speciesCollection: Species[];
}

@State<SpeciesStateModel>({
    name: 'species',
    defaults: {
        speciesCollection: []
    }
})

@Injectable()
export class SpeciesState {
    constructor(private characterApiService: CharacterApiService) { }

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