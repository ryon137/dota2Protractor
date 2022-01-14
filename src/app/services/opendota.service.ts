import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SPlayer } from '../models/s-player/splayer.model';

@Injectable({
  providedIn: 'root'
})
//**********************************************************/
// Connects to Open Dota API to retrieve data
//**********************************************************/
export class OpendotaService {

  endpoint: string = `https://api.opendota.com`;
  apiKey = '368d3d7f-1034-483f-8226-e8e5de4f76b9';

  constructor(private http: HttpClient) { }

  getPlayer(id: any): Observable<SPlayer>{
    return this.http.get<any>(`${this.endpoint}/api/players/${id}?api_key=${this.apiKey}`);
  }
  getMatch(id: any): Observable<any>{
    return this.http.get<any>(`${this.endpoint}/api/matches/${id}?api_key=${this.apiKey}`);
  }
}
