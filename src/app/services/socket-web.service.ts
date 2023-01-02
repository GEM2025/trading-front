import { EventEmitter, Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Socket } from 'ngx-socket-io';

@Injectable({
  providedIn: 'root'
})
export class SocketWebService extends Socket {

  heartbeatCallback: EventEmitter<any> = new EventEmitter();

  constructor(private cookieService: CookieService) {
    super(
      {
        url: 'http://localhost:3002',
        // url: 'http://ec2-100-26-118-4.compute-1.amazonaws.com:3002',
        options: {
          withCredentials: true,
          extraHeaders: {
            authorization: "abcd"
          },
          query:
          {
            nameRoom: cookieService.get('room')
          }
        }
      }
    );
    console.log('Initiating SocketWebService');
    this.listen();

  }

  listen(): void {
    this.ioSocket.on('Heartbeat', (msg: any) => {
      console.log(`Heartbeat`);
      this.heartbeatCallback.emit(msg);
    });

    this.ioSocket.on('Connection', (msg: any) => {
      console.log(`Connection ${msg}`);
    });

    this.ioSocket.on('Disconnect', (msg: any) => {
      console.log(`Disconnect ${msg}`);
    });
  }


}
