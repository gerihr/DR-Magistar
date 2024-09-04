import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EventService } from 'src/service/event.service';
import * as brain from 'brain.js';
import { RecommendationsService } from 'src/service/recommendations.service';
import { SharedService } from 'src/service/shared.service';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-suggested-page',
  templateUrl: './suggested-page.component.html',
  styleUrls: ['./suggested-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SuggestedPageComponent implements OnInit {

  constructor(private eventService: EventService, public recommendationService: RecommendationsService,
     private sharedService :SharedService, private router:Router ) { }

  
  private recommendations: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  public readonly recommendations$ = this.recommendations.asObservable();

  ngOnInit(): void {
    this.sharedService.isLoading(true)
    let allEvents = this.eventService.allEvents.getValue();
    if(allEvents){
      const net = new brain.NeuralNetwork();
      const trainingData = this.recommendationService.prepareTrainingData();
      net.train(trainingData);
      this.recommendations.next(this.recommendationService.getRecommendations(net, allEvents, 6))
    }
    else {
      this.router.navigateByUrl('/')
    }
    this.sharedService.isLoading(false)
  }

  ngAfterViewInit(): void {
  }

}
