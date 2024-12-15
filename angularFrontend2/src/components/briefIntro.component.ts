import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, EventEmitter, Inject, Input, Output, PLATFORM_ID } from '@angular/core';

@Component({
    selector: 'BriefIntro',
    imports: [CommonModule],
    templateUrl: '../templates/briefIntro.component.html',
    styleUrl: '../styles.css',
    standalone: true,
})
export class BriefIntro {
    dots:string = "";
    helloTextMarginTopPercentage:number = 53;
    handOpacity = 1;
    helloText!:HTMLElement;
    wavingHand!:HTMLElement;
    intervalIdForDots:any= null;
    intervalIdForHand:any = null;
    intervalIdForHelloText:any = null;
    intervalIdForUpdatingPortrait:any = null;
    intervalIdForPortraitTransition:any = null;
    intervalIdForSmoothlyDisplayingFirstPortrait:any = null;
    @Input() initialAnimationsAreFinished:boolean = false;
    currentPortraitIndex:number = 0;
    portraits:Record<number, string> = {
        0: "theRock.jpg",
        1: "theRock2.jpg",
        2: "theRock3.jpg"
    };
    opacityOfCurrentPortrait:number = 1;
    opacityOfNextPortrait:number = 0;
    @Input() displayDarkScreen!:boolean;
    @Input() currentTheme!:string;
    @Output() notifyParentToCloseAllPopups:EventEmitter<any> = new EventEmitter<any>();
    @Output() notifyParentThatInitialAnimationsAreIndeedFinished:EventEmitter<any> = new EventEmitter<any>();
    @Input() readingModeOn!:boolean;
    @Input() readingModeFont!:string;
    @Input() readingModeTextSize!:number;
    @Input() readingModeTextColor!:string;
    @Input() readingModeBackgroundColor!:string;
    
    constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId) && !this.readingModeOn) {
            this.helloText = document.getElementById('helloText')!;
            this.intervalIdForHelloText = setInterval(() => {
                this.animateTheHelloText();
            }, 10);

            this.intervalIdForDots = setInterval(() => {
                this.animateTheTypingDots();
            }, 600);

            this.wavingHand = document.getElementById('wavingHand')!;
            
            this.intervalIdForHand = setInterval(() => {
                this.animateWavyHands();
            }, 100);
        }
    }

    animateTheHelloText() {
        if(this.helloTextMarginTopPercentage>6) {
            this.helloTextMarginTopPercentage-=1;
            if(this.helloTextMarginTopPercentage<6) {
                this.helloTextMarginTopPercentage = 6;
            }
            this.helloText.style.marginTop = `${this.helloTextMarginTopPercentage}%`;
        }
        else {
            clearInterval(this.intervalIdForHelloText);
        }
    }

    animateTheTypingDots() {
        if(this.dots.length===3) {
            this.dots = "";
        }
        else {
            this.dots+=".";
        }
    }

    animateWavyHands() {
        this.handOpacity -= 0.02;

        this.wavingHand.style.opacity = this.handOpacity.toString();

        if (this.handOpacity <= 0) {
            clearInterval(this.intervalIdForHand);
            clearInterval(this.intervalIdForDots);
            this.dots = "";
            this.notifyParentThatInitialAnimationsAreIndeedFinished.emit();
            this.intervalIdForSmoothlyDisplayingFirstPortrait = setInterval(() => {
                this.smoothlyDisplayFirstPortrait();
            }, 105);
        }
    }

    updatePortrait(typeOfUpdate: string) {
        if(typeOfUpdate==='manual') {
            clearInterval(this.intervalIdForPortraitTransition);
            clearInterval(this.intervalIdForUpdatingPortrait);
            this.intervalIdForUpdatingPortrait = setInterval(() => {
                this.updatePortrait('automatic');
            }, 3900);
        }

        if(typeOfUpdate==='automatic') {
            this.intervalIdForPortraitTransition = setInterval(() => {
                    this.initiateSmoothPortraitTransition();
            }, 75);
        }

        else {
            if(this.currentPortraitIndex<2) {
                this.currentPortraitIndex++;
            }
            else {
                this.currentPortraitIndex = 0;
            }
            this.opacityOfCurrentPortrait = 1;
            this.opacityOfNextPortrait = 0;
        }
    }

    smoothlyDisplayFirstPortrait() {
        this.opacityOfCurrentPortrait+=0.05;
        if(this.opacityOfCurrentPortrait>=1) {
            this.opacityOfCurrentPortrait = 1;
            clearInterval(this.intervalIdForSmoothlyDisplayingFirstPortrait);
            this.intervalIdForUpdatingPortrait = setInterval(() => {
                this.updatePortrait('automatic');
            }, 3900);
            return;
        }
    }

    initiateSmoothPortraitTransition() {
        if(this.opacityOfNextPortrait>=1) {
            if(this.currentPortraitIndex<2) {
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
            this.opacityOfCurrentPortrait-=0.05;
            this.opacityOfNextPortrait+=0.05;
        }
    }

    onClickingDarkScreen() {
        this.notifyParentToCloseAllPopups.emit();
    }
}

