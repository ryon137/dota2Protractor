import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Match } from '../models/match/match.model';
import { SPlayer } from '../models/s-player/splayer.model';

@Injectable({
  providedIn: 'root'
})
//**********************************************************/
// Connects to Stratz API to retrieve data
//**********************************************************/
export class StratzService {

  endpoint: string = `https://api.stratz.com`;

  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJTdWJqZWN0IjoiZGZjZjc0ODYtY2E1ZS00YWYyLThlODAtMzczNTYzNDlhNzkxIiwiU3RlYW1JZCI6IjEwNjQ3OTY3NiIsIm5iZiI6MTcyNjY2NTI1MSwiZXhwIjoxNzU4MjAxMjUxLCJpYXQiOjE3MjY2NjUyNTEsImlzcyI6Imh0dHBzOi8vYXBpLnN0cmF0ei5jb20ifQ.YsC4tawffQQ2avS0qrihg9bt_tovgAl2hwNLtSnL9pc";

  header =  {
    headers: new HttpHeaders({
      'Authorization' : `Bearer ${this.token}`})
  };

  constructor(private http: HttpClient) {
    
   }
   

  getPlayer(id: any): Observable<SPlayer> {
    return this.http.get<any>(`${this.endpoint}/api/v1/Player/${id}`, this.header);
  }
  getPlayerMatches(id:any): Observable<Match> {
    return this.http.get<any>(`${this.endpoint}/api/v1/Player/${id}/matches`, this.header);
  }
  getHero(): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/api/v1/Hero`, this.header);
  }
  getMatch(id:any): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/api/v1/Match/${id}`, this.header);
  }
}
