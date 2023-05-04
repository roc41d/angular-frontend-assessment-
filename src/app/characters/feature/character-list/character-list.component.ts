import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { Character } from '../../model/character';
import { CharacterResponse } from '../../model/character-response';
import { Movie } from '../../model/movie';
import { Species } from '../../model/species';
import { GetCharacters, LoadMoreCharacters } from '../../store/character/character.actions';
import { GetMovies } from '../../store/movie/movie.actions';
import { GetSpecies } from '../../store/species/species.actions';
import { CustomValidation } from '../../utils/customValidation';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  providers: [CustomValidation]
})
export class CharacterListComponent implements OnInit {
  private store = inject(Store);
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private customValidator = inject(CustomValidation);

  @Select((state: any) => state.movies.movies) movies$: Observable<Movie[]>;
  @Select((state: any) => state.species.species) species$: Observable<Species[]>;

  public characters: CharacterResponse;
  public filterForm: FormGroup;

  public loadMoreBtn: boolean = false;
  public filterBtn: boolean = false;
  public resetBtn: boolean = false;

  /**
   * Get character id from url
   * @param {string} url: character url
   * @returns {string}: character id
   * */
  private getCharacterIdFromUrl(url: string): string {
    const urlArr = url.split("/");

    return urlArr[urlArr.length - 2];
  }

  private initFilterItems(): void {
    this.store.dispatch(new GetSpecies());
    this.store.dispatch(new GetMovies());

    this.filterForm = this.fb.group({
      movie: [''],
      species: [''],
      minyear: ['', this.customValidator.yearInputPatternValidator()],
      maxyear: ['', this.customValidator.yearInputPatternValidator()]
    });
  }

  /**
   * Filter character by property
   * @param {Character[]} characters: character array
   * @param {string} property: property name
   * @param {string} value: property value
   * @returns {Character[]}: filtered character array
   * */
  private filterCharacterByProperty(characters: Character[], property: string, value: string): Character[] {
    return characters.filter((character: Character) => {
      return character[property as keyof Character].includes(value);
    })
  }

  /**
   * Apply filter on character list
   * @param {FormGroup} form: filter form
   * @param {CharacterResponse} characters: character response
   * @returns {CharacterResponse}: filtered character response
   * */
  private applyFilters(form: FormGroup, characters: CharacterResponse): CharacterResponse {

    // fileter by movie
    if (form.value.movie) {
      characters.results = this.filterCharacterByProperty(characters.results, 'films', form.value.movie);
    }
    // filter by species
    if (form.value.species) {
      characters.results = this.filterCharacterByProperty(characters.results, 'species', form.value.species);
    }

    /**
     * I didn't find relevant materials on how to handle Star War characters birth_year, so did the filtering using only the number part of the string.
     * For example, if birth_year is "40.8BBY", then the number part is 40.8.
     * I am not sure if this is the right way to handle it. I am open to suggestions to make it better.
     */
    // filter by year
    if (form.value.minyear && form.value.maxyear) {
      const yearFrom = this.extractNumberPart(form.value.minyear);
      const yearTo = this.extractNumberPart(form.value.maxyear);

      characters.results = characters.results.filter((character: Character) => {
        const birthYear = this.extractNumberPart(character.birth_year);

        return birthYear > yearFrom && birthYear < yearTo;
      });
    }
    return characters;
  }

  private isYearFilterValid(): boolean {
    return this.filterFormControl.minyear.valid && this.filterFormControl.maxyear.valid;
  }

  private extractNumberPart(birthYear: string): number {
    const match = birthYear.match(/(\d+(\.\d+)?)/);

    return match ? parseFloat(match[0]) : 0;
  }

  get filterFormControl(): any {
    return this.filterForm.controls;
  }

  ngOnInit(): void {
    this.initFilterItems();

    this.store.dispatch(new GetCharacters()).subscribe(() => {
      this.characters = this.store.selectSnapshot(state => state.characters.characters);
    });
    
  }

 public loadMore() {
    this.loadMoreBtn = true;
    this.store.dispatch(new LoadMoreCharacters(this.characters.next)).subscribe(() => {
      this.characters = this.store.selectSnapshot(state => state.characters.characters);
      this.characters = this.applyFilters(this.filterForm, this.characters);
      this.loadMoreBtn = false;
    });
  }

  public onCharacterSelect(character: Character): void {
    const characterId = this.getCharacterIdFromUrl(character.url)
    this.router.navigate(['characters', characterId]);
  }

  public onSubmit(form: FormGroup): void {
    if (!this.isYearFilterValid()) {
      return;
    }

    this.filterBtn = true;
    
    this.characters = this.applyFilters(form, this.characters);
    this.filterBtn = false;
  }

  public resetFilter(): void {
    this.resetBtn = true;
    this.store.dispatch(new GetCharacters()).subscribe(() => {
      this.characters = this.store.selectSnapshot(state => state.characters.characters);

      this.filterForm.setValue({movie: '', species: '', minyear: '', maxyear: ''});
      this.resetBtn = false;
    });
  }
}
