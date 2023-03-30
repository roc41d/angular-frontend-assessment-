import { MovieResponse } from './../../model/movie-response';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetMovieCollection } from './movie.actions';
import { Movie } from '../../model/movie';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { CharacterApiService } from '../../data-access/character-api.service';

interface MovieStateModel {
    movieCollection: Movie[];
}

@State<MovieStateModel>({
    name: 'movies',
    defaults: {
        movieCollection: []
    }
})

@Injectable()
export class MovieState {
    constructor(private characterApiService: CharacterApiService) { }

    @Action(GetMovieCollection)
    async getMovieCollection(ctx: StateContext<MovieStateModel>, { movieCollectionUrl }: GetMovieCollection) {
        const requestArr: Observable<Object>[] = []
        movieCollectionUrl.forEach(url => requestArr.push(this.characterApiService.get(url)));

        return forkJoin(requestArr).subscribe((res: any) => {
            ctx.patchState({
                movieCollection: res
            });
        });
    }
}