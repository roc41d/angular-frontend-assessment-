export class GetMovieCollection {
    static readonly type = '[StarWars] Get Movie Collection';
    constructor(public movieCollectionUrl: string[]) { }
}

export class GetMovies {
    static readonly type = '[StarWars] Get Movies';
}