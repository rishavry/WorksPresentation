import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, Input, PLATFORM_ID, Output, EventEmitter} from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
    selector: 'SingleTechOrSkill',
    imports: [CommonModule],
    standalone: true,
    templateUrl: '../templates/SingleTechOrSkill.component.html',
    styleUrl: '../styles.css',
})
export class SingleTechOrSkill {
    @Input() name!:string;
    @Input() type!:string;
    @Input() image!:string;
    @Input() backgroundColor!:string;
    @Input() color!:string;
    @Input() usedFor!:string[];
    @Input() index!:number;
    opacity:number = 0;
    intervalIdForIncreasingOpacitySmoothly:any = null;
    @Output() notifyParentToShowPopupForTechnologyOrSkill:EventEmitter<any[]> = new EventEmitter<any[]>();

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

    showPopupForTechnologyOrSkill() {
        if(this.opacity<1) {
            return;
        }
        this.notifyParentToShowPopupForTechnologyOrSkill.emit([this.type, this.index]);
    }
}