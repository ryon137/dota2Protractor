import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { OpendotaService } from './opendota.service';
import { SPlayer } from '../models/s-player/splayer.model';
import { Match } from '../models/match/match.model';

describe('OpendotaService', () => {
  let httpTestingController: HttpTestingController;
  let service: OpendotaService;
  let baseUrl = 'https://api.opendota.com';
  let player = new SPlayer();
  let match = new Match();
  let apiKey = '368d3d7f-1034-483f-8226-e8e5de4f76b9';

  const opendotaServiceSpy = jasmine.createSpyObj('OpendotaService', ['getPlayer', 'getMatch']);
  const getPlayerSpy = opendotaServiceSpy.getPlayer.and.returnValue(player);
  const getMatchSpy = opendotaServiceSpy.getMatch.and.returnValue(match);

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(OpendotaService);
  });

  afterEach(() => {
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('getPlayer should make a GET call to the url', () => {
    service.getPlayer(1).subscribe();
    let req = httpTestingController.expectOne(baseUrl + "/api/players/1?api_key=" + apiKey);
    expect(req.request.method).toEqual("GET");
  });

  it('getMatch should make a GET call to the url', () => {
    service.getMatch(1).subscribe();
    let req = httpTestingController.expectOne(baseUrl + "/api/matches/1?api_key=" + apiKey);
    expect(req.request.method).toEqual("GET");
  });

});
