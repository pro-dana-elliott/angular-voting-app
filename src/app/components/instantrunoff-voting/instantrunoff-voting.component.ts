import {Component, OnDestroy, OnInit} from '@angular/core';
import {CandidatesService} from '../../services/candidates.service';
import {InstantRunoffVotingService} from './instant-runoff-voting.service';
import {VotersService} from '../../services/voters.service';


@Component({
  selector: 'app-instantrunoff-voting',
  templateUrl: './instantrunoff-voting.component.html',
  styleUrls: ['./instantrunoff-voting.component.css']
})
export class InstantrunoffVotingComponent implements OnInit, OnDestroy {

  constructor(private votersService: VotersService,
              private _candidatesService: CandidatesService,
              private _instantRunoffVotingService: InstantRunoffVotingService) { }

  ngOnInit() {

  }

  ngOnDestroy(): void {
  }

  get candidatesService() {
    return this._candidatesService;
  }

  get instantRunoffVotingService() {
    return this._instantRunoffVotingService;
  }

  public percentOfVote(candidateVotes: number, totalVotes: number): number {
        // console.log('candidateVotes : ' + candidateVotes + ' totalVotes: ' + totalVotes);
        return Math.round((candidateVotes / totalVotes) * 100);
  }
}
