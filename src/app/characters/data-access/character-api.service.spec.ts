import { environment } from './../../../environments/environment';
import { TestBed } from '@angular/core/testing';

import { CharacterApiService } from './character-api.service';

describe('CharacterApiService', () => {
  const mockHttpClient = {
    get: jest.fn()
  };

  const characterApiService = new CharacterApiService(mockHttpClient as any);

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call http.get() method with the correct URL for getCharacters()', () => {
    characterApiService.getCharacters();

    expect(mockHttpClient.get).toHaveBeenCalledWith(environment.apiUrl + '/people/');
  });
});
