import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';

import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

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
    private originalHeight = 45;
    private finalHeight = 37;
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

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;
        if(scrollY >= this.scrollUpperLimit) {
            this.renderer.setStyle(this.el.nativeElement, 'top', `${this.macbookScreenFinalTop}%`);
        }
        else if (scrollY > this.scrollThreshold) {
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
}