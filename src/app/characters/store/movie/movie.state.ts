import { MovieResponse } from './../../model/movie-response';
import { State, Action, StateContext, Selector } from '@ngxs/store';
import { GetMovieCollection, GetMovies } from './movie.actions';
import { Movie } from '../../model/movie';
import { tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { CharacterApiService } from '../../data-access/character-api.service';

interface MovieStateModel {
    movieCollection: Movie[];
    movies: Movie[];
}

@State<MovieStateModel>({
    name: 'movies',
    defaults: {
        movieCollection: [],
        movies: [],
    }
})

@Injectable()
export class MovieState {
    constructor(private characterApiService: CharacterApiService) { }

    @Selector()
    static getMovieList(state: MovieStateModel) {
        return state.movies;
    }

    @Action(GetMovies)
    getMovies(ctx: StateContext<MovieStateModel>) {
        return this.characterApiService.getMovies().pipe(
            tap((result: MovieResponse) => {
                ctx.patchState({
                    movies: result.results
                });
            })
        );
    }

    @Action(GetMovieCollection)
    async getMovieCollection(ctx: StateContext<MovieStateModel>, { movieCollectionUrl }: GetMovieCollection) {
        if (movieCollectionUrl.length === 0) {
            return ctx.patchState({
                movieCollection: []
            });
        } else {
            const requestArr: Observable<Object>[] = []
            movieCollectionUrl.forEach(url => requestArr.push(this.characterApiService.get(url)));

            return forkJoin(requestArr).subscribe((res: any) => {
                ctx.patchState({
                    movieCollection: res
                });
            });
        }
    }
}