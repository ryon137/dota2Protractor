import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NgbToast, NgbToastService, NgbToastType } from 'ngb-toast';
import { Observable, of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Auth } from 'src/app/models/auth/auth.model';
import { Match } from 'src/app/models/match/match.model';
import { SPlayer } from 'src/app/models/s-player/splayer.model';
import { Auth0Service } from 'src/app/services/auth0.service';
import { SavePlayerService } from 'src/app/services/save-player.service';

import { UserProfileComponent } from './user-profile.component';

describe('UserProfileComponent', () => {
  let component: UserProfileComponent;
  let fixture: ComponentFixture<UserProfileComponent>;

  let steamId = '66914827';

  let player = new SPlayer();
  let auth = null;

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

  player.name = "Ryon";
  player.id = 1;
  player.realName = "Real Ryon";
  player.avatar = "link";
  player.profileUri = "uri";
  player.matchesList = [match];

  let user = {
    name: "Ryon",
    email: "ryon137@gmail.com",
    sub: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
  };



  const savePlayerServiceSpy = jasmine.createSpyObj('SavePlayerService',[
    'getSavedPlayerById', 'getAuth', 'addAuth'
  ]);
  const getSavedPlayerByIdSpy = savePlayerServiceSpy.getSavedPlayerById.and.returnValue(of(player));
  const getAuthSpy = savePlayerServiceSpy.getAuth.and.returnValue(of(auth));
  const addAuthSpy = savePlayerServiceSpy.addAuth.and.returnValue(of(auth));

  const auth0Spy = jasmine.createSpyObj('Auth0Service',['getUser']);
  const getUserSpy = auth0Spy.getUser.and.returnValue(of(user));


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserProfileComponent ],
      providers: [
        { provide: SavePlayerService, useValue: savePlayerServiceSpy },
        { provide: Auth0Service, useValue: auth0Spy }
      ],
      imports: [ AppModule ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserProfileComponent);
    component = fixture.componentInstance;
    component.steamId = steamId;
    component.windowReload = function() {};
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('if getAuth returns null, then player does not exist', ()=>{
    expect(component.playerExists).toBeFalse();
  });

});

