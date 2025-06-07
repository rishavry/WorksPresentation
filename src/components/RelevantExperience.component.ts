import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';
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
    slides:any[] = [
        {
            vidSrc: 'videos/LoginRegisterFrontendDemonstration.mp4',
            descriptionHTML: `(1 of 3) First <a href='https://github.com/MegagramProject/Login-Register' target=\"_blank\"
            rel=\"noopener noreferrer\">
                Login-Register
            </a>!`,
            duration: 50
        },
        {
            vidSrc: 'videos/ResetPasswordFrontendDemonstration.mp4',
            descriptionHTML: `(2 of 3) First <a href='https://github.com/MegagramProject/Reset-Password' target=\"_blank\"
            rel=\"noopener noreferrer\">
                Reset-Password
            </a>!`,
            duration: 40
        },
        {
            vidSrc: 'videos/HomePageFrontendDemonstration.mp4',
            descriptionHTML: `(3 of 3) First <a href='https://github.com/MegagramProject/Home-Page' target=\"_blank\"
            rel=\"noopener noreferrer\">
                Home-Page
            </a>!`,
            duration: 50
        }
    ];
    timeoutIdForSlidesProgression:any = null;


    constructor(private sanitizer: DomSanitizer) {}


    ngOnChanges(changes:SimpleChanges) {
        if (changes['displayMacbook']) {
            if (this.displayMacbook) {
                this.startGoingThroughSlides();
            }
            else {
                clearTimeout(this.timeoutIdForSlidesProgression);
                this.timeoutIdForSlidesProgression = null;
            }
        }
    }


    onClickingDarkScreen() {
        this.closeAllPopups.emit();
    }


    startGoingThroughSlides() {
        this.timeoutIdForSlidesProgression = setTimeout(() => {
            if(this.currentSlide == 2) {
                this.currentSlide = 0;
            }
            else {
                this.currentSlide++;
            }

            this.handleSlideProgressionAfterSlideChanges();
        }, this.slides[this.currentSlide]['duration'] * 1000);
    }


    decrementCurrentSlide() {
        if(this.currentSlide > 0) {
            this.currentSlide--;
        }
        else {
            this.currentSlide = 2;
        }

        this.handleSlideProgressionAfterSlideChanges();
    }


    incrementCurrentSlide() {
        if(this.currentSlide < 2) {
            this.currentSlide++;
        }
        else {
            this.currentSlide = 0;
        }

        this.handleSlideProgressionAfterSlideChanges();
    }


    handleSlideProgressionAfterSlideChanges() {
        clearTimeout(this.timeoutIdForSlidesProgression);

        this.timeoutIdForSlidesProgression = setTimeout(() => {
            if(this.currentSlide == 2) {
                this.currentSlide = 0;
            }
            else {
                this.currentSlide++;
            }

            this.handleSlideProgressionAfterSlideChanges();
        }, this.slides[this.currentSlide]['duration'] * 1000);
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