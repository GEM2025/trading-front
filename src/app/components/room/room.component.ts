import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SocketWebService } from 'src/app/services/socket-web.service';

@Component({
  selector: 'app-room',
  templateUrl: './room.component.html',
  styleUrls: ['./room.component.css']
})
export class RoomComponent implements OnInit {
  room?: string | null ;
  ServerTime?: Date | null ;
  constructor(private router: ActivatedRoute, private cookieService: CookieService, private socketWebService: SocketWebService) {
    socketWebService.heartbeatCallback.subscribe( serverTime => {
      this.ServerTime = serverTime;
    });
  }

  ngOnInit(): void {
    this.room = this.router.snapshot.paramMap.get('room');
    if(this.room)
    {
      this.cookieService.set('room', this.room);
      localStorage.setItem('room', this.room);
      console.log(`Initiating room ${this.room}`);
    }
    else
    {
      console.log(`Initiating empty room`);
    }
  }


}
