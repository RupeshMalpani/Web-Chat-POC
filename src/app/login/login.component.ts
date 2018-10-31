import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import {UsersService} from '../users.service';
declare var QB: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public endpoints:any = 
    {
      "api_endpoint": "https://api.quickblox.com",
      "chat_endpoint": "chat.quickblox.com",
      "turnserver_endpoint": "turnserver.quickblox.com"
  };
  public CREDENTIALS:any = {
    appId: 74341,
    authKey: 'hXPAK3TAtBGNe-N',
    authSecret: 'FWpsuS4sfgXfyKb'
  };
  public user : any = {
    login: '',
    pass: '',
    token : ''
  };
  constructor(
    private router: Router,
    public userService: UsersService
  ) { }

  ngOnInit() {
  }

  onLoginHandler(form: NgForm) {
    const value = form.value;
    QB.init(this.CREDENTIALS.appId, this.CREDENTIALS.authKey, this.CREDENTIALS.authSecret, this.endpoints );
    QB.createSession({login: value.username, password: value.password}, (err, res) => {
      if(res){
        if(res.user_id){
          sessionStorage.setItem('sessionDetails',JSON.stringify(res));
          sessionStorage.setItem('loginDetails',JSON.stringify(value));
          this.user.login = value.username;
          this.user.password = value.password;
          this.user.token = res.token;
          this.router.navigate(['main',this.user.token, res.user_id ]);
        }
      }
    });
  }
  
}
