import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpportunityModalComponent } from './opportunity.modal.component';

describe('ModalComponent', () => {
  let component: OpportunityModalComponent;
  let fixture: ComponentFixture<OpportunityModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OpportunityModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OpportunityModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
