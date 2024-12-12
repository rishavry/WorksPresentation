import { CommonModule } from '@angular/common';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
    selector: 'ToolOrSkillPopup',
    standalone: true,
    imports: [CommonModule],
    templateUrl: '../templates/toolOrSkillPopup.component.html',
    styleUrl: '../styles.css',
})
export class ToolOrSkillPopup {
    @Input() currentTheme!:string;
    @Input() toolOrSkill!:Record<string, any>;
    @Output() notifyParentToCloseThisPopup:EventEmitter<any> = new EventEmitter<any>();

    constructor(private sanitizer: DomSanitizer) {}

    closePopup() {
        this.notifyParentToCloseThisPopup.emit();
    }

    sanitize(htmlCodeAsString: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(htmlCodeAsString);
    }
}