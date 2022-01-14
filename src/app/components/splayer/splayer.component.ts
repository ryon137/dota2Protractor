import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Match } from 'src/app/models/match/match.model';
import { SPlayer } from 'src/app/models/s-player/splayer.model';
import { OpendotaService } from 'src/app/services/opendota.service';
import { SavePlayerService } from 'src/app/services/save-player.service';
import { StratzService } from 'src/app/services/stratz.service';
import { NgbToast, NgbToastService, NgbToastType } from 'ngb-toast';
import { Hero } from 'src/app/models/hero/hero.model';
import { Auth0Service } from 'src/app/services/auth0.service';
@Component({
  selector: 'app-splayer',
  templateUrl: './splayer.component.html',
  styleUrls: ['./splayer.component.scss']
})
//***********************************************************************************/
// This class retrieves data from various API's based on given steam ID, and displays.
// It also saves the given match and player.  If a player already exists, it adds the
//    match data to that player
//***********************************************************************************/
export class SplayerComponent implements OnInit {
  splayer = new SPlayer;
  match = new Match;
  match2 = new Match;
  steamid = '';
  isPlayer = false; //flag for displaying logo
  regex = /[0-9]{8}$/;
  largeId = 99999999999n;
  conversionNum = 76561197960265728n;
  hero = new Hero;
  data!: any;

  constructor(private savePlayerService: SavePlayerService, private stratzService: StratzService, private opendotaService: OpendotaService, @Inject(DOCUMENT) public document: Document, public auth: Auth0Service, private toastService: NgbToastService) {
  }

  onSubmit() {
    //**********************************************************/
    // Form validation
    //**********************************************************/
    if (!this.regex.test(this.steamid)) {
      this.showFailure();
      return;
    }
    //**********************************************************/
    // Convert steamId to proper format
    //**********************************************************/
    if (BigInt(this.steamid) > this.largeId) {
      this.steamid = (BigInt(this.steamid) - this.conversionNum).toString();
      this.steamid.slice(0, 7);
      this.showConversion();
    }
    this.isPlayer = true;
    //**********************************************************/
    // Gets player details and stores them in SPlayer model
    //**********************************************************/
    this.stratzService.getPlayer(this.steamid).subscribe((Player: any) => {
      //if player is null, do not show details, and show error toast
      if (Player == null) {
        this.isPlayer = false;
        this.showInvalidIdFailure();
        return;
      }
      this.splayer = Player;
      this.splayer.name = Player.steamAccount.name;
      this.splayer.id = Player.steamAccount.id;
      this.splayer.realName = Player.steamAccount.realName;
      this.splayer.avatar = Player.steamAccount.avatar;
      this.splayer.profileUri = Player.steamAccount.profileUri;
    }),
      //**********************************************************/
      // Gets 10 most recent matches and stores them all in Matches Model
      //**********************************************************/
      this.stratzService.getPlayerMatches(this.steamid).subscribe((match: any) => {
        //add match information to match object
        for (let i = 0; i <= 10; ++i) {
          if (match[i]?.id !== undefined) {
            this.match = match[i];

            //**********************************************************/
            //Start time
            //**********************************************************/

            let a = new Date(match[i]?.startDateTime * 1000);
            let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            let year = a.getFullYear();
            let month = months[a.getMonth()];
            let date = a.getDate();
            let hour = a.getHours();
            let minutes = a.getMinutes();
            let seconds = a.getSeconds();
            let formattedTime = month + ' ' + date + ', ' + year + ' at ' + hour + ':' + minutes + ':' + seconds;
            this.match.startTime = formattedTime;

            //**********************************************************/
            //Hero ID, Victory, and isRadiant
            //**********************************************************/
            this.match.heroes = this.match.players[0].heroId;
            this.match.victory = this.match.players[0].isVictory;
            this.match.radiant = this.match.players[0].isRadiant;

            //**********************************************************/
            // Searches the API for the given hero ID and then stores the hero data
            //**********************************************************/
            this.stratzService.getHero().subscribe((heroes: any) => {
              for (let i = 1; i <= Object.keys(heroes).length; ++i) {
                if (heroes[i]?.id !== undefined) {
                  if (heroes[i]?.id == this.match.heroes) {
                    this.hero.id = heroes[i].id;
                    this.hero.displayName = heroes[i].displayName;
                    this.match.heroes = this.hero.displayName;
                  }
                }
              }
            });

            //**********************************************************/
            // Gets more match data on given match id from OpenDota API
            //**********************************************************/
            this.opendotaService.getMatch(this.match.id).subscribe((match: any) => {
              //**********************************************************/
              //Gold lead
              //**********************************************************/
              let radiantGoldLead = 0;
              let direGoldLead = 0;

              for (let j = 0; j < match?.radiant_gold_adv?.length; ++j) {
                if (match.radiant_gold_adv[j] >= 0 && match.radiant_gold_adv[j] > radiantGoldLead) {
                  radiantGoldLead = match.radiant_gold_adv[j];
                }
                else {
                  if (match.radiant_gold_adv[j] < direGoldLead) {
                    direGoldLead = match.radiant_gold_adv[j];
                  }
                }
              }

              if (Math.abs(radiantGoldLead) > Math.abs(direGoldLead)) {
                this.match.largestGoldLead = Math.abs(radiantGoldLead);
                this.match.largestGoldLeadTeam = "Radiant";
              }
              else {
                this.match.largestGoldLead = Math.abs(direGoldLead);
                this.match.largestGoldLeadTeam = "Dire";
              }

              //**********************************************************/
              //XP lead 
              //**********************************************************/
              let radiantXpLead = 0;
              let direXpLead = 0;

              for (let j = 0; j < match?.radiant_xp_adv?.length; ++j) {
                if (match.radiant_xp_adv[j] > 0) {
                  if (match.radiant_xp_adv[j] > radiantXpLead) {
                    radiantXpLead = match.radiant_xp_adv[j];
                  }
                }
                else {
                  if (match.radiant_xp_adv[j] < direXpLead) {
                    direXpLead = match.radiant_xp_adv[j];
                  }
                }
              }

              if (Math.abs(radiantXpLead) > Math.abs(direXpLead)) {
                this.match.largestXpLead = Math.abs(radiantXpLead);
                this.match.largestXpLeadTeam = "Radiant";
              }
              else {
                this.match.largestXpLead = Math.abs(direXpLead);
                this.match.largestXpLeadTeam = "Dire";
              }
              //**********************************************************/
              //Deaths
              //**********************************************************/
              for (let j = 0;  j < match.players.length; ++j) {
                if(match.players[j].account_id && match.players[j].account_id == this.steamid) {
                  this.match.deaths = match.players[j].deaths;
                }
              }
            });
            break;
            //heroes, kills, deaths, assists, last hits, denies, GPM, EXPM, level, gold, goldspent, hero damage, tower damage, lane, role, items, backpack, hero healing, networth, neutral item

          }
        }

        //initilize values if they dont exist so posting works
        if (this.match.id == undefined) {
          this.match.id = 0;
        }
        if (this.match.durationSeconds == undefined) {
          this.match.durationSeconds = "0";
        }
        if (this.match.victory == undefined) {
          this.match.victory = false;
        }
        if (this.match.firstBloodTime == undefined) {
          this.match.firstBloodTime = "0";
        }
        if (this.match.gameMode == undefined) {
          this.match.gameMode = "0";
        }
        if (this.match.heroes == undefined) {
          this.match.heroes = "0";
        }
        if (this.match.largestGoldLead == undefined) {
          this.match.largestGoldLead = "0";
        }
        if (this.match.largestGoldLeadTeam == undefined) {
          this.match.largestGoldLeadTeam = "0";
        }
        if (this.match.largestXpLead == undefined) {
          this.match.largestXpLead = "0";
        }
        if (this.match.largestXpLeadTeam == undefined) {
          this.match.largestXpLeadTeam = "0";
        }
        if (this.match.startTime == undefined) {
          this.match.startTime = "0";
        }
        if (this.match.deaths == undefined || this.match.deaths == null) {
          this.match.deaths = 0;
        }

        //**********************************************************/
        // Store authentication ID in model for future reference
        //**********************************************************/
        this.auth.getUser().subscribe((data: any) => {
          //to check if user exists
          this.data = data;
          if (this.match.authId == null) {
            this.match.authId = [];
          }
          if (data) {
            this.match.authId.push(data.sub.substring(14, 20));
          }
        })
      });


  }
  //**********************************************************/
  // Saves match and player to database
  //**********************************************************/
  onSubmit2() {
    let matchFound = false;

    this.savePlayerService.getSavedPlayerById(this.steamid).subscribe((player: any) => {
      this.splayer.matchesList = player?.matchesList;
      //intilize match list if not already created
      if (this.splayer.matchesList == null) {
        this.splayer.matchesList = [];
      }
      //if the id is in the match array, set match found to true
      //CURRENT BUG: If the match id is the same, a different players match
      // will overwrite current match
      //
      //SOLUTION: make it so that if the match id already exists,
      // create a new instance 
      //
      for (let i = 0; i < Object.keys(this.splayer.matchesList).length; ++i) {
        if (this.splayer.matchesList[i].id == this.match.id) {
          matchFound = true;
        }
      }
      //add match to match array if match was not found in match array
      if (matchFound == false) {
        this.splayer.matchesList.push(this.match);
      }
      this.savePlayerService.addMatch(this.match, this.splayer);
    });
  }
  //**********************************************************/
  // Toast for id being too small
  //**********************************************************/
  showFailure(): void {
    const toast: NgbToast = {
      toastType: NgbToastType.Danger,
      text: "ID must be at least 8 digits",
      dismissible: true,
      timeInSeconds: 5,
      onDismiss: () => {
        console.log("Toast dismissed!!");
      }
    }
    this.toastService.show(toast);
  }
  //**********************************************************/
  // Toast for player not existing
  //**********************************************************/
  showInvalidIdFailure(): void {
    const toast: NgbToast = {
      toastType: NgbToastType.Danger,
      text: "Either user does not exist, or their profile is hidden",
      dismissible: true,
      timeInSeconds: 5,
      onDismiss: () => {
        console.log("Toast dismissed!!");
      }
    }
    this.toastService.show(toast);
  }
  //**********************************************************/
  // Toast for id conversion
  //**********************************************************/
  showConversion(): void {
    const toast: NgbToast = {
      toastType: NgbToastType.Info,
      text: "ID converted to correct format",
      dismissible: true,
      timeInSeconds: 5,
      onDismiss: () => {
        console.log("Toast dismissed!!");
      }
    }
    this.toastService.show(toast);
  }
  //**********************************************************/
  // Remove toast
  //**********************************************************/
  removeToast(toast: NgbToast): void {
    this.toastService.remove(toast);
  }

  ngOnInit(): void {

  }
}
//
// TEST ID's
// 83177429
// 64819449
// 132407154
// 76561198066745404
//