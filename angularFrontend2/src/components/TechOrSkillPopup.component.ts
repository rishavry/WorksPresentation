import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'TechOrSkillPopup',
    standalone: true,
    imports: [CommonModule],
    templateUrl: '../templates/TechOrSkillPopup.component.html',
    styleUrl: '../styles.css',
})
export class TechOrSkillPopup {
    @Input() currentTheme!:string;
    @Input() technologyOrSkill!:Record<string, any>;
    @Output() notifyParentToCloseThisPopup:EventEmitter<any> = new EventEmitter<any>();

    constructor(private sanitizer: DomSanitizer) {}

    closePopup() {
        this.notifyParentToCloseThisPopup.emit();
    }

    sanitize(htmlCodeAsString: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(htmlCodeAsString);
    }
}