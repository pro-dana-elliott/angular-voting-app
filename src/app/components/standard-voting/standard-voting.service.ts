import { Injectable } from '@angular/core';
import {VotersService} from '../../services/voters.service';
import * as Collections from 'typescript-collections';
import {CandidatesService} from '../../services/candidates.service';

@Injectable({
  providedIn: 'root'
})
export class StandardVotingService {

  constructor(private votersService: VotersService, private candidatesService: CandidatesService) { }

  private static genPercent(): number {
     const minIndex = 0;
     const maxIndex = 100;
     return Math.floor(Math.random() * (maxIndex + 1)) + minIndex;
  }

  public generateStandardVotes() {
    let percentageLeft = 100;
    let currentPercentage = 0;
    let currentVotes = 0;
    let votesLeft = this.votersService.numberOfVoters;

    const mySet =  new Collections.Set<number>();
    let num: number;

    while (mySet.size() < this.candidatesService.numberOfCandidates) {
        num = this.genCandidateIndex();
        mySet.add(num);
    }

    const myArray = mySet.toArray();
    for (let i = 0; i < this.candidatesService.numberOfCandidates; i++ ) {
        const index = myArray[i];

        if (i === this.candidatesService.numberOfCandidates - 1) {
          this.candidatesService.getCandidate(index).standardVote = votesLeft;
          break;
        }

        do {
          currentPercentage = StandardVotingService.genPercent();
        } while (percentageLeft - currentPercentage < 0 );
        currentVotes  = Math.floor(this.votersService.numberOfVoters * (currentPercentage / 100) );
        this.candidatesService.getCandidate(index).standardVote = currentVotes;
        percentageLeft -= currentPercentage;
        votesLeft -= currentVotes;
    }
  }

  private genCandidateIndex(): number {
     const minIndex = 0;
     const maxIndex = this.candidatesService.numberOfCandidates - 1;
     return Math.floor(Math.random() * (maxIndex + 1)) + minIndex;
  }

  public MaxStandardVote() {
    let max = 0;
    for (let c = 0; c < this.candidatesService.numberOfCandidates; c++) {
      const candidate = this.candidatesService.getCandidate(c);
      if (candidate.standardVote > max ) {
        max = candidate.standardVote;
      }
    }
    return max;
  }

}
