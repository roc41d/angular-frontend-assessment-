import { Character } from "./character";

export interface CharacterResponse {
    count: number;
    next: string;
    previous: string;
    results: Character[];
}