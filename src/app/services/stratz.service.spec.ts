import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { StratzService } from './stratz.service';
import { SPlayer } from '../models/s-player/splayer.model';
import { Hero } from '../models/hero/hero.model';
import { Match } from '../models/match/match.model';

describe('StratzService', () => {
  let httpTestingController: HttpTestingController;
  let service: StratzService;
  let baseUrl = `https://api.stratz.com`;
  let player = new SPlayer();
  let hero = new Hero();
  let match = new Match();

  

  const stratzServiceSpy = jasmine.createSpyObj('StratzService',['getPlayer','getPlayerMatches','getHero','getMatch']);
  const getPlayerSpy = stratzServiceSpy.getPlayer.and.returnValue(player);
  const getPlayerMatchesSpy = stratzServiceSpy.getPlayerMatches.and.returnValue(match);
  const getHeroSpy = stratzServiceSpy.getHero.and.returnValue(hero);
  const getMatchSpy = stratzServiceSpy.getMatch.and.returnValue(match);


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(StratzService);
  });

  afterEach(()=>{
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPlayer should make a GET call to the url', ()=> {
    service.getPlayer(1).subscribe();
    let req = httpTestingController.expectOne(baseUrl+"/api/v1/Player/1");
    expect(req.request.method).toEqual("GET");
 });

 it('getPlayerMatches should make a GET call to the url', ()=> {
  service.getPlayerMatches(1).subscribe();
  let req = httpTestingController.expectOne(baseUrl+"/api/v1/Player/1/matches");
  expect(req.request.method).toEqual("GET");
});

it('getHero should make a GET call to the url', ()=> {
  service.getHero().subscribe();
  let req = httpTestingController.expectOne(baseUrl+"/api/v1/Hero");
  expect(req.request.method).toEqual("GET");
});

it('getMatch should make a GET call to the url', ()=> {
  service.getMatch(1).subscribe();
  let req = httpTestingController.expectOne(baseUrl+"/api/v1/Match/1");
  expect(req.request.method).toEqual("GET");
});

 
});
