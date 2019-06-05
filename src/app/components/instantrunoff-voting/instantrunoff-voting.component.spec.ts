import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstantrunoffVotingComponent } from './instantrunoff-voting.component';

describe('InstantrunoffVotingComponent', () => {
  let component: InstantrunoffVotingComponent;
  let fixture: ComponentFixture<InstantrunoffVotingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstantrunoffVotingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstantrunoffVotingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
