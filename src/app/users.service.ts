import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of} from 'rxjs';

import { Users } from './users';
import { USERS } from './mock-users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  _session: any;
  _loginDetails : any;
  userSelected = new EventEmitter<any>();
  loggedInUserId = new EventEmitter<any>();
  _notifyObject = new EventEmitter<any>();
  _fetchedChatObj = new EventEmitter<any>();

  constructor(
    private http: HttpClient
  ) { }
  loadSession(value){
    this._session = value;
  }

  getsession(){
      return this._session;
  }
  loadLoginDetails(obj){
    this._loginDetails = obj;
  }
  getLoginDetails(){
    return this._loginDetails;
  }
  loadUsersList(): Observable<Users[]> {
    return of(USERS);
  }

  // Method to get the chat id that we will need for notification purpose say and to send the message to
  // available users
  getChatId(url, token){
    return this.http.get(url,{
      headers: {'QB-Token': token,'content-type':'application/json'}
    })
  }

  // Method for getting the logged in user details
  getLoggedInUserDetails(uname,token){
    return this.http.get("https://api.quickblox.com/users/by_login.json?login="+uname,{
      headers: {'QB-Token': token,'content-type':'application/json'}
    });
  }

  // Method to get the chart date for users
  loadChatHistory(url, token){
    return this.http.get(url,{
      headers: {'QB-Token': token,'content-type':'application/json'}
    })
  }

  // Method to get the list of all userswho logged in to this application on left side panel
  getUsers(token , id){
    return this.http.get("https://api.quickblox.com/users.json?filter[]=number+id+ne+"+id,{
      headers: {'QB-Token': token,'content-type':'application/json'}
    });
  }
}
