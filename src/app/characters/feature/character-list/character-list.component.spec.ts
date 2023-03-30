import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { Character } from '../../model/character';
import { GetCharacters } from '../../store/character/character.actions';

import { CharacterListComponent } from './character-list.component';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let store: Store;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterListComponent ],
      providers: [
        { provide: Store, useValue: { dispatch: jest.fn().mockReturnValue(of(true)), selectSnapshot: jest.fn(), select: jest.fn()} },
        { provide: Router, useValue: { navigate: jest.fn() } }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    router = TestBed.inject(Router);
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
});
