import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../models/match/match.model';
import { SPlayer } from '../models/s-player/splayer.model';

import { NgbToast, NgbToastService, NgbToastType } from 'ngb-toast';
import { Auth } from '../models/auth/auth.model';

@Injectable({
  providedIn: 'root'
})
export class SavePlayerService {

  //endpoint: string = 'https://ryon.ee-cognizantacademy.com';
  //endpoint: string = 'http://ryonbackend-env.eba-pbjsc7zw.us-east-2.elasticbeanstalk.com';
  //endpoint: string = 'http://localhost:8000';
  //endpoint: string = 'http://localhost:3306';
  endpoint: string = 'http://protractorbackend-env.eba-3jtcbg8v.us-east-2.elasticbeanstalk.com';

  postHeader =  {
    headers: new HttpHeaders({
      'Content-Type':  'application/json'
    })
  };

  constructor(private http: HttpClient, private toastService: NgbToastService) { }
  addAuth(auth: Auth): boolean{
    this.http.post<Auth>(this.endpoint+"/auth", auth,
     this.postHeader).subscribe(res => {
    }, (err) => {
      console.log(err);
      this.showFailure();
    });
    this.showPlayerAddSuccess();
  return true;
  }

  addPlayer(player: SPlayer): boolean{
    this.http.post<SPlayer>(this.endpoint+"/player", player,
     this.postHeader).subscribe(res => {
    }, (err) => {
      console.log(err);
      this.showFailure();
    });
    this.showPlayerAddSuccess();
  return true;
  }

  updatePlayer(player: SPlayer): boolean{
    this.http.put<SPlayer>(this.endpoint+"/player", player,
     this.postHeader).subscribe(res => {
    }, (err) => {
      console.log(err);
      this.showFailure();
    });
  return true;
  }

  deletePlayer(player: SPlayer): boolean{
    this.http.delete<SPlayer>(this.endpoint+"/player/", player.id)
    .subscribe(res => {
    }, (err) => {
      console.log(err);
      this.showFailure();
    });
  return true;
  }

  addMatch(match: Match, player: SPlayer): boolean{
    this.http.post<Match>(this.endpoint+"/match", match,
     this.postHeader).subscribe(res => {this.addPlayer(player)
    }, (err) => {
      console.log(err);
      this.showFailure();
    });
    this.showMatchAddSuccess();
  return true;
  }

  updateMatch(match: Match, player: SPlayer): boolean{
    this.http.put<Match>(this.endpoint+"/match", match,
     this.postHeader).subscribe(res => {this.updatePlayer(player)
    }, (err) => {
      console.log(err);
      this.showFailure();
    });
  return true;
  }

  deleteMatch(match: Match): boolean{
    this.http.delete<Match>(this.endpoint+"/match/", match.id)
    .subscribe(res => {
    }, (err) => {
      console.log(err);
      this.showFailure();
    });
  return true;
  }

  getAuth(id: any): Observable<Auth>{
    return this.http.get<any>(`${this.endpoint}/auth/id/${id}`);
  }

  getAllSavedPlayers(): Observable<SPlayer>{
    return this.http.get<any>(`${this.endpoint}/players`);
  }

  getSavedPlayerById(id: any): Observable<SPlayer>{
    return this.http.get<any>(`${this.endpoint}/player/id/${id}`);
  }
  getSavedPlayerByName(name: any): Observable<SPlayer>{
    return this.http.get<any>(`${this.endpoint}/player/name/${name}`);
  }

  getSavedMatch(id:any): Observable<Match>{
    return this.http.get<any>(`${this.endpoint}/match/id/${id}`);
  }

  getAllSavedMatches(): Observable<Match>{
    return this.http.get<any>(`${this.endpoint}/matches`);
  }

  showMatchAddSuccess(): void {
		const toast: NgbToast = {
			toastType:  NgbToastType.Success,
			text:  "Match added successfullly",
			dismissible:  true,
      timeInSeconds: 5,
			onDismiss: () => {
				console.log("Toast dismissed!!");
			}
		}
		this.toastService.show(toast);
	}
  showPlayerAddSuccess(): void {
		const toast: NgbToast = {
			toastType:  NgbToastType.Success,
			text:  "Player added successfullly",
			dismissible:  true,
      timeInSeconds: 5,
			onDismiss: () => {
				console.log("Toast dismissed!!");
			}
		}
		this.toastService.show(toast);
	}

  showFailure(): void {
    const toast: NgbToast = {
			toastType:  NgbToastType.Danger,
			text:  "Failure",
			dismissible:  true,
      timeInSeconds: 5,
			onDismiss: () => {
				console.log("Toast dismissed!!");
			}
		}
		this.toastService.show(toast);
  }
	
	removeToast(toast: NgbToast): void {
		this.toastService.remove(toast);
	}

}
