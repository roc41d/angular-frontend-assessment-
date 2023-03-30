import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Character } from '../../model/character';
import { CharacterResponse } from '../../model/character-response';
import { GetCharacters, LoadMoreCharacters } from '../../store/character/character.actions';

@Component({
  selector: 'app-character-list',
  templateUrl: './character-list.component.html',
  styleUrls: ['./character-list.component.scss']
})
export class CharacterListComponent implements OnInit {
  public characters: CharacterResponse;

  public loadMoreBtn: boolean = false;
  constructor(
    private store: Store,
    private router: Router,
  ) { }

  private getCharacterIdFromUrl(url: string): string {
    const urlArr = url.split("/");

    return urlArr[urlArr.length - 2];
  }

  ngOnInit(): void {
    this.store.dispatch(new GetCharacters()).subscribe(() => {
      this.characters = this.store.selectSnapshot(state => state.characters.characters);
    });
    
  }

  loadMore() {
    this.loadMoreBtn = true;
    this.store.dispatch(new LoadMoreCharacters(this.characters.next)).subscribe(() => {
      this.characters = this.store.selectSnapshot(state => state.characters.characters);
      this.loadMoreBtn = false;
    });
  }

  public onCharacterSelect(character: Character): void {
    const characterId = this.getCharacterIdFromUrl(character.url)
    this.router.navigate(['characters', characterId]);
  }
}
