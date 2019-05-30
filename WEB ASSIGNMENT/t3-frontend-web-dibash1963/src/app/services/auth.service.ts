import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: any) {
        return this.http.post('http://localhost:3005/v1/users', user);
  }

  login(username: string, password: string) {
        return this.http.post<any>('http://localhost:3005/v1/auth', { username: username, password: password })
            .pipe(map(user => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }


}
