export class GetCharacters {
    static readonly type = '[StarWars] Get Characters';
}

export class LoadMoreCharacters {
    static readonly type = '[StarWars] Load More Characters';
    constructor(public nextPageUrl: string) { }
}