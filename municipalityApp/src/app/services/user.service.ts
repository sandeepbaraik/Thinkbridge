import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = 'http://localhost:3000'
  constructor(
    private http: HttpClient
  ) {
   }

  getUsers(): Observable<any> {
    return this.http.get(this.url+'/users');
  }

  addUsers(data: any): Observable<any> {
    return this.http.post(this.url +'/users', data)
  }

  getTasks(): Observable<any> {
    return this.http.get(this.url +'/workDetails')
  }

  addTasks(data: any): Observable<any> {
    return this.http.post(this.url +'/workDetails', data)
  }

  editTasks(data: any, id:any): Observable<any> {
    return this.http.patch(this.url+ '/workDetails/'+id, data)
  }
}
