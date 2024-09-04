import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/service/event.service';

@Component({
  selector: 'app-main-home',
  templateUrl: './main-home.component.html',
  styleUrls: ['./main-home.component.scss']
})
export class MainHomeComponent implements OnInit {

  constructor(public eventService: EventService) { }

  ngOnInit(): void {
  }

}
