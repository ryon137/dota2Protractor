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
  match.players = [{isVictory!: true, heroId!: 11}]
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

  let matchArray = [match];

  let player = null;

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

  it('if getPlayer returns null, then player does not exist', ()=>{
    component.onSubmit();
    expect(component.isPlayer).toBeFalse();
  });

});
