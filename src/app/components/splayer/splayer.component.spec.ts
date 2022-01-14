import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbToast, NgbToastService } from 'ngb-toast';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Hero } from 'src/app/models/hero/hero.model';
import { Match } from 'src/app/models/match/match.model';
import { SPlayer } from 'src/app/models/s-player/splayer.model';
import { OpendotaService } from 'src/app/services/opendota.service';
import { SavePlayerService } from 'src/app/services/save-player.service';
import { StratzService } from 'src/app/services/stratz.service';

import { SplayerComponent } from './splayer.component';

describe('SplayerComponent', () => {
  let component: SplayerComponent;
  let fixture: ComponentFixture<SplayerComponent>;

  let steamid = '66914827';
  
  let hero = new Hero();
  hero.displayName = "Outworld Destroyer";
  hero.id = 76;
  let hero2 = new Hero();
  hero2.id = 11;
  hero2.displayName = "Mars";

  let heroArray = [hero, hero2];

  let match = new Match();
  match.id = 1;
  match.authId = [1,2,3];
  match.durationSeconds = "1";
  match.victory = true;
  match.players = [{isVictory!: true, heroId!: 11, isRadiant!: true}]
  match.firstBloodTime = "1";
  match.gameMode = "1";
  match.largestGoldLead = "1";
  match.largestGoldLeadTeam = "Dire";
  match.largestXpLead = "1";
  match.largestXpLeadTeam = "Radiant";
  match.startTime = "1";
  match.deaths = 11;
  match.radiant_gold_adv = [0, -34, 405, 224];
  match.radiant_xp_adv = [0, 24, 212, 211];
  match.heroes = "Outworld Destroyer";
  match.radiant = true;

  let matchArray = [match];

  let player = new SPlayer();
  player.name = "Ryon";
  player.id = 1;
  player.realName = "Real Ryon";
  player.avatar = "link";
  player.profileUri = "uri";
  player.matchesList = [match];

  let user = {
    name: "Ryon",
    email: "ryon137@gmail.com",
    authId: 'aaa'
  };

  const stratzServiceSpy = jasmine.createSpyObj('StratzService',[
    'getPlayer', 'getPlayerMatches', 'getHero']);
  const getPlayerSpy = stratzServiceSpy.getPlayer.and.returnValue(of(player));
  const getPlayerMatchesSpy = stratzServiceSpy.getPlayerMatches.and.returnValue(of(matchArray));
  const getHeroSpy = stratzServiceSpy.getHero.and.returnValue(of(heroArray));

  const savePlayerServiceSpy = jasmine.createSpyObj('SavePlayerService',[
    'getAllSavedMatches', 'addMatch', 'getSavedPlayerById']);
    const getAllSavedMatchesSpy = savePlayerServiceSpy.getAllSavedMatches.and.returnValue(of(match));
    const addMatchSpy = savePlayerServiceSpy.addMatch.and.returnValue(of(match));
    const getSavedPlayerByIdSpy = savePlayerServiceSpy.getSavedPlayerById.and.returnValue(of(player));

  const opendotaServiceSpy = jasmine.createSpyObj('OpendotaService',['getMatch']);
  const getMatchSpy = opendotaServiceSpy.getMatch.and.returnValue(of(match));

  const auth0Spy = jasmine.createSpyObj('Auth0Service',['getUser']);
  const getUserSpy = auth0Spy.getUser.and.returnValue(of(user));

  const toastSpy = jasmine.createSpyObj('NgbToastService',['remove','show']);
  const removeSpy = toastSpy.remove.and.returnValue(of(new NgbToast));
  const showSpy = toastSpy.show.and.returnValue(of(new NgbToast));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SplayerComponent ],
      imports: [ AppModule ],
      providers: [
        { provide: StratzService, useValue: stratzServiceSpy },
        { provide: SavePlayerService, useValue: savePlayerServiceSpy },
        { provide: OpendotaService, useValue: opendotaServiceSpy },
        { provide: NgbToastService, useValue: toastSpy },
        { provide: steamid, useValue: '66914827' }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SplayerComponent);
    component = fixture.componentInstance;
    component.steamid = steamid;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display the player name when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#playerName');
    expect(headerTag.textContent).toBe(player.name);
  });

  it('should display the player id when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#playerId');
    expect(headerTag.textContent).toBe("Steam ID: " + player.id);
  });

  it('should display the player real name when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#realName');
    expect(headerTag.textContent).toBe("Real Name: " + player.realName);
  });

  it('should display most recent match details when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#recentDetails');
    expect(headerTag.textContent).toBe("Most recent match details:");
  });


  it('should display the match id when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#matchId');
    expect(headerTag.textContent).toBe("The match id was " + match.id + ".");
  });

  it('should display the match duration when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#matchDuration');
    expect(headerTag.textContent).toBe("It lasted " + (match.durationSeconds / 60).toFixed(2) + " minutes.");
  });

  it('should display the hero when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#hero');
    expect(headerTag.textContent).toBe("You played " + hero2.displayName + " .");
  });

  it('should display the radiant played when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#radiant');
    expect(headerTag.textContent).toBe("You were Radiant .");
  });

  it('should display the radiant played when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    match.radiant = false;
    fixture.detectChanges();
    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#dire');
    expect(headerTag.textContent).toBe("You were Dire .");
  });

  it('should display the first blood time when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#firstBloodTime');
    expect(headerTag.textContent).toBe("First blood was achieved at " + (match.firstBloodTime / 60).toFixed(2) + " minutes.");
  });

  it('should display victory when submit button is clicked and steamid is provided and victory is true', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const headerTag = fixture.debugElement.nativeElement.querySelector('#matchVictory');

    expect(headerTag.textContent).toBe("You won. ");
    
  });

  it('should display largest gold lead and corresponding team when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const goldLead = fixture.debugElement.nativeElement.querySelector('#goldLead');

    expect(goldLead.textContent).toBe(" " + match.largestGoldLeadTeam +  " had the highest gold lead of " + match.largestGoldLead + " gold.");
    
  });

  it('should display largest xp lead and corresponding team when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const goldLead = fixture.debugElement.nativeElement.querySelector('#xpLead');

    expect(goldLead.textContent).toBe(" " + match.largestXpLeadTeam +  " had the highest experience lead of " + match.largestXpLead + " experience.");
    
  });

  it('should display the start time when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const headerTag = fixture.debugElement.nativeElement.querySelector('#startTime');
    expect(headerTag.textContent).toBe("The match started on " + match.startTime + ". ");

  });
  
  it('should display the deaths when submit button is clicked and steamid is provided', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const headerTag = fixture.debugElement.nativeElement.querySelector('#deaths');
    expect(headerTag.textContent).toBe("You died " + match.deaths + " times.");

  });

  it('should display the special message when submit button is clicked and steamid is provided and deaths are greater than 10', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    const headerTag = fixture.debugElement.nativeElement.querySelector('#feed');
    expect(headerTag.textContent).toBe("You fed.");
  });

  it('should display logo when no id is provided', ()=>{

    const headerTag = fixture.debugElement.nativeElement.querySelector('#protractor');
    expect(headerTag['src']).toContain('favicon.ico');

  });

  it('should display save button when logged in', ()=>{
    component.isPlayer = true;
    component.data = 'a';
    fixture.detectChanges();
    
    const saveMatch = fixture.debugElement.nativeElement.querySelector('#saveMatchButton');
    expect(saveMatch.textContent).toBe("Save Match");

  });

  it('if onSubmit is called and steamId does not fit the regex, showFailure should be called', ()=>{
    component.onSubmit();
    component.steamid = ' ';
    component.showFailure();
    expect(showSpy).toHaveBeenCalled();
  });

  it('if steamId is the larger format, number should be converted and showConversion should be called', ()=>{
    component.steamid = '76561198066745404';
    component.largeId = 99999999999n;
    component.conversionNum = 76561197960265728n;
    component.onSubmit();
    expect(showSpy).toHaveBeenCalled();
  });

  it('if onSubmit2 is called, expect getSavedPlayerById to be called', ()=>{
    component.onSubmit2();
    expect(getSavedPlayerByIdSpy).toHaveBeenCalled();
  });
  
  it('if onSubmit2 is called, expect addMatch to be called', ()=>{
    component.onSubmit2();
    expect(addMatchSpy).toHaveBeenCalled();
  });
});
