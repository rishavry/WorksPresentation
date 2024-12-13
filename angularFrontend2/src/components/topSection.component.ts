import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'TopSection',
    standalone: true,
    imports: [CommonModule],
    templateUrl: '../templates/topSection.component.html',
    styleUrl: '../styles.css',
})
export class TopSection {
    isBriefIntroBeingHovered:boolean = false;
    isRelevantExperienceBeingHovered:boolean = false;
    isTechnologiesAndSkillsBeingHovered:boolean = false;
    isGoldenStandardsBeingHovered:boolean = false;
    isPersonalizeBeingHovered:boolean = false;
    isLinksBeingHovered:boolean = false;
    isContactMeBeingHovered:boolean = false;
    emailAddressWasCopied:boolean = false;
    phoneNumberWasCopied:boolean = false;
    @Output() updateDarkScreen: EventEmitter<boolean> = new EventEmitter();
    isContactMeBigSectionBeingHovered:boolean = false;
    isLinksBigSectionBeingHovered:boolean = false;
    isPersonalizeBigSectionBeingHovered:boolean = false;
    @Output() updateTheme: EventEmitter<string> = new EventEmitter();
    @Output() toggleReadingMode: EventEmitter<any> = new EventEmitter();
    @Input() currentTheme!:string;
    @Input() readingModeOn!:boolean;

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

    onMouseEnterOfGoldenStandards() {
        this.isGoldenStandardsBeingHovered = true;
    }

    onMouseLeaveOfGoldenStandards() {
        this.isGoldenStandardsBeingHovered = false;
    }

    onMouseEnterOfPersonalize() {
        this.isPersonalizeBeingHovered = true;
        this.updateDarkScreen.emit(true);
    }

    onMouseLeaveOfPersonalize() {
        setTimeout(()=>{
            this.isPersonalizeBeingHovered = false;
            if(this.isContactMeBeingHovered==false && this.isLinksBigSectionBeingHovered==false
                && this.isContactMeBigSectionBeingHovered==false && this.isLinksBeingHovered==false &&
                this.isPersonalizeBigSectionBeingHovered==false) {
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
            if(this.isContactMeBeingHovered==false && this.isLinksBigSectionBeingHovered==false
                && this.isContactMeBigSectionBeingHovered==false && this.isPersonalizeBeingHovered==false &&
                this.isPersonalizeBigSectionBeingHovered==false) {
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
            if(this.isLinksBeingHovered==false && this.isLinksBigSectionBeingHovered==false && this.isContactMeBigSectionBeingHovered==false
            && this.isPersonalizeBeingHovered==false && this.isPersonalizeBigSectionBeingHovered==false) {
                this.updateDarkScreen.emit(false);
            }
        }, 100);
    }

    scrollToBriefIntro() {
        document.getElementById("briefIntro")?.scrollIntoView({
            behavior: 'smooth'
        });
    }

    scrollToRelevantExperience() {
        document.getElementById("relevantExperience")?.scrollIntoView({
            behavior: 'smooth'
        });
    }

    scrollToTechnologiesAndSkills() {
        document.getElementById("technologiesAndSkills")?.scrollIntoView({
            behavior: 'smooth'
        });
    }

    scrollToGoldenStandards() {
        document.getElementById("goldenStandards")?.scrollIntoView({
            behavior: 'smooth'
        });
    }

    copyEmailAddressToClipboard() {
        navigator.clipboard.writeText("rishavray4@gmail.com").then(() => {
            this.emailAddressWasCopied = true;
            setTimeout(() => {
                this.emailAddressWasCopied = false;
            }, 1000);
        }).catch(err => {
            console.error('Error copying text to clipboard:', err);
        });
    }

    copyPhoneNumberToClipboard() {
        navigator.clipboard.writeText("608-443-7805").then(() => {
            this.phoneNumberWasCopied = true;
            setTimeout(() => {
                this.phoneNumberWasCopied = false;
            }, 1000);
        }).catch(err => {
            console.error('Error copying text to clipboard:', err);
        });
    }

    onMouseEnterOfContactMeBigSection() {
        this.isContactMeBigSectionBeingHovered = true;
    }

    onMouseLeaveOfContactMeBigSection() {
        setTimeout(()=>{
            this.isContactMeBigSectionBeingHovered = false;
            if(this.isContactMeBeingHovered==false && this.isLinksBeingHovered==false &&
            this.isLinksBigSectionBeingHovered==false && this.isPersonalizeBeingHovered==false &&
            this.isPersonalizeBigSectionBeingHovered==false) {
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
            if(this.isContactMeBeingHovered==false && this.isLinksBeingHovered==false && this.isContactMeBigSectionBeingHovered==false
            && this.isPersonalizeBeingHovered==false && this.isPersonalizeBigSectionBeingHovered==false) {
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
            if(this.isContactMeBeingHovered==false && this.isLinksBeingHovered==false && this.isContactMeBigSectionBeingHovered==false
            && this.isPersonalizeBeingHovered==false) {
                this.updateDarkScreen.emit(false);
            }
        }, 100);
    }

    changeTheme(newTheme:string) {
        if((this.currentTheme==='Dark' && newTheme==='Dark') || (this.currentTheme==='Light' && newTheme==='Light') ||
        (this.currentTheme.startsWith('System:') && newTheme==='System')) {
            return;
        }
        this.updateTheme.emit(newTheme);
    }

    flipReadingMode() {
        this.toggleReadingMode.emit();
    }
}
