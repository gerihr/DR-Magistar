import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../../../service/storage.service";

@Component({
  selector: 'app-company-details-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss']
})
export class ProfilePageComponent implements OnInit {

  currentUser: any;

  constructor(public storageService: StorageService) { }

  ngOnInit(): void {
    this.currentUser = this.storageService.getUser();
  }

}
