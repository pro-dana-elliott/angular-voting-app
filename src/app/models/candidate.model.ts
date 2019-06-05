import {InstantRunoffModel} from './instantrunnoff.model';

export class CandidateModel {

  constructor(
    public name: string,
    public standardVote = 0,
    public instantRunoffData: Array<InstantRunoffModel> = []
  )  {}

}
