import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CharacterResponse } from '../model/character-response';

@Injectable({
  providedIn: 'root'
})
export class CharacterApiService {

  private peopleUrl = environment.apiUrl + '/people/';
  
  constructor(private http: HttpClient) {}

  public getCharacters(): Observable<CharacterResponse> {
    return this.http.get<CharacterResponse>(this.peopleUrl);
  }
}
