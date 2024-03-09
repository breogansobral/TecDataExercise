import { TestBed } from '@angular/core/testing';

import { SuperHerosService } from './super-heros.service';

describe('SuperHeroesService', () => {
  let service: SuperHerosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SuperHerosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
