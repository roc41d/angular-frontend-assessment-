import { State, Action, StateContext, Selector } from '@ngxs/store';
import { Injectable } from '@angular/core';
import { SpaceShip } from '../../model/space-ship';
import { GetSpaceShipCollection } from './space-ship.actions';
import { forkJoin, Observable } from 'rxjs';
import { CharacterApiService } from '../../data-access/character-api.service';

interface SpaceShipStateModel {
    spaceShipCollection: SpaceShip[];
}

@State<SpaceShipStateModel>({
    name: 'spaceShips',
    defaults: {
        spaceShipCollection: []
    }
})

@Injectable()
export class SpaceShipState {
    constructor(private characterApiService: CharacterApiService) { }

    @Selector()
    static getSpaceShipList(state: SpaceShipStateModel) {
        return state.spaceShipCollection;
    }

    @Action(GetSpaceShipCollection)
    getSpaceShipCollection(ctx: StateContext<SpaceShipStateModel>, {spaceShipCollectionUrl}: GetSpaceShipCollection) {
        if (spaceShipCollectionUrl.length === 0) {
            return ctx.patchState({
                spaceShipCollection: []
            });
        } else {
            const requestArr: Observable<Object>[] = []
            spaceShipCollectionUrl.forEach(url => requestArr.push(this.characterApiService.get(url)));

            return forkJoin(requestArr).subscribe((res: any) => {
                ctx.patchState({
                    spaceShipCollection: res
                });
            });
        }
    }
}