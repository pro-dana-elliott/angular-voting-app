import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { StandardVotingComponent } from './standard-voting.component';

describe('StandardVotingComponent', () => {
  let component: StandardVotingComponent;
  let fixture: ComponentFixture<StandardVotingComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ StandardVotingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StandardVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
