import { CommonModule } from '@angular/common';
import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
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

	@Output() updateTheme:EventEmitter<string> = new EventEmitter<string>();

	@Output() toggleReadingMode:EventEmitter<any> = new EventEmitter<any>();
	@Output() updateReadingModeFont:EventEmitter<string> = new EventEmitter<string>();
	@Output() updateReadingModeTextSize:EventEmitter<number> = new EventEmitter<number>();
	@Output() updateReadingModeTextColor:EventEmitter<string> = new EventEmitter<string>();
	@Output() updateReadingModeBackgroundColor:EventEmitter<string> = new EventEmitter<string>();

	@Output() updateDarkScreen:EventEmitter<boolean> = new EventEmitter<boolean>();

	isBriefIntroBeingHovered:boolean = false;
	isRelevantExperienceBeingHovered:boolean = false;
	isTechnologiesAndSkillsBeingHovered:boolean = false;
	isPersonalizeBeingHovered:boolean = false;
	isLinksBeingHovered:boolean = false;
	isContactMeBeingHovered:boolean = false;

	isContactMeBigSectionBeingHovered:boolean = false;
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

	@ViewChild('briefIntro') briefIntroRef!:ElementRef;
	@ViewChild('relevantExperience') relevantExperienceRef!:ElementRef;
	@ViewChild('technologiesAndSkills') technologiesAndSkillsRef!:ElementRef;


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


    onMouseEnterOfTechnologiesAndSkills() {
        this.isTechnologiesAndSkillsBeingHovered = true;
    }


    onMouseLeaveOfTechnologiesAndSkills() {
        this.isTechnologiesAndSkillsBeingHovered = false;
    }


    onMouseEnterOfPersonalize() {
        this.isPersonalizeBeingHovered = true;

		this.updateDarkScreen.emit(true);
    }


	onMouseLeaveOfPersonalize() {
        setTimeout(()=>{
            this.isPersonalizeBeingHovered = false;

            if(!this.isContactMeBeingHovered && !this.isContactMeBigSectionBeingHovered &&
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

            if(!this.isContactMeBeingHovered && !this.isContactMeBigSectionBeingHovered &&
			!this.isPersonalizeBeingHovered && !this.isPersonalizeBigSectionBeingHovered &&
			!this.isLinksBigSectionBeingHovered) {
                this.updateDarkScreen.emit(false);
            }
        }, 100);
    }


	onMouseEnterOfContactMe() {
        this.isContactMeBeingHovered = true;

        this.updateDarkScreen.emit(true);
    }


    onMouseLeaveOfContactMe() {
        setTimeout(()=>{
            this.isContactMeBeingHovered = false;

            if(!this.isLinksBeingHovered && !this.isLinksBigSectionBeingHovered &&
			!this.isPersonalizeBeingHovered && !this.isPersonalizeBigSectionBeingHovered &&
			!this.isContactMeBigSectionBeingHovered) {
                this.updateDarkScreen.emit(false);
            }
        }, 100);
    }


	onMouseEnterOfContactMeBigSection() {
        this.isContactMeBigSectionBeingHovered = true;
    }


    onMouseLeaveOfContactMeBigSection() {
        setTimeout(()=>{
            this.isContactMeBigSectionBeingHovered = false;

            if(!this.isLinksBeingHovered && !this.isLinksBigSectionBeingHovered &&
			!this.isPersonalizeBeingHovered && !this.isPersonalizeBigSectionBeingHovered &&
            !this.isContactMeBeingHovered) {
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

            if(!this.isContactMeBeingHovered && !this.isContactMeBigSectionBeingHovered &&
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
			!this.isContactMeBeingHovered &&  !this.isContactMeBigSectionBeingHovered &&
			!this.isPersonalizeBeingHovered) {
                this.updateDarkScreen.emit(false);
            }
        }, 100);
    }


	scrollToBriefIntro() {
        this.briefIntroRef.nativeElement?.scrollIntoView({
            behavior: 'smooth'
        });
    }


    scrollToRelevantExperience() {
		this.relevantExperienceRef.nativeElement?.scrollIntoView({
            behavior: 'smooth'
        });
    }
	

    scrollToTechnologiesAndSkills() {
        this.technologiesAndSkillsRef.nativeElement?.scrollIntoView({
            behavior: 'smooth'
        });
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