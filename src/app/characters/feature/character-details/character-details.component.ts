import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngxs/store';
import { Character } from '../../model/character';
import { GetCharacter } from '../../store/character/character.actions';

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  public character: Character;

  constructor(
    private store: Store,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    const characterId = this.route.snapshot.params['id'];

    this.store.dispatch(new GetCharacter(characterId)).subscribe(() => {
      this.character = this.store.selectSnapshot(state => state.characters.character);
    });
  }
}
