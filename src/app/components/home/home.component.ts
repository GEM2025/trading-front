import { Component, OnInit, signal, computed } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { SocketWebService } from 'src/app/services/socket-web.service';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  room?: string | null;
  ServerTime?: Date | null;

  // signals example 1 - https://www.youtube.com/watch?v=d0IjEcRmNL4
  userName = signal('Hector Casavantes');

  // signals example 2 - https://www.youtube.com/watch?v=d0IjEcRmNL4  
  orders = signal([
    { id: 1, side: Math.random() > 0.5 ? 'Buy' : 'Sell', quantity: Math.floor(Math.random() * 100) + 1, price: Math.floor(Math.random() * 1000) + 1000, status: Math.random() > 0.5 },
    { id: 2, side: Math.random() > 0.5 ? 'Buy' : 'Sell', quantity: Math.floor(Math.random() * 100) + 1, price: Math.floor(Math.random() * 1000) + 1000, status: Math.random() > 0.5 },
    { id: 3, side: Math.random() > 0.5 ? 'Buy' : 'Sell', quantity: Math.floor(Math.random() * 100) + 1, price: Math.floor(Math.random() * 1000) + 1000, status: Math.random() > 0.5 },
    { id: 4, side: Math.random() > 0.5 ? 'Buy' : 'Sell', quantity: Math.floor(Math.random() * 100) + 1, price: Math.floor(Math.random() * 1000) + 1000, status: Math.random() > 0.5 },
    { id: 5, side: Math.random() > 0.5 ? 'Buy' : 'Sell', quantity: Math.floor(Math.random() * 100) + 1, price: Math.floor(Math.random() * 1000) + 1000, status: Math.random() > 0.5 }
  ]);

  // with the "computed" method, this will automatically update whenever "tasks" change
  // the power in here is that "urgenTasks" will only be updated when "tasks" change and will update the view only when priority is true
  statusOrders = computed(() =>
    this.orders().filter(task => task.status)
  );

  // compute the volume of all orders irrespective of status
  totalVolume = computed(() =>
    this.orders().reduce((acc, order) => acc + order.quantity, 0)
  );

  // compute the notional of all orders irrespective of status
  totalNotional = computed(() =>
    this.orders().reduce((acc, order) => acc + order.quantity * order.price, 0)
  );

  // compute the volume of orders with status 
  totalStatusVolume = computed(() =>
    this.statusOrders().reduce((acc, order) => acc + order.quantity, 0)
  );

  // compute the notional of orders with status 
  totalStatusNotional = computed(() =>  
    this.statusOrders().reduce((acc, order) => acc + order.quantity * order.price, 0)
  );
  

  // this method is being called from the view to examplify the signal power
  addOrder(status: boolean) {
    this.orders.update(orders => [
      ...orders,
      {
        id: orders.length + 1,
        side: Math.random() > 0.5 ? 'Buy' : 'Sell',
        quantity: Math.floor(Math.random() * 100) + 1,
        price: Math.floor(Math.random() * 1000) + 1000,
        status: status
      }
    ]
    );
  }

  // ------------------------------------------------------------------------------------
  constructor(private router: ActivatedRoute, private cookieService: CookieService, private socketWebService: SocketWebService) {
    socketWebService.heartbeatCallback.subscribe(serverTime => {
      this.ServerTime = serverTime;
    });
    this.userName.update(name => name.toLocaleUpperCase());
    console.log(this.userName())
  }

  // ------------------------------------------------------------------------------------
  ngOnInit(): void {
    this.room = this.router.snapshot.paramMap.get('room') || "home-room";
    if (this.room) {
      this.cookieService.set('room', this.room);
      localStorage.setItem('room', this.room);
      console.log(`Initiating room ${this.room}`);
    }
    else {
      console.log(`Initiating empty room`);
    }

  }

}
