import { AfterViewInit, Component, OnInit } from '@angular/core';
import { EventService } from 'src/service/event.service';
import * as brain from 'brain.js';
import { RecommendationsService } from 'src/service/recommendations.service';


@Component({
  selector: 'app-card-slider',
  templateUrl: './card-slider.component.html',
  styleUrls: ['./card-slider.component.scss']
})
export class CardSliderComponent implements OnInit, AfterViewInit {

  constructor(private eventService: EventService, public recommendationService: RecommendationsService ) { }
  recommendations;

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    // let allEvents = this.eventService.allEvents.getValue();

    // const net = new brain.NeuralNetwork();
    // const trainingData = this.recommendationService.prepareTrainingData();
    // net.train(trainingData);
    // this.recommendations = this.recommendationService.getRecommendations(net, allEvents, 5);
  }

}
