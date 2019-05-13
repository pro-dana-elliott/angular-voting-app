import { TestBed, async } from '@angular/core/testing';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import {MinValidateDirective} from './validates/min-validate.directive';
import {StandardVotingComponent} from './components/standard-voting/standard-voting.component';
import {InstantrunoffVotingComponent} from './components/instantrunoff-voting/instantrunoff-voting.component';
import {CandidateInfoComponent} from './components/candidate-info/candidate-info.component';



describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BrowserModule, FormsModule ],
      declarations: [
        AppComponent,
        StandardVotingComponent,
        InstantrunoffVotingComponent,
        MinValidateDirective,
        CandidateInfoComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'VotingApp'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('VotingApp');
  });

  // it('should render title in a h1 tag', () => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   fixture.detectChanges();
  //   const compiled = fixture.debugElement.nativeElement;
  //   expect(compiled.querySelector('h1').textContent).toContain('Welcome to VotingApp!');
  // });
});
