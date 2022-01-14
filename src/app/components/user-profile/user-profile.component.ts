import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { NgbToast, NgbToastService, NgbToastType } from 'ngb-toast';
import { Auth } from 'src/app/models/auth/auth.model';
import { SPlayer } from 'src/app/models/s-player/splayer.model';
import { Auth0Service } from 'src/app/services/auth0.service';
import { SavePlayerService } from 'src/app/services/save-player.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  playerExists = true;
  auth = new Auth();
  playerId = '';
  isPlayer = false;
  player!: SPlayer;
  authId!: any;
  steamId = '';
  regex = /[0-9]{8}$/;
  largeId = 99999999999n;
  conversionNum = 76561197960265728n;
  data!: any;

  constructor(private savePlayerService: SavePlayerService, public authentication: Auth0Service, private toastService: NgbToastService) {
  }
  ngOnInit(): void {
    //**********************************************************/
    // Fetch this user's ID and store it locally
    //**********************************************************/
    this.authentication.getUser().subscribe((data: any) => {
      if(data){
        this.data = data;
      }
      if(this.data.sub) {
        this.authId = this.data.sub.substring(14, 20);
      }
      //**********************************************************/
      // If user has not yet saved their ID, set flag to false
      //**********************************************************/
      this.savePlayerService.getAuth(this.authId).subscribe((object: any) => {
        if (object == null) {
          this.playerExists = false;
        }
        else {
          this.playerId = object.steamId;
          /**********************************************************/
          // Loop through matches, and display all of associated 
          //   player's match data
          //**********************************************************/
          this.savePlayerService.getSavedPlayerById(this.playerId).subscribe((player: SPlayer) => {
            this.player = player;
            this.player.matchesList.reverse();
          });
        }
      });
    });
  }
  onClick() {
    this.isPlayer = true;
  }

  onClick2(){
    this.playerExists = false;
  }

  onSubmit() {
    //**********************************************************/
    // Form validation
    //**********************************************************/
    if (!this.regex.test(this.steamId)) {
      this.showFailure();
      return;
    }
    //**********************************************************/
    // Convert steamId to proper format
    //**********************************************************/
    if (BigInt(this.steamId) > this.largeId) {
      this.steamId = (BigInt(this.steamId) - this.conversionNum).toString();
      this.steamId.slice(0, 7);
      this.showConversion();
    }
    //**********************************************************/
    // Set appropriate values, post them to database, 
    //  then reload page
    //**********************************************************/
    this.auth.steamId = this.steamId;
    this.auth.id = this.authId;
    this.savePlayerService.addAuth(this.auth);
    this.windowReload();
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
  // Remove toast
  //**********************************************************/
  removeToast(toast: NgbToast): void {
    this.toastService.remove(toast);
  }
  //**********************************************************/
  // Reload page
  //**********************************************************/
  windowReload(){
    location.reload();
  }
}

