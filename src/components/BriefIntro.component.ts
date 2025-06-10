import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, SimpleChanges, ViewChild } from '@angular/core';


@Component({
    selector: 'BriefIntro',
    imports: [CommonModule],
    templateUrl: '../templates/BriefIntro.component.html',
    standalone: true,
})
export class BriefIntro {
    @Input() initialAnimationsAreFinished:boolean = false;

    @Input() currentTheme!:string;

    @Input() readingModeOn!:boolean;
    @Input() readingModeFont!:string;
    @Input() readingModeTextSize!:number;
    @Input() readingModeTextColor!:string;
    @Input() readingModeBackgroundColor!:string;

    @Input() displayDarkScreen!:boolean;

    @Output() closeAllPopups:EventEmitter<any> = new EventEmitter<any>();

    @Output() notifyParentThatInitialAnimationsAreFinished:EventEmitter<any> = new EventEmitter<any>();

    dots:string = '';
    intervalIdForDots:any= null;

    handOpacity = 1;
    intervalIdForHand:any = null;

    currentPortraitIndex:number = 0;
    portraits:any = {
        0: 'images/professionalPortrait1.png',
        1: 'images/professionalPortrait2.png',
        2: 'images/professionalPortrait3.png'
    };
    opacityOfCurrentPortrait:number = 1;
    opacityOfNextPortrait:number = 0;
    intervalIdForSmoothlyDisplayingFirstPortrait:any = null;
    intervalIdForUpdatingPortrait:any = null;
    intervalIdForPortraitTransition:any = null;

    @ViewChild('briefIntro') briefIntroRef!:ElementRef;
    @ViewChild('wavingHand') wavingHandRef!:ElementRef;
    @ViewChild('readingModeOff') readingModeOffRef!:ElementRef;


    ngOnChanges(changes:SimpleChanges) {
        if (changes['readingModeOn']) {
            if (this.readingModeOn) {
                if (!this.initialAnimationsAreFinished) {
                    clearInterval(this.intervalIdForDots);
                    clearInterval(this.intervalIdForHand);
                }
                else {
                    clearInterval(this.intervalIdForSmoothlyDisplayingFirstPortrait);
                    clearInterval(this.intervalIdForUpdatingPortrait);
                    clearInterval(this.intervalIdForPortraitTransition);
                }
            }
            else {
                if (!this.initialAnimationsAreFinished) {
                    this.intervalIdForDots = setInterval(() => {
                        this.animateTheTypingDots();
                    }, 600);
                    
                    this.intervalIdForHand = setInterval(() => {
                        this.animateWavyHands();
                    }, 100);
                }
                else {
                    this.intervalIdForSmoothlyDisplayingFirstPortrait = setInterval(() => {
                        this.smoothlyDisplayFirstPortrait();
                    }, 105);
                }
            }
        }
    }


    animateTheTypingDots() {
        if(this.dots.length == 3) {
            this.dots = '';
        }
        else {
            this.dots += '.';
        }
    }


    animateWavyHands() {
        this.handOpacity-= 0.02;

        this.wavingHandRef.nativeElement.style.opacity = this.handOpacity.toString();

        if (this.handOpacity <= 0) {
            clearInterval(this.intervalIdForHand);
            clearInterval(this.intervalIdForDots);

            this.dots = '';

            this.notifyParentThatInitialAnimationsAreFinished.emit();

            this.intervalIdForSmoothlyDisplayingFirstPortrait = setInterval(() => {
                this.smoothlyDisplayFirstPortrait();
            }, 105);
        }
    }


    updatePortrait(typeOfUpdate: string) {
        if(typeOfUpdate === 'automatic') {
            this.intervalIdForPortraitTransition = setInterval(() => {
                this.initiateSmoothPortraitTransition();
            }, 75);
        }

        else {
            clearInterval(this.intervalIdForSmoothlyDisplayingFirstPortrait);
            clearInterval(this.intervalIdForPortraitTransition);
            clearInterval(this.intervalIdForUpdatingPortrait);

            if(this.currentPortraitIndex < 2) {
                this.currentPortraitIndex++;
            }
            else {
                this.currentPortraitIndex = 0;
            }

            this.opacityOfCurrentPortrait = 1;
            this.opacityOfNextPortrait = 0;

            this.intervalIdForUpdatingPortrait = setInterval(() => {
                this.updatePortrait('automatic');
            }, 3900);
        }
    }


    smoothlyDisplayFirstPortrait() {
        this.opacityOfCurrentPortrait+= 0.05;

        if(this.opacityOfCurrentPortrait >= 1) {
            this.opacityOfCurrentPortrait = 1;

            clearInterval(this.intervalIdForSmoothlyDisplayingFirstPortrait);

            this.intervalIdForUpdatingPortrait = setInterval(() => {
                this.updatePortrait('automatic');
            }, 3900);

            return;
        }
    }


    initiateSmoothPortraitTransition() {
        if(this.opacityOfNextPortrait >= 1) {
            if(this.currentPortraitIndex < 2) {
                this.currentPortraitIndex++;
            }
            else {
                this.currentPortraitIndex = 0;
            }

            this.opacityOfCurrentPortrait = 1;
            this.opacityOfNextPortrait = 0;

            clearInterval(this.intervalIdForPortraitTransition);
        }
        else {
            this.opacityOfCurrentPortrait-= 0.05;
            this.opacityOfNextPortrait+= 0.05;
        }
    }

    
    onClickingDarkScreen() {
        this.closeAllPopups.emit();
    }


    getReadingModeOffRef() {
        return this.readingModeOffRef;
    }


    getBriefIntroRef() {
        return this.briefIntroRef;
    }
}

