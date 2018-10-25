import { Component, OnInit,Input,ElementRef } from '@angular/core';
import { ActivatedRoute  } from '@angular/router';
import { UsersService } from '../../users.service';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.css']
})
export class UsersListComponent implements OnInit {
  userData : any;
  loggedInUser : any;
  userLoginDetails : any;
  selectedUser : any;
  receivedChatObj : any;
  @Input() users: any;
  constructor(private userService: UsersService,
    private route : ActivatedRoute,
    private elementRef: ElementRef) { }

  ngOnInit() {
    let token = this.route.snapshot.params.token;
    let id = this.route.snapshot.params.id;
    this.userData = JSON.parse(sessionStorage.getItem('sessionDetails'));
    this.userLoginDetails = JSON.parse(sessionStorage.getItem('loginDetails'));
    this.userService._notifyObject
      .subscribe((data) => {
        this.receivedChatObj = data;
        if( this.selectedUser == undefined || this.selectedUser.user.id !== data.from){
          var d = document.getElementById(data.from);
          d.className += " receivedMessage";
        }else{
          this.userService._fetchedChatObj.emit(this.receivedChatObj);
        }
        
      });

    this.userService.getLoggedInUserDetails(this.userLoginDetails.username, token)
      .subscribe((data:any) => {
        this.loggedInUser = data.user;
      });   
      this.userService.userSelected
        .subscribe((user: any) => {
          this.selectedUser = user;
        }); 
  }
}
