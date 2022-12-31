import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Response } from 'src/app/interfaces/response.interface';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-item-details',
  templateUrl: './item-details.component.html',
  styleUrls: ['./item-details.component.css']
})
export class ItemDetailsComponent implements OnInit {
  response?: Response;

  /**
   *
   */
  constructor(private activatedRoute: ActivatedRoute, private itemService: ItemService) {
    this.response = undefined;
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      console.log(`View ID '${id}'`);
      this.itemService.getItem(id!).subscribe(
        (response: any) => {
          console.log(response);
          this.response = response ;
        }
      )

    });
  }

}
