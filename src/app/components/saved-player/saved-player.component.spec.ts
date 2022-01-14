import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { AppModule } from 'src/app/app.module';
import { Match } from 'src/app/models/match/match.model';
import { SavePlayerService } from 'src/app/services/save-player.service';

import { SavedPlayerComponent } from './saved-player.component';

describe('SavedPlayerComponent', () => {
  let component: SavedPlayerComponent;
  let fixture: ComponentFixture<SavedPlayerComponent>;

  let match = new Match();
  match.id = 1;
  match.authId = [1];
  match.durationSeconds = "1";
  match.victory = true;
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
  match.heroes = "Mars";
  match.radiant = true;

  let matchArray = [match];

  const savePlayerServiceSpy = jasmine.createSpyObj('SavePlayerService',['getAllSavedMatches']);
  const getAllSavedMatchesSpy = savePlayerServiceSpy.getAllSavedMatches.and.returnValue(of(matchArray));

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SavedPlayerComponent ],
      imports: [ AppModule ],
      providers: [
        { provide: SavePlayerService, useValue: savePlayerServiceSpy }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SavedPlayerComponent);
    component = fixture.componentInstance;
    component.authId = 1;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should display All saved Matches', ()=>{    
    const headerTag = fixture.debugElement.nativeElement.querySelector('#userDetails');
    expect(headerTag.textContent).toBe("All Saved Matches");
  });

  it('should display all match ids', ()=>{
    const pTag = fixture.debugElement.nativeElement.querySelector('#matchLabel');
    expect(pTag.textContent).toBe("Match " + match.id);
  });

  it('should display all match heroes', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();
    
    const pTag = fixture.debugElement.nativeElement.querySelector('#hero');
    expect(pTag.textContent).toBe("You played " + match.heroes+" .");
  });

  it('should display all match start times', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const pTag = fixture.debugElement.nativeElement.querySelector('#startTime');
    expect(pTag.textContent).toBe("The match started on " + match.startTime +". ");
  });

  it('should display all match duration seconds', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const pTag = fixture.debugElement.nativeElement.querySelector('#matchDuration');
    expect(pTag.textContent).toBe("It lasted " + (match.durationSeconds / 60).toFixed(2) +" minutes.");
  });

  it('should display all match team side if radiant', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const pTag = fixture.debugElement.nativeElement.querySelector('#radiant');
    expect(pTag.textContent).toBe("You were Radiant .");
  });

  it('should display all match team side if dire', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    match.radiant = false;

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const pTag = fixture.debugElement.nativeElement.querySelector('#dire');
    expect(pTag.textContent).toBe("You were Dire .");
  });

  it('should display all match first bloods', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const pTag = fixture.debugElement.nativeElement.querySelector('#firstBloodTime');
    expect(pTag.textContent).toBe("First blood was achieved at " + (match.firstBloodTime / 60).toFixed(2) +" minutes. ");
  });

  it('should display all match victories', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const pTag = fixture.debugElement.nativeElement.querySelector('#matchVictory');
    expect(pTag.textContent).toBe("You won.");
  });

  it('should display all gold leads', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const pTag = fixture.debugElement.nativeElement.querySelector('#goldLead');
    expect(pTag.textContent).toBe(" " + match.largestGoldLeadTeam + " had the highest gold lead of " + match.largestGoldLead + " gold.");
  });

  it('should display all xp leads', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const pTag = fixture.debugElement.nativeElement.querySelector('#xpLead');
    expect(pTag.textContent).toBe(" " + match.largestXpLeadTeam + " had the highest experience lead of " + match.largestXpLead + " experience.");
  });

  it('should display all deaths', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const pTag = fixture.debugElement.nativeElement.querySelector('#deaths');
    expect(pTag.textContent).toBe("You died " + match.deaths + " times.");
  });

  it('should display hidden message if deaths are greater than 10', ()=>{
    const submitButton = fixture.debugElement.nativeElement.querySelector('#submitButton');

    submitButton.dispatchEvent(new Event('click'));
    fixture.detectChanges();

    const pTag = fixture.debugElement.nativeElement.querySelector('#feed');
    expect(pTag.textContent).toBe("You fed.");
  });
});
