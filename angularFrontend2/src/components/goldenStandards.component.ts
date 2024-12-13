import { CommonModule } from '@angular/common';
import { Component, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, SimpleChanges } from '@angular/core';


@Directive({
    selector: '[startChangingBackground]',
    standalone: true,
})
export class StartChangingBackground {
    private scrollThreshold = 3750;
    private scrollUpperLimit = 4400;
    private originalBackground = 'linear-gradient(to right, transparent, transparent)';
    private finalBackgroundsBeforeSmoothTransition:Record<string, string> = {
        Light: 'linear-gradient(to right, #33ccff, #33ccff 50%, #ff6666 50%, #ff6666)',
        Dark: 'linear-gradient(to right, #000099, #000099 50%, #993333 50%, #993333)',
        'System: Light': 'linear-gradient(to right, #33ccff, #33ccff 50%, #ff6666 50%, #ff6666)',
        'System: Dark': 'linear-gradient(to right, #000099, #000099 50%, #993333 50%, #993333)'
    };
    @Input() currentTheme!:string;
    private hasSmoothTransitionBeenMade = false;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;
        if(scrollY >= this.scrollUpperLimit) {
            if(!this.hasSmoothTransitionBeenMade) {
                this.renderer.setStyle(this.el.nativeElement, 'background', this.finalBackgroundsBeforeSmoothTransition[this.currentTheme]);
                this.renderer.addClass(this.el.nativeElement, 'goldenStandardsColorChangingDiv');
                this.hasSmoothTransitionBeenMade = true;
            }
        }
        else {
            if(this.hasSmoothTransitionBeenMade==true) {
                this.renderer.removeClass(this.el.nativeElement, 'goldenStandardsColorChangingDiv');
                this.hasSmoothTransitionBeenMade = false;
            }
            if (scrollY > this.scrollThreshold) {
                const percentageScrolled = 100 * (scrollY-this.scrollThreshold)/(this.scrollUpperLimit-this.scrollThreshold);
                let newBackground;
                if(percentageScrolled<50) {
                    if(this.currentTheme.endsWith('Light')) {
                        newBackground =`linear-gradient(to right, #33ccff, #33ccff ${percentageScrolled}%, transparent ${percentageScrolled}%, transparent)`;
                    }
                    else {
                        newBackground =`linear-gradient(to right, #000099, #000099 ${percentageScrolled}%, transparent ${percentageScrolled}%, transparent)`;
                    }
                }
                else {
                    if(this.currentTheme.endsWith('Light')) {
                        newBackground = `linear-gradient(to right, #33ccff, #33ccff 50%, #ff6666 50%, #ff6666 ${percentageScrolled}%, transparent ${percentageScrolled}%, transparent)`;
                    }
                    else {
                        newBackground = `linear-gradient(to right, #000099, #000099 50%, #993333 50%, #993333 ${percentageScrolled}%, transparent ${percentageScrolled}%, transparent)`;
                    }
                }
                this.renderer.setStyle(this.el.nativeElement, 'background', newBackground);
            }
            else {
                this.renderer.setStyle(this.el.nativeElement, 'background', this.originalBackground);
            }
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['currentTheme'] && typeof window!=='undefined') {
            const scrollY = window.scrollY;
            if(scrollY >= this.scrollUpperLimit) {
                return;
            }
            else {
                if (scrollY > this.scrollThreshold) {
                    const percentageScrolled = 100 * (scrollY-this.scrollThreshold)/(this.scrollUpperLimit-this.scrollThreshold);
                    let newBackground;
                    if(percentageScrolled<50) {
                        if(this.currentTheme.endsWith('Light')) {
                            newBackground =`linear-gradient(to right, #33ccff, #33ccff ${percentageScrolled}%, transparent ${percentageScrolled}%, transparent)`;
                        }
                        else {
                            newBackground =`linear-gradient(to right, #000099, #000099 ${percentageScrolled}%, transparent ${percentageScrolled}%, transparent)`;
                        }
                    }
                    else {
                        if(this.currentTheme.endsWith('Light')) {
                            newBackground = `linear-gradient(to right, #33ccff, #33ccff 50%, #ff6666 50%, #ff6666 ${percentageScrolled}%, transparent ${percentageScrolled}%, transparent)`;
                        }
                        else {
                            newBackground = `linear-gradient(to right, #000099, #000099 50%, #993333 50%, #993333 ${percentageScrolled}%, transparent ${percentageScrolled}%, transparent)`;
                        }
                    }
                    this.renderer.setStyle(this.el.nativeElement, 'background', newBackground);
                }
                else {
                    this.renderer.setStyle(this.el.nativeElement, 'background', this.originalBackground);
                }
            }
        }
    }

}


@Component({
    selector: 'GoldenStandards',
    imports: [CommonModule, StartChangingBackground],
    templateUrl: '../templates/goldenStandards.component.html',
    styleUrl: '../styles.css',
    standalone: true,
})
export class GoldenStandards {
    @Input() currentTheme!:string;
    @Input() displayDarkScreen!:boolean;
    @Output() notifyParentToCloseAllPopups:EventEmitter<any> = new EventEmitter<any>();

    onClickingDarkScreen() {
        this.notifyParentToCloseAllPopups.emit();
    }

}