import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxsModule, Store } from '@ngxs/store';
import { of } from 'rxjs';
import { Character } from '../../model/character';
import { CharacterResponse } from '../../model/character-response';
import { GetCharacters } from '../../store/character/character.actions';
import { CustomValidation } from '../../utils/customValidation';

import { CharacterListComponent } from './character-list.component';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let store: Store;
  let router: Router;
  const formBuilder: FormBuilder = new FormBuilder();
  let customValidator: CustomValidation;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, NgxsModule.forRoot([])],
      declarations: [ CharacterListComponent ],
      providers: [
        { provide: Store, useValue: { dispatch: jest.fn().mockReturnValue(of(true)), selectSnapshot: jest.fn(), select: jest.fn()} },
        { provide: Router, useValue: { navigate: jest.fn() } },
        { provide: FormBuilder, useValue: formBuilder },
        CustomValidation
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
    customValidator = TestBed.inject(CustomValidation);
    component.filterForm = formBuilder.group({
      movie: [''],
      species: [''],
      minyear: ['', customValidator.yearInputPatternValidator()],
      maxyear: ['', customValidator.yearInputPatternValidator()]
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch characters, species and movies', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(new GetCharacters());
  });

  it('should navigate to character detail page with the correct character id', () => {
    const character = { url: 'https://swapi.dev/api/people/1/' } as Character;
    const navigateSpy = jest.spyOn(router, 'navigate');

    component.onCharacterSelect(character);

    expect(navigateSpy).toHaveBeenCalledWith(['characters', '1']);
  });

  describe('applyFilters', () => {
    const characterResponse = {
      results: [
        { name: 'Luke Skywalker', birth_year: '19BBY', species: ['https://swapi.dev/api/species/1/'], films: ['https://swapi.dev/api/films/1/'] },
        { name: 'Darth Vader', birth_year: '41.9BBY', species: ['https://swapi.dev/api/species/1/'], films: ['https://swapi.dev/api/films/1/'] },
        { name: 'Yoda', birth_year: '112ABY', species: ['https://swapi.dev/api/species/6/'], films: ['https://swapi.dev/api/films/2/'] }
      ],
      next: 'https://swapi.dev/api/people/?page=2'
    } as CharacterResponse;

    let characterToFilter = {} as CharacterResponse;
    beforeEach(() => {
      characterToFilter = JSON.parse(JSON.stringify(characterResponse)) as CharacterResponse;
    });

    it('should return all characters if no filters are applied', () => {
      const form = component.filterForm;
      form.setValue({ movie: '', species: '', minyear: '', maxyear: '' });

      const filteredCharacters = (component as any).applyFilters(form, characterToFilter);
      
      expect(filteredCharacters.results.length).toEqual(3);
    });

    it('should filter by movie', () => {
      const form = component.filterForm;
      form.setValue({ movie: 'https://swapi.dev/api/films/1/', species: '', minyear: '', maxyear: '' });

      const filteredCharacters = (component as any).applyFilters(form, characterToFilter);

      expect(filteredCharacters.results.length).toEqual(2);
    });

    it('should filter by species', () => {
      const form = component.filterForm;
      form.setValue({ movie: '', species: 'https://swapi.dev/api/species/6/', minyear: '', maxyear: '' });

      const filteredCharacters = (component as any).applyFilters(form, characterToFilter);

      expect(filteredCharacters.results.length).toEqual(1);
    });

    it('should filter by birth year', () => {
      const form = component.filterForm;
      form.setValue({ movie: '', species: '', minyear: '20BBY', maxyear: '149ABY' });

      const filteredCharacters = (component as any).applyFilters(form, characterToFilter);

      expect(filteredCharacters.results.length).toEqual(2);
    });
  });
});
