import { Injectable } from '@angular/core';
import {CandidateModel} from '../models/candidate.model';
import {InstantRunoffModel} from '../models/instantrunnoff.model';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CandidatesService {

  public candidatesChanged = new Subject<CandidateModel[]>();

  private candidateList: Array<CandidateModel>  = [new CandidateModel('George Washington'),
                                                   new CandidateModel('Abraham Lincoln'),
                                                   new CandidateModel('Theodore Roosevelt'),
                                                   new CandidateModel('John F. Kennedy')];

  constructor() { }

  public getCandidates(): Array<CandidateModel> {
    return this.candidateList.slice();
  }

  public getCandidate(index: number): CandidateModel {
        return this.candidateList[index];
  }

  // used in template to iterate over candidateList
  public [Symbol.iterator]() {
      let i = 0;
      const list = this.candidateList;
      return {
          next: function() {
              return {
                  done: i === list.length,
                  value: list[i++]
              };
          }
      };
   }

  get numberOfCandidates(): number {
    return this.candidateList.length;
  }

  public addCandidate(name: string) {
    if (name !== '' && !this.containsCandidate(name)) {
      this.candidateList.push(new CandidateModel(name));
      this.candidatesChanged.next(this.candidateList.slice());
    }
  }

  public removeCandidate(index: number) {
    // console.log('request to remove candidate: ' + index);
      this.candidateList.splice(index, 1);
      this.candidatesChanged.next(this.candidateList.slice());
  }

  public containsCandidate(name: string): boolean {
    return this.candidateList.some((element) => ( element.name === name ) );
  }

  public resetAllVotes() {
    this.candidateList.forEach( (candidate) => {
        candidate.standardVote = 0;
        candidate.instantRunoffData = new Array<InstantRunoffModel>();
    });

  }

  get isMaxNumberOfCandidates(): boolean {
    return  this.numberOfCandidates === 8 ;
  }

}
