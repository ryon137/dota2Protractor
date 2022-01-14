import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixtureAutoDetect, TestBed } from '@angular/core/testing';
import { NgbToast, NgbToastService } from 'ngb-toast';
import { of } from 'rxjs';
import { Auth } from '../models/auth/auth.model';
import { Match } from '../models/match/match.model';
import { SPlayer } from '../models/s-player/splayer.model';

import { SavePlayerService } from './save-player.service';

describe('SavePlayerService', () => {
  let httpTestingController: HttpTestingController;
  let service: SavePlayerService;
  let player = new SPlayer();
  let match = new Match();
  let auth = new Auth();
  let baseUrl = 'https://ryon.ee-cognizantacademy.com'

  const toastServiceSpy = jasmine.createSpyObj('toastService', ['pop','remove', 'show']);
  const removeSpy = toastServiceSpy.remove.and.returnValue(of(new NgbToast));
  const showSpy = toastServiceSpy.show.and.returnValue(of(new NgbToast));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        { provide: NgbToastService, useValue: toastServiceSpy}
      ]
    });
    httpTestingController = TestBed.get(HttpTestingController);
    service = TestBed.inject(SavePlayerService);
  });

  afterEach(()=>{
    httpTestingController.verify();
  })

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('addPlayer should make a POST call to the url', ()=>{
    let didAdd = service.addPlayer(player);
    let req = httpTestingController.expectOne(baseUrl+"/player");
    expect(req.request.method).toEqual("POST");
    expect(didAdd).toBe(true);
  });

  it('updatePlayer should make a PUT call to the url', ()=>{
    let didAdd = service.updatePlayer(player);
    let req = httpTestingController.expectOne(baseUrl+"/player");
    expect(req.request.method).toEqual("PUT");
    expect(didAdd).toBe(true);
  });

  it('deletePlayer should make a DELETE call to the url', ()=>{
    let didAdd = service.deletePlayer(player);
    let req = httpTestingController.expectOne(baseUrl+"/player/");
    expect(req.request.method).toEqual("DELETE");
    expect(didAdd).toBe(true);
  });

  it('addMatch should make a POST call to the url', ()=>{
    let didAdd = service.addMatch(match,player);
    let req = httpTestingController.expectOne(baseUrl+"/match");
    expect(req.request.method).toEqual("POST");
    expect(didAdd).toBe(true);
  });

  it('updateMatch should make a PUT call to the url', ()=>{
    let didAdd = service.updateMatch(match,player);
    let req = httpTestingController.expectOne(baseUrl+"/match");
    expect(req.request.method).toEqual("PUT");
    expect(didAdd).toBe(true);
  });

  it('deleteMatch should make a DELETE call to the url', ()=>{
    let didAdd = service.deleteMatch(match);
    let req = httpTestingController.expectOne(baseUrl+"/match/");
    expect(req.request.method).toEqual("DELETE");
    expect(didAdd).toBe(true);
  });

  it('getAllSavedPlayers should make a GET call to the url', ()=>{
    service.getAllSavedPlayers().subscribe();
    let req = httpTestingController.expectOne(baseUrl+"/players");
    expect(req.request.method).toEqual("GET");
  });

  it('getSavedPlayerById should make a GET call to the url', ()=>{
    service.getSavedPlayerById(1).subscribe();
    let req = httpTestingController.expectOne(baseUrl+"/player/id/1");
    expect(req.request.method).toEqual("GET");
  });

  it('getSavedPlayerByName should make a GET call to the url', ()=>{
    service.getSavedPlayerByName("Ryon").subscribe();
    let req = httpTestingController.expectOne(baseUrl+"/player/name/Ryon");
    expect(req.request.method).toEqual("GET");
  });

  it('getSavedMatch should make a GET call to the url', ()=>{
    service.getSavedMatch(1).subscribe();
    let req = httpTestingController.expectOne(baseUrl+"/match/id/1");
    expect(req.request.method).toEqual("GET");
  });

  it('getAllSavedMatches should make a GET call to the url', ()=>{
    service.getAllSavedMatches().subscribe();
    let req = httpTestingController.expectOne(baseUrl+"/matches");
    expect(req.request.method).toEqual("GET");
  });

  it('addAuth should make a POST call to the url', ()=>{
    let didAdd = service.addAuth(auth);
    let req = httpTestingController.expectOne(baseUrl+"/auth");
    expect(req.request.method).toEqual("POST");
    expect(didAdd).toBe(true);
  });

  it('getAuth should make a GET call to the url', ()=>{
    service.getAuth(1).subscribe();
    let req = httpTestingController.expectOne(baseUrl+"/auth/id/1");
    expect(req.request.method).toEqual("GET");
  });

  it('showMatchAddSuccess should execute toast show', ()=>{
    service.showMatchAddSuccess();
    expect(showSpy).toHaveBeenCalled();
  });

  it('showPlayerAddSuccess should execute toast show', ()=>{
    service.showPlayerAddSuccess();
    expect(showSpy).toHaveBeenCalled();
  });

  it('showFailure should execute toast show', ()=>{
    service.showFailure();
    expect(showSpy).toHaveBeenCalled();
  });

  it('removeToast should execute toast remove', ()=>{
    service.removeToast(new NgbToast);
    expect(removeSpy).toHaveBeenCalled();
  });

});
