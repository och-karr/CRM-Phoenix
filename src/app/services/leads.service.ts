import { Injectable } from '@angular/core';
import {Observable, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable()
export class LeadsService {
  constructor(private _httpClient: HttpClient) {
  }
  getLeads(): Observable<any> {
    return this._httpClient.get<any>('https://us-central1-courses-auth.cloudfunctions.net/leads').pipe(
      tap(data => console.log(data))
    );
  }

  createLead(data: any): Observable<any> {
    return this._httpClient.post<any>('https://us-central1-courses-auth.cloudfunctions.net/leads', data).pipe(
      tap(data => console.log(data))
    );
  }

  getActivities(): Observable<any> {
    return this._httpClient.get<any>('https://us-central1-courses-auth.cloudfunctions.net/leads/activities').pipe(
      tap(data => console.log(data))
    );
  }
}
