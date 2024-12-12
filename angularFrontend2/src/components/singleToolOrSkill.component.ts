import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
    selector: 'SingleToolOrSkill',
    imports: [CommonModule],
    standalone: true,
    templateUrl: '../templates/singleToolOrSkill.component.html',
    styleUrl: '../styles.css',
})
export class SingleToolOrSkill {
    @Input() name!:string;
    @Input() image!:string;
    @Input() backgroundColor!:string;
    @Input() color!:string;
    @Input() usedFor!:string[];
    @Input() index!:number;
    opacity:number = 0;
    intervalIdForIncreasingOpacitySmoothly:any = null;

    constructor(@Inject(PLATFORM_ID) private platformId: Object, private sanitizer: DomSanitizer) {}

    ngOnInit() {
        if (isPlatformBrowser(this.platformId)) {
            setTimeout(() => {
                this.intervalIdForIncreasingOpacitySmoothly = setInterval(() => {
                    this.increaseOpacitySmoothly();
                }, 66)
            }, 60 + this.index*700);
        }
    }

    increaseOpacitySmoothly() {
        this.opacity+=0.06;
        if(this.opacity>=1) {
            clearInterval(this.intervalIdForIncreasingOpacitySmoothly);
        }
    }

    trackUsedForByIndex(index:number, usedFor: string): number {
        return index;
    }

    sanitize(htmlCodeAsString: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(htmlCodeAsString);
    }
}