import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
    selector: 'TechOrSkillPopup',
    standalone: true,
    imports: [CommonModule],
    templateUrl: '../templates/TechOrSkillPopup.component.html',
})
export class TechOrSkillPopup {
    @Input() currentTheme!:string;

    @Input() techOrSkill!:any;

    @Output() closePopup:EventEmitter<any> = new EventEmitter<any>();


    constructor(private sanitizer: DomSanitizer) {}


    sanitize(htmlCodeAsString: string) {
        return this.sanitizer.bypassSecurityTrustHtml(htmlCodeAsString);
    }
}