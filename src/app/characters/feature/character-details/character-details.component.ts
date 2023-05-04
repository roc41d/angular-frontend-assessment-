import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import {Location} from '@angular/common';
import { Character } from '../../model/character';
import { GetCharacter } from '../../store/character/character.actions';
import { Observable } from 'rxjs';
import { Movie } from '../../model/movie';
import { GetMovieCollection } from '../../store/movie/movie.actions';
import { GetSpeciesCollection } from '../../store/species/species.actions';
import { Species } from '../../model/species';
import { SpaceShip } from '../../model/space-ship';
import { GetSpaceShipCollection } from '../../store/space-ship/space-ship.actions';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  private store = inject(Store);
  private route = inject(ActivatedRoute);
  private _location = inject(Location);

  public character: Character;
  
  @Select((state: any) => state.movies.movieCollection) movies$: Observable<Movie[]>;
  @Select((state: any) => state.species.speciesCollection) species$: Observable<Species[]>;
  @Select((state: any) => state.spaceShips.spaceShipCollection) spaceShips$: Observable<SpaceShip[]>;

  /**
   * Fetch movie collection
   * @param {string[]} movieUrls: string array of movies url
   */
    private getMoview(movieUrls: string[]): void {
      if(movieUrls.length === 0) {
        this.store.dispatch(new GetMovieCollection([]));
        return;
      }
  
    this.store.dispatch(new GetMovieCollection(movieUrls));
  }

  /**
   * Fetch species collection
   * @param {string[]} specyUrls: string array of species url
   */
  private getSpecies(specyUrls: string[]): void {
    if(specyUrls.length === 0) {
      this.store.dispatch(new GetSpeciesCollection([]));
      return;
    }

    this.store.dispatch(new GetSpeciesCollection(specyUrls));
  }

  /**
   * Fetch starship collection
   * @param {string[]} starshipUrls: string array of starships url
   */
    private getSpaceShips(starshipUrls: string[]): void {
      if(starshipUrls.length === 0) {
        this.store.dispatch(new GetSpaceShipCollection([]));
        return;
      }
  
      this.store.dispatch(new GetSpaceShipCollection(starshipUrls));
    }

  ngOnInit(): void {
    const characterId = this.route.snapshot.params['id'];

    this.store.dispatch(new GetCharacter(characterId)).subscribe(() => {
      this.character = this.store.selectSnapshot(state => state.characters.character);

      this.getSpecies(this.character.species);
      this.getMoview(this.character.films);
      this.getSpaceShips(this.character.starships);
    });
  }

  public back(): void {
    this._location.back();
  }
}
