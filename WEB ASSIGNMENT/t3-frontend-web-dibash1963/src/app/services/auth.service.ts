import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(user: any) {
        return this.http.post('http://localhost:3006/v1/users', user);
  }
  updateUser(id:number,username:string,password:string){

          return this.http.post('http://localhost:3006/v1/updateUser',{
          username:username,
          password:password,
          id:id
  });
  }

  login(username: string, password: string) {
        return this.http.post<any>('http://localhost:3006/v1/auth', { username: username, password: password })
            .pipe(map(user => {
                if (user) {
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
                return user;
            }));
    }


}
