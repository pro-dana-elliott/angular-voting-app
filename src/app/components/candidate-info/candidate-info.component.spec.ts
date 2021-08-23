import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import {CandidateInfoComponent} from './candidate-info.component';
import {CandidateModel} from '../../models/candidate.model';
import {Component, ViewChild} from '@angular/core';




describe('CandidateInfoComponent', () => {
  let testHostComponentcomponent: TestHostComponent;
  let fixture: ComponentFixture<TestHostComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CandidateInfoComponent, TestHostComponent ],
      imports: [ ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestHostComponent);
    testHostComponentcomponent = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(testHostComponentcomponent).toBeTruthy();
  });

  it('when isEdit delete button should be visable', () => {
    testHostComponentcomponent.componentUnderTest.isEdit = true;
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('button').innerText).toEqual('Delete');
  });

  // noinspection AngularMissingOrInvalidDeclarationInModule
  @Component({
    selector: 'app-host-component',
    template: '<app-candidate-info [candidate]="candidateTest"></app-candidate-info>'
  })

  class TestHostComponent {
    @ViewChild(CandidateInfoComponent, /* TODO: add static flag */ { static: true})
    public componentUnderTest: CandidateInfoComponent;
      candidateTest = new CandidateModel('test', 10, []);
  }

});
