export class GetSpeciesCollection {
    static readonly type = '[StarWars] Get Species Collection';
    constructor(public speciesCollectionUrl: string[]) { }
}

export class GetSpecies {
    static readonly type = '[StarWars] Get Species';
}