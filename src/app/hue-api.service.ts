import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root' // Available app-wide
})
export class HueApiService {
  private bridgeIp = ''; // Replace with your Bridge IP
  private username = ''; // Replace with your username
  private baseUrl = `http://${this.bridgeIp}/api/${this.username}`;
  private groupId = ''; // Replace with your group ID

  constructor(private http: HttpClient) {}

  toggleLight(on: boolean): Observable<any> {
    const body = { on };
    return this.http.put(`${this.baseUrl}/groups/${this.groupId}/action`, body);
  }

  setBrightness(bri: number): Observable<any> {
    const body = { bri, on: true };
    return this.http.put(`${this.baseUrl}/groups/${this.groupId}/action`, body);
  }

  getGroupState(): Observable<any> {
    return this.http.get(`${this.baseUrl}/groups/${this.groupId}`);
  }
}