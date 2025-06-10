import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';


@Component({
	selector: 'TopSection',
	standalone: true,
	imports: [CommonModule, FormsModule, ColorPickerModule],
	templateUrl: '../templates/TopSection.component.html'
})
export class TopSection {
	@Input() currentTheme!:string;

	@Input() readingModeOn!:boolean;
	@Input() readingModeFont!:string;
	@Input() readingModeTextSize!:number;
	@Input() readingModeTextColor!:string;
	@Input() readingModeBackgroundColor!:string;

    @Input() briefIntroRef!:ElementRef;
	@Input() relevantExperienceRef!:ElementRef;
	@Input() technologiesAndSkillsRef!:ElementRef;

	@Output() updateTheme:EventEmitter<string> = new EventEmitter<string>();

	@Output() toggleReadingMode:EventEmitter<any> = new EventEmitter<any>();
	@Output() updateReadingModeFont:EventEmitter<string> = new EventEmitter<string>();
	@Output() updateReadingModeTextSize:EventEmitter<number> = new EventEmitter<number>();
	@Output() updateReadingModeTextColor:EventEmitter<string> = new EventEmitter<string>();
	@Output() updateReadingModeBackgroundColor:EventEmitter<string> = new EventEmitter<string>();

    @Output() scrollToSection:EventEmitter<string> = new EventEmitter<string>();

	@Output() updateDarkScreen:EventEmitter<boolean> = new EventEmitter<boolean>();

	isBriefIntroBeingHovered:boolean = false;
	isRelevantExperienceBeingHovered:boolean = false;
	isTechsAndSkillsBeingHovered:boolean = false;
	isPersonalizeBeingHovered:boolean = false;
	isLinksBeingHovered:boolean = false;
	isMyInfoBeingHovered:boolean = false;

	isMyInfoBigSectionBeingHovered:boolean = false;
	isLinksBigSectionBeingHovered:boolean = false;
	isPersonalizeBigSectionBeingHovered:boolean = false;

	emailAddressWasCopied:boolean = false;
	phoneNumberWasCopied:boolean = false;

	displayFontOptions:boolean = false;

	displayTextSizeSlider:boolean = false
	textSizeSliderValue:number = 1;

	displayTextColorPicker:boolean = false;
	textColorPickerValue:string = '';

	displayBackgroundColorPicker:boolean = false;
	backgroundColorPickerValue:string = '';


	onMouseEnterOfBriefIntro() {
        this.isBriefIntroBeingHovered = true;
    }


	onMouseLeaveOfBriefIntro() {
        this.isBriefIntroBeingHovered = false;
    }


    onMouseEnterOfRelevantExperience() {
        this.isRelevantExperienceBeingHovered = true;
    }


    onMouseLeaveOfRelevantExperience() {
        this.isRelevantExperienceBeingHovered = false;
    }


    onMouseEnterOfTechsAndSkills() {
        this.isTechsAndSkillsBeingHovered = true;
    }


    onMouseLeaveOfTechsAndSkills() {
        this.isTechsAndSkillsBeingHovered = false;
    }


    onMouseEnterOfPersonalize() {
        this.isPersonalizeBeingHovered = true;

		this.updateDarkScreen.emit(true);
    }


	onMouseLeaveOfPersonalize() {
        setTimeout(()=>{
            this.isPersonalizeBeingHovered = false;

            if(!this.isMyInfoBeingHovered && !this.isMyInfoBigSectionBeingHovered &&
			!this.isLinksBeingHovered && !this.isLinksBigSectionBeingHovered &&
			!this.isPersonalizeBigSectionBeingHovered) {
                this.updateDarkScreen.emit(false);
            }
        }, 100);
    }


	onMouseEnterOfLinks() {
        this.isLinksBeingHovered = true;

        this.updateDarkScreen.emit(true);
    }


    onMouseLeaveOfLinks() {
        setTimeout(()=>{
            this.isLinksBeingHovered = false;

            if(!this.isMyInfoBeingHovered && !this.isMyInfoBigSectionBeingHovered &&
			!this.isPersonalizeBeingHovered && !this.isPersonalizeBigSectionBeingHovered &&
			!this.isLinksBigSectionBeingHovered) {
                this.updateDarkScreen.emit(false);
            }
        }, 100);
    }


	onMouseEnterOfMyInfo() {
        this.isMyInfoBeingHovered = true;

        this.updateDarkScreen.emit(true);
    }


    onMouseLeaveOfMyInfo() {
        setTimeout(()=>{
            this.isMyInfoBeingHovered = false;

            if(!this.isLinksBeingHovered && !this.isLinksBigSectionBeingHovered &&
			!this.isPersonalizeBeingHovered && !this.isPersonalizeBigSectionBeingHovered &&
			!this.isMyInfoBigSectionBeingHovered) {
                this.updateDarkScreen.emit(false);
            }
        }, 100);
    }


	onMouseEnterOfMyInfoBigSection() {
        this.isMyInfoBigSectionBeingHovered = true;
    }


    onMouseLeaveOfMyInfoBigSection() {
        setTimeout(()=>{
            this.isMyInfoBigSectionBeingHovered = false;

            if(!this.isLinksBeingHovered && !this.isLinksBigSectionBeingHovered &&
			!this.isPersonalizeBeingHovered && !this.isPersonalizeBigSectionBeingHovered &&
            !this.isMyInfoBeingHovered) {
                this.updateDarkScreen.emit(false);
            }
        }, 100);
    }


	onMouseEnterOfLinksBigSection() {
        this.isLinksBigSectionBeingHovered = true;
    }


    onMouseLeaveOfLinksBigSection() {
        setTimeout(()=>{
            this.isLinksBigSectionBeingHovered = false;

            if(!this.isMyInfoBeingHovered && !this.isMyInfoBigSectionBeingHovered &&
        	!this.isPersonalizeBeingHovered && !this.isPersonalizeBigSectionBeingHovered
			&& !this.isLinksBeingHovered) {
                this.updateDarkScreen.emit(false);
            }
        }, 100);
    }


	onMouseEnterOfPersonalizeBigSection() {
        this.isPersonalizeBigSectionBeingHovered = true;
    }


    onMouseLeaveOfPersonalizeBigSection() {
        setTimeout(()=>{
            this.isPersonalizeBigSectionBeingHovered = false;

            if(!this.isLinksBeingHovered && !this.isLinksBigSectionBeingHovered &&
			!this.isMyInfoBeingHovered &&  !this.isMyInfoBigSectionBeingHovered &&
			!this.isPersonalizeBeingHovered) {
                this.updateDarkScreen.emit(false);
            }
        }, 100);
    }


	copyEmailAddressToClipboard() {
        navigator.clipboard.writeText('rishavray4@gmail.com').then(() => {
            this.emailAddressWasCopied = true;

            setTimeout(() => {
                this.emailAddressWasCopied = false;
            }, 1000);
        }).catch(err => {
            console.error('Error copying email-address to clipboard:', err);
        });
    }


    copyPhoneNumberToClipboard() {
        navigator.clipboard.writeText('608-443-7805').then(() => {
            this.phoneNumberWasCopied = true;

            setTimeout(() => {
                this.phoneNumberWasCopied = false;
            }, 1000);
        }).catch(err => {
            console.error('Error copying phone-number to clipboard:', err);
        });
    }


	changeTheme(newTheme:string) {
        if((this.currentTheme === 'Dark' && newTheme === 'Dark') || (this.currentTheme === 'Light' &&
		newTheme === 'Light') ||  (this.currentTheme.startsWith('System:') && newTheme === 'System')) {
            return;
        }
        
        this.updateTheme.emit(newTheme);
    }


	flipReadingMode() {
        this.toggleReadingMode.emit();
    }

	
    toggleDisplayFontOptions() {
        this.displayFontOptions = !this.displayFontOptions;
    }


	changeReadingModeFont(newFont: string) {
        this.updateReadingModeFont.emit(newFont);

        this.displayFontOptions = false;
    }


	toggleDisplayTextSizeSlider() {
        this.displayTextSizeSlider = !this.displayTextSizeSlider;
    }


    changeReadingModeTextSize() {
        this.updateReadingModeTextSize.emit(this.textSizeSliderValue);

        this.displayTextSizeSlider = false;
    }


    toggleDisplayTextColorPicker() {
        this.displayTextColorPicker = !this.displayTextColorPicker;
    }


    changeReadingModeTextColor() {
        this.updateReadingModeTextColor.emit(this.textColorPickerValue);
        
		this.displayTextColorPicker = false;
    }


    changeReadingModeTextColorToDefault() {
        this.updateReadingModeTextColor.emit('');
        
		this.displayTextColorPicker = false;
    }


    toggleDisplayBackgroundColorPicker() {
        this.displayBackgroundColorPicker = !this.displayBackgroundColorPicker;
    }


    changeReadingModeBackgroundColor() {
        this.updateReadingModeBackgroundColor.emit(this.backgroundColorPickerValue);
        
		this.displayBackgroundColorPicker = false;
    }


    changeReadingModeBackgroundColorToDefault() {
        this.updateReadingModeBackgroundColor.emit('');
        
		this.displayBackgroundColorPicker = false;
    }
}