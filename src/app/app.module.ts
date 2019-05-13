import { BrowserModule } from '@angular/platform-browser';
import {FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { StandardVotingComponent } from './components/standard-voting/standard-voting.component';
import { InstantrunoffVotingComponent } from './components/instantrunoff-voting/instantrunoff-voting.component';
import { MinValidateDirective } from './validates/min-validate.directive';
import { CandidateInfoComponent } from './components/candidate-info/candidate-info.component';
import {InstantRunoffVotingService} from './components/instantrunoff-voting/instant-runoff-voting.service';


@NgModule({
  declarations: [
    AppComponent,
    StandardVotingComponent,
    InstantrunoffVotingComponent,
    MinValidateDirective,
    CandidateInfoComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [ InstantRunoffVotingService],
  bootstrap: [AppComponent]
})
export class AppModule { }
