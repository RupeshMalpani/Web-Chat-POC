import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { UsersService } from '../../users.service';
declare var QB: any;

@Component({
  selector: 'app-user-chat',
  templateUrl: './user-chat.component.html',
  styleUrls: ['./user-chat.component.css']
})
export class UserChatComponent implements OnInit {
  @Input() user: any;
  chatData : any;
  loggedInId : any;

  public endpoints:any = 
  {
    "api_endpoint": "https://api.quickblox.com",
    "chat_endpoint": "chat.quickblox.com",
    "turnserver_endpoint": "turnserver.quickblox.com"
  };
  constructor(
    private route:ActivatedRoute,
    private userService: UsersService
  ) { }

  fetchChartHistory(from, to){
    var url = this.endpoints.api_endpoint + '//chat/Dialog.json?occupants_ids=';
    let token = this.route.snapshot.params.token;
    if(from > to)
      {    
          let occupants = to + "," + from;
          url += occupants;
      }
      else{
          let occupants = from + "," + to;
          url += occupants;
      }
      this.userService.getChatId(url, token)
      .subscribe((data: any) => {
        if(data.items.length > 0){
          let chatdialId = data.items[0]._id;
        let url = this.endpoints.api_endpoint + "/chat/Message.json?chat_dialog_id="+ chatdialId;
        this.userService.loadChatHistory(url,token)
          .subscribe((data: any) => {
            this.chatData = data.items;
          });
        } else {
          this.chatData = [];
        }
      });
  }
  ngOnInit() {
    this.chatData = [];
    let id = this.route.snapshot.params.id;
    this.loggedInId = id;
    this.fetchChartHistory(parseInt(id), this.user.user.id);
    this.userService.userSelected
        .subscribe((user: any) => {
          this.chatData = [];
          this.fetchChartHistory(parseInt(id), user.user.id);
        });
    this.userService._fetchedChatObj
        .subscribe((data: any) => {
          this.chatData.push({'message': data.body});
        }); 
  }

  sendMessage(userId, value) {debugger;
    QB.chat.send(userId, {
      type:'chat',
      body: value.form.value.message,
      extension: {save_to_history: 1}
    });
    this.chatData.push({'message': value.form.value.message,'sender_id': this.loggedInId });
  }
  
}


