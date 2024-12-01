import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
    selector: 'app-featured-jobs',
    templateUrl: './featured-jobs.component.html',
    styleUrls: ['./featured-jobs.component.scss']
})
export class FeaturedJobsComponent implements OnInit {

    constructor() { }

    ngOnInit(): void {}

    jobSlides: OwlOptions = {
        loop: true,
        margin: 25,
        nav: false,
        dots: true,
        autoplay: false,
        autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>",
		],
        responsive: {
            0: {
                items: 1
            },
            515: {
                items: 2
            },
            695: {
                items: 2
            },
            935: {
                items: 3
            }
        }
    }

}