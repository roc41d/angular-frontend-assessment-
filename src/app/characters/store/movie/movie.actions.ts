export class GetMovieCollection {
    static readonly type = '[StarWars] Get Movie Collection';
    constructor(public movieCollectionUrl: string[]) { }
}