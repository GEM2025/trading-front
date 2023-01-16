import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { OpportunityModalDataService } from '../opportunity.modal.service';

@Component({
  selector: 'app-opportunity-modal',
  templateUrl: './opportunity.modal.component.html',
  styleUrls: ['./opportunity.modal.component.css']
})
export class OpportunityModalComponent {
  @Input() message: string;

  constructor(
    public modal: NgbActiveModal,
    private opportunityModalDataService: OpportunityModalDataService
  ) {
    this.message = opportunityModalDataService.data;
  }

}
