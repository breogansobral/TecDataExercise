import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { SuperHerosService } from './super-heros.service';
import { Hero } from '../models/hero';

describe('SuperHerosService', () => {
  let service: SuperHerosService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [SuperHerosService]
    });

    service = TestBed.inject(SuperHerosService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should find a superhero by ID', () => {
    const dummyHeroes: Hero[] = [{ id: 1, name: 'Superman', element: 'Air', color: 'Blue', age: 30, place: 'Metropolis', img: 'url', powers: [] }];

    service.getSuperheroById(1).subscribe(hero => {
      expect(hero).toEqual(dummyHeroes.find(h => h.id === 1));
    });

    const req = httpMock.expectOne(`${service.API_URL}superheros`);
    expect(req.request.method).toBe('GET');
    req.flush(dummyHeroes);
  });

  it('should add a new superhero', () => {
    const newHero: Hero = { id: 3, name: 'Wonder Woman', element: 'Truth', color: 'Red', age: 28, place: 'Themyscira', img: 'url', powers: [] };

    service.addSuperhero(newHero).subscribe(hero => {
      expect(hero).toEqual(newHero);
    });

    const req = httpMock.expectOne(`${service.API_URL}superheros`);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newHero);
    req.flush(newHero);
  });

  it('should delete a superhero', () => {
    service.deleteSuperhero(1).subscribe(response => {
      expect(response).toEqual({});
    });

    const req = httpMock.expectOne(`${service.API_URL}superheros/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });

  it('should update a superhero', () => {
    const updatedHero: Hero = { id: 1, name: 'Superman', element: 'Air', color: 'Blue', age: 31, place: 'Metropolis', img: 'url', powers: [] };

    service.updateSuperhero(updatedHero.id, updatedHero).subscribe(hero => {
      expect(hero).toEqual(updatedHero);
    });

    const req = httpMock.expectOne(`${service.API_URL}superheros/1`);
    expect(req.request.method).toBe('PATCH');
    req.flush(updatedHero);
  });


});
