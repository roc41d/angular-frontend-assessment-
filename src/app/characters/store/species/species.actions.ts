export class GetSpeciesCollection {
    static readonly type = '[StarWars] Get Species Collection';
    constructor(public speciesCollectionUrl: string[]) { }
}