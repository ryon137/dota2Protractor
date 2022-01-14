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

  token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1laWQiOiJodHRwczovL3N0ZWFtY29tbXVuaXR5LmNvbS9vcGVuaWQvaWQvNzY1NjExOTgwNjY3NDU0MDQiLCJ1bmlxdWVfbmFtZSI6Ikl0J3MgTm8gVXNlIiwiU3ViamVjdCI6ImRmY2Y3NDg2LWNhNWUtNGFmMi04ZTgwLTM3MzU2MzQ5YTc5MSIsIlN0ZWFtSWQiOiIxMDY0Nzk2NzYiLCJuYmYiOjE2Mzc1OTg4NTMsImV4cCI6MTY2OTEzNDg1MywiaWF0IjoxNjM3NTk4ODUzLCJpc3MiOiJodHRwczovL2FwaS5zdHJhdHouY29tIn0.d3RSfgc4D1y-NCY19j7xaxkE_c7ExfRkvqLEYJm4VA0";

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
