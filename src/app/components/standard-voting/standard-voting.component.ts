import {Component, Injectable, OnInit} from '@angular/core';

import {CandidatesService} from '../../services/candidates.service';
import {StandardVotingService} from './standard-voting.service';
import {VotersService} from '../../services/voters.service';

@Component({
  selector: 'app-standard-voting',
  templateUrl: './standard-voting.component.html',
  styleUrls: ['./standard-voting.component.css']
})

@Injectable()
export class StandardVotingComponent implements OnInit {

  constructor(private voterService: VotersService,
              private _candidatesService: CandidatesService,
              private standardVotingService: StandardVotingService) { }

  ngOnInit() {
  }

  get candidatesService() {
    return this._candidatesService;
  }
  public percentOfVote(candidateVotes: number, totalVotes: number): number {
        // console.log('candidateVotes : ' + candidateVotes + ' totalVotes: ' + totalVotes);

        return Math.round((candidateVotes / totalVotes) * 100);
  }

}
