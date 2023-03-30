export class GetSpaceShipCollection {
    static readonly type = '[StarWars] Get SpaceShip Collection';
    constructor(public spaceShipCollectionUrl: string[]) { }
}