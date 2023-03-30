import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterResponse } from '../model/character-response';
import { Character } from '../model/character';
import { MovieResponse } from '../model/movie-response';
import { SpeciesResponse } from '../model/species-response';

@Injectable({
  providedIn: 'root'
})
export class CharacterApiService {

  private peopleUrl = environment.apiUrl + '/people/';
  private moviesUrl = environment.apiUrl + '/films/';
  private speciesUrl = environment.apiUrl + '/species/';
  
  constructor(private http: HttpClient) {}

  public getCharacters(): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(this.peopleUrl);
  }

  public get(url: string): Observable<any> {
    return this.http.get<any>(url);
  }

  public getCharacter(id: string): Observable<Character> {
    return this.http.get<Character>(`${this.peopleUrl}${id}`);
  }

  public getMovies(): Observable<MovieResponse> {
    return this.http.get<MovieResponse>(`${this.moviesUrl}`);
  }

  public getSpecies(): Observable<SpeciesResponse> {
    return this.http.get<SpeciesResponse>(`${this.speciesUrl}`);
  }
}
