import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserService {
  constructor(private _httpClient: HttpClient) {
  }

  login(data: any): Observable<any> {
    return this._httpClient.post<any>('https://us-central1-courses-auth.cloudfunctions.net/auth/login', data);
  }
}
