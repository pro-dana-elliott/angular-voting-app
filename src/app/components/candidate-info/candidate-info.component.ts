
import {Component, Input, OnInit} from '@angular/core';
import {CandidateModel} from '../../models/candidate.model';
import {CandidatesService} from '../../services/candidates.service';

@Component({
  selector: 'app-candidate-info',
  templateUrl: './candidate-info.component.html',
  styleUrls: ['./candidate-info.component.css']
})
export class CandidateInfoComponent implements OnInit {
  @Input() candidate: CandidateModel;
  @Input() index: number;
  @Input() isEdit: boolean;

  constructor(private candidatesService: CandidatesService) { }

  ngOnInit() {
  }

  removeCandidate(index: number) {
    // console.log('request to remove: ' + index);
    this.candidatesService.removeCandidate(index);
  }

  //   removeCandidate(index: number) {
  //   // console.log('remove index: ' + index);
  //   this.candidatesService.removeCandidate(index);
  // }
}
