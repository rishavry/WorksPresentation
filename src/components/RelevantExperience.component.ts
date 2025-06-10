import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'RelevantExperience',
    imports: [CommonModule],
    standalone: true,
    templateUrl: '../templates/RelevantExperience.component.html',
})
export class RelevantExperience {
    @Input() currentTheme!:string;

    @Input() readingModeOn!:boolean;
    @Input() readingModeFont!:string;
    @Input() readingModeTextSize!:number;
    @Input() readingModeTextColor!:string;
    @Input() readingModeBackgroundColor!:string;

    @Input() displayMacbook!:boolean;

    @Input() displayDarkScreen!:boolean;

    @Output() closeAllPopups:EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('relevantExperience') relevantExperienceRef!:ElementRef;
    @ViewChild('readingModeOff') readingModeOffRef!:ElementRef;

    currentSlide:number = 0;
    slides:any[] = [];


    constructor(private sanitizer: DomSanitizer) {}


    ngOnInit() {
        this.slides = [
            {
                iframeSrc: this.sanitizer.bypassSecurityTrustResourceUrl(
                    'https://drive.google.com/file/d/13DM2G2PnyWYbO8ZobZOPuReoUJM3ON11/preview'
                ),
                descriptionHTML: this.sanitize(
                    `(1 of 2) <a href='https://github.com/MegagramProject/Login-Register' target=\"_blank\" rel=\"noopener noreferrer\">
                        Login-Register
                    </a>!`
                )
            },
            {
                iframeSrc: this.sanitizer.bypassSecurityTrustResourceUrl(
                    'https://drive.google.com/file/d/1zvit2zWtb7UG5AT9goIoP3-zdz6STBER/preview'
                ),
                descriptionHTML: this.sanitize(
                    `(2 of 2) <a href='https://github.com/MegagramProject/Reset-Password' target=\"_blank\" rel=\"noopener noreferrer\">
                        Reset-Password
                    </a>!`
                )
            },
        ];
    }


    onClickingDarkScreen() {
        this.closeAllPopups.emit();
    }


    decrementCurrentSlide() {
        if(this.currentSlide > 0) {
            this.currentSlide--;
        }
        else {
            this.currentSlide = 2;
        }
    }


    incrementCurrentSlide() {
        if(this.currentSlide < 1) {
            this.currentSlide++;
        }
        else {
            this.currentSlide = 0;
        }
    }


    sanitize(htmlCodeAsString: string) {
        return this.sanitizer.bypassSecurityTrustHtml(htmlCodeAsString);
    }


    getReadingModeOffRef() {
        return this.readingModeOffRef;
    }


    getRelevantExperienceRef() {
        return this.relevantExperienceRef;
    }
}