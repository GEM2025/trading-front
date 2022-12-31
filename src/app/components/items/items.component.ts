import { Component, OnInit } from '@angular/core';
import { Response } from 'src/app/interfaces/response.interface';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})
export class ItemsComponent implements OnInit {
  response?: Response;

  /**
   *
   */
  constructor(private itemService: ItemService) {
    this.response = undefined;
  }

  ngOnInit(): void {
    // must subscribe to be notified by the observable
    this.itemService.getItems().subscribe(
      (results: any) => {
        console.log(results);
        this.response = results;
      });
  }

}
