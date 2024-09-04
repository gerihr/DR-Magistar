import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FileUploadService} from 'src/service/file-upload.service';
import {StorageService} from "../../../../service/storage.service";
import {TrainerService} from "../../../../service/trainer.service";

@Component({
    selector: 'app-file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent implements OnInit, AfterViewInit {
    selectedFiles?: FileList;
    currentFile?: File;
    progress = 0;
    message = '';
    preview = '';
    currentUser: any;
    imageInfos?: Observable<any>;

    @Output() setCurrentImageEvent = new EventEmitter<string>();
    @Input() currentImg: string;
    constructor(private uploadService: FileUploadService, public storageService: StorageService, public trainerService: TrainerService) {
    }

    ngOnInit(): void {
        this.currentUser = this.storageService.getUser();
        // this.imageInfos = this.uploadService.getFiles(this.currentUser.id);
    }

    ngAfterViewInit(): void {
    }

    selectFile(event: any): void {
        this.message = '';
        this.preview = '';
        this.progress = 0;
        this.selectedFiles = event.target.files;

        if (this.selectedFiles) {
            const file: File | null = this.selectedFiles.item(0);

            if (file) {
                this.preview = '';
                this.currentFile = file;

                const reader = new FileReader();
                reader.readAsDataURL(this.currentFile);
                reader.onload = (e: any) => {
                    this.preview = e.target.result;

                };

            }
        }
    }

    upload(): void {
        this.progress = 0;
        // this.trainerInfo = this.trainerService.getTrainerInfoById(this.currentUser.id).subscribe(result => {
        //     console.log(result);
        // });
        if (this.selectedFiles) {
            const file: File | null = this.selectedFiles.item(0);

            if (file) {
                this.currentFile = file;
                this.setCurrentImageEvent.emit(this.preview);
                this.message = "Файлът е прикачен успешно"
                // this.uploadService.upload(this.currentFile, this.currentUser.id).subscribe({
                //     next: (event: any) => {
                //         if (event.type === HttpEventType.UploadProgress) {
                //             this.progress = Math.round((100 * event.loaded) / event.total);
                //         } else if (event instanceof HttpResponse) {
                //             this.message = event.body.message;
                //             this.imageInfos = this.uploadService.getFiles(this.currentUser.id);
                //         }
                //     },
                //     error: (err: any) => {
                //         console.log(err);
                //         this.progress = 0;

                //         if (err.error && err.error.message) {
                //             this.message = err.error.message;
                //         } else {
                //             this.message = 'Could not upload the image!';
                //         }

                //         this.currentFile = undefined;
                //     },
                // });
            }
            this.selectedFiles = undefined;
        }
    }
}
