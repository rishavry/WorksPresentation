import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Component({
    selector: 'SingleTechOrSkill',
    imports: [CommonModule],
    standalone: true,
    templateUrl: '../templates/SingleTechOrSkill.component.html',
})
export class SingleTechOrSkill {
    @Input() index!:number;
    
    @Input() name!:string;
    @Input() type!:string;
    @Input() image!:string;
    
    @Input() backgroundColor!:string;
    @Input() color!:string;

    @Input() usedFor!:string[];

    @Output() notifyParentToShowPopupForTechOrSkill:EventEmitter<any[]> = new EventEmitter<any[]>();

    opacity:number = 0;
    intervalIdForIncreasingOpacitySmoothly:any = null;


    constructor(private sanitizer: DomSanitizer) {}


    ngOnInit() {
        setTimeout(() => {
            this.intervalIdForIncreasingOpacitySmoothly = setInterval(() => {
                this.increaseOpacitySmoothly();
            }, 66)
        }, 60 + this.index*700);
    }


    increaseOpacitySmoothly() {
        this.opacity+= 0.06;

        if(this.opacity >= 1) {
            clearInterval(this.intervalIdForIncreasingOpacitySmoothly);
        }
    }


    trackUsedForByIndex(index:number, usedFor: string): number {
        return index;
    }


    sanitize(htmlCodeAsString: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(htmlCodeAsString);
    }


    showPopupForTechOrSkill() {
        if (this.opacity < 1) {
            return;
        }

        this.notifyParentToShowPopupForTechOrSkill.emit([this.type, this.index]);
    }
}