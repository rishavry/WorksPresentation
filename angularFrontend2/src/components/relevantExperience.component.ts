import { CommonModule } from '@angular/common';
import {
    Component,
    Directive, ElementRef,
    EventEmitter,
    HostListener,
    Input,
    Output,
    Renderer2,
    SimpleChanges
} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Directive({
    selector: '[colorAndSizeTransitionWithScroll]',
    standalone: true
    })
export class ColorAndSizeTransitionWithScroll {
    private scrollThreshold = 490;
    private scrollUpperLimit = 935;
    private originalBackgroundColors: Record<string, string> = {
        Light: 'rgb(255, 255, 255)',
        Dark: 'rgb(199, 197, 197)',
        'System: Light': 'rgb(255, 255, 255)',
        'System: Dark': 'rgb(199, 197, 197)'
    };
    private finalBackgroundColors: Record<string, string> = {
        Light: 'rgb(234, 250, 234)',
        Dark: 'rgb(110, 22, 38)',
        'System: Light': 'rgb(234, 250, 234)',
        'System: Dark': 'rgb(110, 22, 38)'
    };
    private originalHeight = 49;
    private finalHeight = 41;
    @Input() currentTheme!:string;

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;
        if(scrollY >= this.scrollUpperLimit) {
            this.renderer.setStyle(this.el.nativeElement, 'background-color', this.finalBackgroundColors[this.currentTheme]);
            this.renderer.setStyle(this.el.nativeElement, 'height', `${this.finalHeight}em`);
        }
        else if (scrollY > this.scrollThreshold) {
            let red; let green; let blue;
            if(this.currentTheme.endsWith('Light')) {
                red = 255 - 21/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY-this.scrollThreshold);
                green = 255 - 5/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY-this.scrollThreshold);
                blue = 255 - 21/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY-this.scrollThreshold);
            }
            else {
                red = 199 - 89/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY-this.scrollThreshold);
                green = 197 - 175/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY-this.scrollThreshold);
                blue = 197 - 159/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY-this.scrollThreshold);
            }

            this.renderer.setStyle(this.el.nativeElement, 'background-color', `rgb(${red}, ${green}, ${blue})`);

            const height = this.originalHeight - 8/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY-this.scrollThreshold);
            this.renderer.setStyle(this.el.nativeElement, 'height', `${height}em`);
        }
        else {
            this.renderer.setStyle(this.el.nativeElement, 'background-color', this.originalBackgroundColors[this.currentTheme]);
            this.renderer.setStyle(this.el.nativeElement, 'height', `${this.originalHeight}em`);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['currentTheme'] && typeof window!=='undefined') {
            const scrollY = window.scrollY;
            if(scrollY >= this.scrollUpperLimit) {
                this.renderer.setStyle(this.el.nativeElement, 'background-color', this.finalBackgroundColors[this.currentTheme]);
                this.renderer.setStyle(this.el.nativeElement, 'height', `${this.finalHeight}em`);
            }
            else if (scrollY > this.scrollThreshold) {
                let red; let green; let blue;
                if(this.currentTheme.endsWith('Light')) {
                    red = 255 - 21/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY-this.scrollThreshold);
                    green = 255 - 5/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY-this.scrollThreshold);
                    blue = 255 - 21/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY-this.scrollThreshold);
                }
                else {
                    red = 199 - 89/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY-this.scrollThreshold);
                    green = 197 - 175/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY-this.scrollThreshold);
                    blue = 197 - 159/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY-this.scrollThreshold);
                }

                this.renderer.setStyle(this.el.nativeElement, 'background-color', `rgb(${red}, ${green}, ${blue})`);

                const height = this.originalHeight - 8/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY-this.scrollThreshold);
                this.renderer.setStyle(this.el.nativeElement, 'height', `${height}em`);
            }
            else {
                this.renderer.setStyle(this.el.nativeElement, 'background-color', this.originalBackgroundColors[this.currentTheme]);
                this.renderer.setStyle(this.el.nativeElement, 'height', `${this.originalHeight}em`);
            }
        }
    }
    
}


@Directive({
    selector: '[moveRelevantExperienceDescriptionWithScroll]',
    standalone: true
    })
export class MoveRelevantExperienceDescriptionWithScroll {
    private scrollThreshold = 490;
    private scrollUpperLimit = 935;
    private relevantExperienceDescriptionOriginalTop = 26;
    private relevantExperienceDescriptionFinalTop = 13;

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;
        if(scrollY >= this.scrollUpperLimit) {
            this.renderer.setStyle(this.el.nativeElement, 'top', `${this.relevantExperienceDescriptionFinalTop}%`);
        }
        else if (scrollY > this.scrollThreshold) {
            const top = this.relevantExperienceDescriptionOriginalTop - 13/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY - this.scrollThreshold);
            this.renderer.setStyle(this.el.nativeElement, 'top', `${top}%`);
        }
        else {
            this.renderer.setStyle(this.el.nativeElement, 'top', `${this.relevantExperienceDescriptionOriginalTop}%`);
        }
    }
}

@Directive({
    selector: '[moveMacbookWithScroll]',
    standalone: true
    })
export class MoveMacbookWithScroll {
    private scrollThreshold = 490;
    private scrollUpperLimit = 935;
    private macbookScreenOriginalTop = 14;
    private macbookScreenFinalTop = -5;
    private haveSlidesBeenGoneThroughYet = false;
    private isMacbookDisplayed = true;
    @Output() notifyParentToStartGoingThroughSlides:EventEmitter<any> = new EventEmitter<any>();
    @Output() notifyParentToToggleDisplayMacbook:EventEmitter<any> = new EventEmitter<any>();

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;
        if(scrollY >= this.scrollUpperLimit) {
            if(scrollY>=1200) {
                if(!this.isMacbookDisplayed) {
                    this.notifyParentToToggleDisplayMacbook.emit();
                    this.isMacbookDisplayed = true;
                }
            }
            this.renderer.setStyle(this.el.nativeElement, 'top', `${this.macbookScreenFinalTop}%`);
        }
        else if (scrollY > this.scrollThreshold) {
            if(scrollY >= 770) {
                if(this.isMacbookDisplayed) {
                    this.notifyParentToToggleDisplayMacbook.emit();
                    this.isMacbookDisplayed = false;
                }
                if(!this.haveSlidesBeenGoneThroughYet) {
                    this.notifyParentToStartGoingThroughSlides.emit();
                    this.haveSlidesBeenGoneThroughYet = true;
                }
            }
            else if(!this.isMacbookDisplayed) {
                this.notifyParentToToggleDisplayMacbook.emit();
                this.isMacbookDisplayed = true;
            }
            const top = this.macbookScreenOriginalTop - 19/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY - this.scrollThreshold);
            this.renderer.setStyle(this.el.nativeElement, 'top', `${top}%`);
        }
        else {
            this.renderer.setStyle(this.el.nativeElement, 'top', `${this.macbookScreenOriginalTop}%`);
        }
    }
}


@Component({
    selector: 'RelevantExperience',
    imports: [ColorAndSizeTransitionWithScroll, MoveRelevantExperienceDescriptionWithScroll, MoveMacbookWithScroll, CommonModule],
    standalone: true,
    templateUrl: '../templates/relevantExperience.component.html',
    styleUrl: '../styles.css',
})
export class RelevantExperience {
    @Input() currentTheme!:string;
    @Input() displayDarkScreen!:boolean;
    @Output() notifyParentToCloseAllPopups:EventEmitter<any> = new EventEmitter<any>();
    currentSlide:number = -1;
    slides:Record<string, any>[] = [
        {
            videoSrcLight: 'slide0Light.mov',
            videoSrcDark: 'slide0Dark.mov',
            descriptionHTML: "(1 of 3) First <a href='https://www.google.com' target=\"_blank\" rel=\"noopener noreferrer\">slide</a>!",
            duration: 11
        },
        {
            videoSrcLight: '',
            videoSrcDark: '',
            descriptionHTML: "(2 of 3) Second slide!",
            duration: 5
        },
        {
            videoSrcLight: '',
            videoSrcDark: '',
            descriptionHTML: "(3 of 3) Last slide!",
            duration: 3
        }
    ];
    timeoutIdForSlidesProgression:any = null;
    displayMacbook:boolean = true;

    constructor(private sanitizer: DomSanitizer) {}

    onClickingDarkScreen() {
        this.notifyParentToCloseAllPopups.emit();
    }

    startGoingThroughSlides() {
        this.currentSlide = 0;
        this.timeoutIdForSlidesProgression = setTimeout(() => {
            this.currentSlide++;
            this.handleSlideProgressionAfterSlideChanges();
        }, this.slides[0]['duration']*1000);
    }

    decrementCurrentSlide() {
        if(this.currentSlide>0) {
            this.currentSlide--;
        }
        else {
            this.currentSlide=2;
        }
        this.handleSlideProgressionAfterSlideChanges();
    }

    incrementCurrentSlide() {
        if(this.currentSlide<2) {
            this.currentSlide++;
        }
        else {
            this.currentSlide=0;
        }
        this.handleSlideProgressionAfterSlideChanges();
    }

    handleSlideProgressionAfterSlideChanges() {
        clearTimeout(this.timeoutIdForSlidesProgression);
        this.timeoutIdForSlidesProgression = setTimeout(() => {
            if(this.currentSlide==2) {
                this.currentSlide=0;
            }
            else {
                this.currentSlide++;
            }
            this.handleSlideProgressionAfterSlideChanges();
        }, this.slides[this.currentSlide]['duration']*1000);
    }

    sanitize(htmlCodeAsString: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(htmlCodeAsString);
    }

    toggleDisplayMacbook() {
        this.displayMacbook = !this.displayMacbook;
    }
}