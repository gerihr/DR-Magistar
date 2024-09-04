import {Component, Input, OnInit} from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
import {FormBuilder, FormControl} from "@angular/forms";
import {TrainerService} from "../../../../service/trainer.service";
import {empty} from "rxjs";
import {StorageService} from "../../../../service/storage.service";
import { AuthService } from 'src/service/auth.service';
import { EventService } from 'src/service/event.service';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-write-a-review',
    templateUrl: './write-a-review.component.html',
    styleUrls: ['./write-a-review.component.scss']
})
export class WriteAReviewComponent implements OnInit {
    @Input() eventId: string | number;
    @Input() comments;


    formData: any;
    review: any;


    constructor(private formBuilder: FormBuilder, private trainerService: TrainerService, private storageService: StorageService, private eventService:EventService,
        public authService: AuthService, private toastrService: ToastrService ) {
    }

    testimonialsSlides: OwlOptions = {
        items: 1,
		nav: false,
		margin: 25,
		loop: true,
		dots: true,
		autoplay: false,
		autoplayHoverPause: true,
		navText: [
			"<i class='ri-arrow-left-s-line'></i>",
			"<i class='ri-arrow-right-s-line'></i>",
		]
    }

    ngOnInit(): void {
        this.formData = this.formBuilder.group({
            review: new FormControl('')
        });
        
    }

    
    getReview(e: any) {
        this.review = e.target.value
    }

    sendReview() {
        this.eventService.addComment(this.review, this.eventId).subscribe({
                next: data => {
                    let commentBody = {
                        "id": this.authService.getUserId(),
                        "userName": this.authService.getUser().name,
                        "comment" : this.formData.controls.review.value
                      }
                    if(this.comments) {
                        this.comments.push(commentBody);
                    }
                    else {
                        this.comments= [];
                        this.comments.push(commentBody);
                    }
                    this.formData.controls.review.setValue('');
                    this.toastrService.success("Коментарът е успешно добавен")
                    
                },
                error: err => {
                    return empty();
                }
            }
        )
    }
}