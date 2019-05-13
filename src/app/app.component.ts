import {Component, OnDestroy, OnInit} from '@angular/core';

import {VotersService} from './services/voters.service';
import {CandidatesService} from './services/candidates.service';
import {InstantRunoffVotingService} from './components/instantrunoff-voting/instant-runoff-voting.service';
import {StandardVotingService} from './components/standard-voting/standard-voting.service';
import {CandidateModel} from './models/candidate.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit, OnDestroy {
  title = 'VotingApp';
  candidates: CandidateModel[];
  candidatesSubscription: Subscription;

  newName = '';
  numOfVoters = 20000;
  votingType = 'instantrunoff';
  isEdit = false;
  isTaskDone = false;
  isCalculating = false;

  constructor(private _candidatesService: CandidatesService,
              private votersService: VotersService,
              private standardVotingService: StandardVotingService,
              private instantRunoffVotingService: InstantRunoffVotingService) {}

  ngOnInit(): void {
    this.candidatesSubscription = this.candidatesService.candidatesChanged.subscribe(
      (candidates: Array<CandidateModel>) => {
        // console.log('candidatesChanged Event');
        this.candidates = candidates;
      }
    );
    this.candidates = this.candidatesService.getCandidates();
  }

  get candidatesService() {
    return this._candidatesService;
  }

  addName() {
    if (this.newName !== '') {
      this.candidatesService.addCandidate(this.newName);
      this.newName = '';
      this.isTaskDone = false;
    }
  }

  run() {
    // Due to the long running time allow the UI to update the spinner.
    // console.log('1 Running');
    this.isCalculating = true;
    this.isTaskDone = false;
    this.isEdit = false;

    setTimeout(() => {
            this.resetAllVotes();
            // console.log('resetAllVotes Completed');
            this.votersService.numberOfVoters = this.numOfVoters;

            this.standardVotingService.generateStandardVotes();
            this.instantRunoffVotingService.generateInstantRunoffVotes();

            this.instantRunoffVotingService.CountVotes();
            // console.log('wait Completed');
            this.isCalculating = false;
            this.isTaskDone = true;
        }, 100);

    // console.log('2 Waiting for task to complete.');

  }

  resetAllVotes() {
    this.candidatesService.resetAllVotes();
    this.votersService.resetVoters();
  }

  ngOnDestroy(): void {
    this.candidatesSubscription.unsubscribe();
  }

}
