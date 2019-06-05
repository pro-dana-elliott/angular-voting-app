import { Injectable } from '@angular/core';
import * as Collections from 'typescript-collections';

@Injectable({
  providedIn: 'root'
})
export class VotersService {

  private votersList: Array<Collections.Set<number>>;
   // private numberOfCandidates: number;
  // private maxNumberOfCandidatesIndex: number;

  private _numberOfVoters = 0;

  constructor() {
    this.votersList = [];
  }

  public getVoter(index: number) {
    return this.votersList[index];
  }
  // used in template to iterate over votersList
  // public [Symbol.iterator]() {
  //     let i = 0;
  //     const list = this.votersList;
  //     return {
  //         next: function() {
  //             return {
  //                 done: i === list.length,
  //                 value: list[i++]
  //             };
  //         }
  //     };
  //  }

  get numberOfVoters(): number {
    return this._numberOfVoters;
  }

  set numberOfVoters(value: number) {
    this._numberOfVoters = value;
  }

  public resetVoters() {
    this.votersList = [];
  }

  public addVoteSet(votes: Collections.Set<number>) {
    this.votersList.push(votes);
  }

}
