import {Injectable} from '@angular/core';
import {VotersService} from '../../services/voters.service';
import {CandidatesService} from '../../services/candidates.service';
import * as Collections from 'typescript-collections';
import {InstantRunoffModel} from '../../models/instantrunnoff.model';

@Injectable({
  providedIn: 'root'
})
export class InstantRunoffVotingService {

  constructor(private votersService: VotersService, private candidatesService: CandidatesService) { }

  public instantRunoffCutoffAmount: number;
  private numberOfCandidatesRunning: number; // this will decrease with each round
  public colors: Array<string>  = [
   '#ff0000',
   '#0080ff',
   '#ff8000',
   '#8000ff',
   '#cc9900',
   '#ff00ff',
   '#0099cc'
    ];

  private static genVoteNumber(maxNumberOfCandidatesIndex: number): number {
     const minIndex = 0;
    return Math.floor(Math.random() * (maxNumberOfCandidatesIndex + 1)) + minIndex;
  }

  public generateInstantRunoffVotes() {
    // generate random voters
    // console.log('Start generateVotes');
    // this.numberOfCandidates =  numberOfCandidates;
    // this.maxNumberOfCandidatesIndex = this.numberOfCandidates - 1;

    let mySet: Collections.Set<number>;

    for (let voter = 0; voter < this.votersService.numberOfVoters; voter++ ) {
      mySet =  new Collections.Set<number>();

      // get voters
      while (mySet.size() < this.candidatesService.numberOfCandidates) {
        mySet.add(InstantRunoffVotingService.genVoteNumber(this.candidatesService.numberOfCandidates - 1));
      }

      ////////////////////////
      // save getVoter's votes
      ////////////////////////
      this.votersService.addVoteSet(mySet);
    }
    // console.log('Complete generateVotes');
  }


  public CountVotes() {
    // console.log('Start Count Instant Runoff ');
    /////////////////////////
    // Instant-runoff votes
    ////////////////////////
    this.instantRunoffCutoffAmount = Math.ceil(this.votersService.numberOfVoters / 2);
    // this.instantRunoffCutoffAmountChanged.next(this.instantRunoffCutoffAmount);

    let isWinner = false;
    let roundNumber = -1;
    this.numberOfCandidatesRunning = this.candidatesService.numberOfCandidates;
    this.AddInstantRunoffVoteRound();

    while (!isWinner) {

      roundNumber++;

      // count votes
      for (let i = 0; i < this.votersService.numberOfVoters; i++) {
        const voter = this.votersService.getVoter(i).toArray();
        for (let preference = 0; preference < voter.length; preference++) {
          const person: number = voter[preference];
          const candidateObj = this.candidatesService.getCandidate(person).instantRunoffData[roundNumber];
          if (candidateObj.isRunning) {
            candidateObj.instantRunoffVote++;
            break;
          }
        }

      }

      // check if anyone won
      let maxValue = -1;
      for (let i = 0; i < this.candidatesService.numberOfCandidates; i++) {
        const candidate = this.candidatesService.getCandidate(i);
        const instantRunoffVote = candidate.instantRunoffData[roundNumber].instantRunoffVote;
        if (instantRunoffVote > this.instantRunoffCutoffAmount) {
          if (instantRunoffVote > maxValue) {
            maxValue = instantRunoffVote;
          }
          isWinner = true;
        }

      }

      if (!isWinner && this.numberOfCandidatesRunning === 2) {
        isWinner = true;
      }

      // if no winner eliminate the lowest.
      if (!isWinner) {
        let minValue = Number.MAX_SAFE_INTEGER;

        // find lowest
        for (let i = 0; i < this.candidatesService.numberOfCandidates; i++) {
           const candidateObj = this.candidatesService.getCandidate(i).instantRunoffData[roundNumber];
          if (candidateObj.isRunning && candidateObj.instantRunoffVote < minValue) {
            minValue = candidateObj.instantRunoffVote;
          }
        }

        // set all with lowest out of the running
        this.AddInstantRunoffVoteRound();
        for (let i = 0; i < this.candidatesService.numberOfCandidates; i++) {
           if (this.numberOfCandidatesRunning === 2) {
              break;
           }

          const candidateObj = this.candidatesService.getCandidate(i).instantRunoffData[roundNumber];
          if (candidateObj.instantRunoffVote === minValue) {
            candidateObj.isRunning = false;
            this.candidatesService.getCandidate(i).instantRunoffData[roundNumber + 1].isRunning = false;
            this.numberOfCandidatesRunning--;
          }
        }

      }

    }

    // console.log('Complete Count Instant Runoff ');
  }

  public MaxInstantRunoffVote() {
    const lastRoundIndex = this.candidatesService.getCandidate(0).instantRunoffData.length - 1;
    let max = 0;
    for ( let index = 0; index < this.candidatesService.numberOfCandidates; index++) {
       const candidateVote =  this.candidatesService.getCandidate(index).instantRunoffData[lastRoundIndex].instantRunoffVote;
       if (candidateVote > max ) {
          max = candidateVote;
       }
    }

    return max;
  }

  public AddInstantRunoffVoteRound() {
    for ( let index = 0; index < this.candidatesService.numberOfCandidates; index++) {
      const candidate  =  this.candidatesService.getCandidate(index);
      candidate.instantRunoffData.push( new InstantRunoffModel(true));
          if (candidate.instantRunoffData.length > 1) {
            candidate.instantRunoffData[candidate.instantRunoffData.length - 1].isRunning
              = candidate.instantRunoffData[candidate.instantRunoffData.length - 2].isRunning;
          }
    }
  }

}
