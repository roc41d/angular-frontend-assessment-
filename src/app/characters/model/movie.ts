export interface Movie {
    director: string;
    url: string;
    title: string;
    episode_id: number;
    opening_crawl: string;
    producer: string;
    release_date: string;
    planets: Array<string>;
    characters: Array<string>;
    species: Array<string>;
    starships: Array<string>;
    vehicles: Array<string>;
    created: string;
    edited: string;
}