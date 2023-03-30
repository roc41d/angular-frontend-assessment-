import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { of } from 'rxjs';
import { GetCharacter } from '../../store/character/character.actions';

import { CharacterDetailsComponent } from './character-details.component';

describe('CharacterDetailsComponent', () => {
  let component: CharacterDetailsComponent;
  let fixture: ComponentFixture<CharacterDetailsComponent>;
  let store: Store;
  let route: ActivatedRoute;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CharacterDetailsComponent ],
      providers: [
        { provide: Store, useValue: { dispatch: jest.fn().mockReturnValue(of(true)), selectSnapshot: jest.fn()} },
        { provide: ActivatedRoute, useValue: { snapshot: { params: { id: '1' } } } }
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CharacterDetailsComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(Store);
    route = TestBed.inject(ActivatedRoute);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch character data', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const characterId = route.snapshot.params['id'];

    component.ngOnInit();
    expect(dispatchSpy).toHaveBeenCalledWith(new GetCharacter(characterId));
  });
});
