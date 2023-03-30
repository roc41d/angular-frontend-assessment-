import { Species } from './species';

export interface SpeciesResponse {
    count: number;
    next: string;
    previous: string;
    results: Species[];
}