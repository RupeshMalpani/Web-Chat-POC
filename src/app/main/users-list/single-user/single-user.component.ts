import { Component, OnInit, Input } from '@angular/core';

import { UsersService } from 'src/app/users.service';

@Component({
  selector: 'app-single-user',
  templateUrl: './single-user.component.html',
  styleUrls: ['./single-user.component.css']
})
export class SingleUserComponent implements OnInit {
  @Input() user: any;
  constructor(private userService: UsersService) { }

  ngOnInit() {
  }

  onSelectedUser(id) {
    document.getElementById(id).classList.remove("receivedMessage");
    this.userService.userSelected.emit(this.user);
  }

  getUserShortName(userName) {
    return userName.split(/\s/).reduce((response, word) =>
    response += word.slice(0, 1), '');
  }

}
