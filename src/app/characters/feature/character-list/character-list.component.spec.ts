import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { GetCharacters } from '../../store/character/character.actions';

import { CharacterListComponent } from './character-list.component';

describe('CharacterListComponent', () => {
  let component: CharacterListComponent;
  let fixture: ComponentFixture<CharacterListComponent>;
  let store: Store;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterListComponent ],
      providers: [
        { provide: Store, useValue: { dispatch: jest.fn().mockReturnValue(of(true)), selectSnapshot: jest.fn(), select: jest.fn()} }
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterListComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
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
});
