import { Component, OnInit } from '@angular/core';
import {CityService} from "../../../../service/city.service";
import {TrainerService} from "../../../../service/trainer.service";
import {StorageService} from "../../../../service/storage.service";
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-main-banner',
  templateUrl: './main-banner.component.html',
  styleUrls: ['./main-banner.component.scss']
})
export class MainBannerComponent implements OnInit {
  cities: any;
  sports: any;
  trainersData: any;
  filterData: any;
  currentUser: any;
  searchData = new FormControl();

  constructor(public cityService: CityService, public trainerService: TrainerService, public storageService: StorageService, private router: Router) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }

  searchEvent(){
    this.router.navigate(['/event-listings-filter/'+this.searchData.value])
  }

}
