import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';


@Component({
    selector: 'PenultimateSection',
    templateUrl: '../templates/PenultimateSection.component.html',
    standalone: true,
    imports: [CommonModule]
})
export class PenultimateSection {
    @Input() currentTheme!:string;
    
    @Input() displayDarkScreen!:boolean;

    @Output() closeAllPopups:EventEmitter<any> = new EventEmitter<any>();

    @ViewChild('penultimateSectionText0') penultimateSectionText0Ref!:ElementRef;
    @ViewChild('penultimateSectionText1') penultimateSectionText1Ref!:ElementRef;
    @ViewChild('penultimateSectionText2') penultimateSectionText2Ref!:ElementRef;
    @ViewChild('penultimateSectionText3') penultimateSectionText3Ref!:ElementRef;
    @ViewChild('penultimateSectionText4') penultimateSectionText4Ref!:ElementRef;
    @ViewChild('penultimateSectionText5') penultimateSectionText5Ref!:ElementRef;


    onClickingDarkScreen() {
        this.closeAllPopups.emit();
    }
    

    getAllTextRefsInOrder() {
        return [
            this.penultimateSectionText0Ref,
            this.penultimateSectionText1Ref,
            this.penultimateSectionText2Ref,
            this.penultimateSectionText3Ref,
            this.penultimateSectionText4Ref,
            this.penultimateSectionText5Ref
        ];
    }
}
