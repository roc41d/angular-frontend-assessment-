import { Movie } from './movie';

export interface MovieResponse {
    count: number;
    next: string;
    previous: string;
    results: Movie[];
}