import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateProduceComponent } from './update-produce.component';

describe('UpdateProduceComponent', () => {
  let component: UpdateProduceComponent;
  let fixture: ComponentFixture<UpdateProduceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateProduceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UpdateProduceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
