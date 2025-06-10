import { BriefIntro } from '../components/BriefIntro.component';
import { LastSection } from '../components/LastSection.component';
import { PenultimateSection } from '../components/PenultimateSection.component';
import { RelevantExperience } from '../components/RelevantExperience.component';
import { TechOrSkillPopup } from '../components/TechOrSkillPopup.component';
import { TopSection } from '../components/TopSection.component';
import { TechsAndSkillsUsed } from '../components/TechsAndSkillsUsed.component';

import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ColorPickerModule } from 'ngx-color-picker';


@Component({
    selector: 'MainPage',
    standalone: true,
    imports: [CommonModule, FormsModule, ColorPickerModule, TopSection, BriefIntro, RelevantExperience, TechsAndSkillsUsed,
    TechOrSkillPopup, PenultimateSection, LastSection],
    templateUrl: './MainPage.component.html',
    styleUrl: '../styles.css'
})
export class MainPage {
    currentTheme:string = 'System: X';

    readingModeOn:boolean = false;
    readingModeFont:string = 'Default (mix of all the options)';
    readingModeTextSize:number = 1;
    readingModeTextColor:string = '';
    readingModeBackgroundColor:string = '';

    initialAnimationsAreFinished:boolean = false;

    displayDarkScreen:boolean = false;

    displayRelevantExperienceSectionMacbookIcon:boolean = true;

    colorWaveAnimation0PercentKeyFrameRule!:CSSKeyframeRule;
    colorWaveAnimation100PercentKeyFrameRule!:CSSKeyframeRule;

    darkModeQuery!:any;

    displayTechOrSkillsPopup:boolean = false;
    techOrSkillForPopup:any = {};

    userIsAtTheTop:boolean = true;

    displayMiniReadingModeSettings:boolean = true;
    displayMiniFontSettings:boolean = false;
    displayMiniTextSizeSettings:boolean = false;
    displayMiniTextColorSettings:boolean = false;
    displayMiniBackgroundColorSettings:boolean = false;

    fullStackTechsAndSkillsUsedHaveBeenShown:boolean = false;
    frontendTechsAndSkillsUsedHaveBeenShown:boolean = false;
    backendTechsAndSkillsUsedHaveBeenShown:boolean = false;
    dataAndTheCloudTechsAndSkillsUsedHaveBeenShown:boolean = false;

    @ViewChild(BriefIntro) briefIntroRef!:BriefIntro;
    @ViewChild(RelevantExperience) relevantExperienceRef!:RelevantExperience;
    @ViewChild(TechsAndSkillsUsed) techsAndSkillsUsedRef!:TechsAndSkillsUsed;
    @ViewChild(PenultimateSection) penultimateSectionRef!:PenultimateSection;


    constructor(private route: ActivatedRoute) { }


    ngOnInit() {
        document.title = 'About My Works';

        const sheets = Array.from(document.styleSheets);
        let rules1WereFound = false;

        for (let sheet of sheets) {
            let rules;
            try {
                rules = Array.from(sheet.cssRules);
            }
            catch (error) {
                continue;
            }

            for (let rule of rules) {
                if (rule instanceof CSSKeyframesRule && rule.name === 'colorWaveAnimation') {
                    this.colorWaveAnimation0PercentKeyFrameRule = (rule.cssRules[0] as CSSKeyframeRule);
                    this.colorWaveAnimation100PercentKeyFrameRule = (rule.cssRules[2] as CSSKeyframeRule);
                    rules1WereFound = true;
                }

                if(rules1WereFound) {
                    break;
                }
            }

            if(rules1WereFound) {
                break;
            }
        }

        const readingMode = this.route.snapshot.queryParamMap.get('readingMode');
        const font = this.route.snapshot.queryParamMap.get('font');
        const textSize = this.route.snapshot.queryParamMap.get('textSize');
        const textColor = this.route.snapshot.queryParamMap.get('textColor');
        const backgroundColor = this.route.snapshot.queryParamMap.get('backgroundColor');

        if(readingMode !== null) {
            this.readingModeOn = readingMode === 'True' || readingMode === 'true';
            
            if(font !== null) {
                this.readingModeFont = font;
            }

            if(textSize !== null) {
                this.readingModeTextSize = parseFloat(textSize);
            }

            if(textColor !== null) {
                this.readingModeTextColor = '#' + textColor;
            }

            if(backgroundColor !== null) {
                this.readingModeBackgroundColor = '#' + backgroundColor;
            }
        }

        if (typeof window !== 'undefined') {
            const theme = this.route.snapshot.queryParamMap.get('theme');

            this.darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

            if(theme == null) {
                if (this.darkModeQuery.matches) {
                    this.currentTheme = 'System: Dark';

                    this.enableDarkMode();
                }
                else {
                    this.currentTheme = 'System: Light';
                }

                this.darkModeQuery.addEventListener('change', (event:any) => this.handleChangeOfSystemTheme(event));
            }
            else if (theme === 'Dark' || theme === 'Light') {
                this.currentTheme = theme;

                if(this.currentTheme === 'Dark') {
                   this.enableDarkMode();            
                }
            }

            window.addEventListener('scroll', () => this.onScroll());
        }
    }


    updateTheme(newTheme:string) {
        if(newTheme === 'System') {
            if (!this.darkModeQuery.matches) {
                this.currentTheme = 'System: Light';
            }
            else {
                this.currentTheme = 'System: Dark';
            }

            this.darkModeQuery.addEventListener('change', (event:any) => this.handleChangeOfSystemTheme(event));
        }
        else {
            this.currentTheme = newTheme;

            this.darkModeQuery.removeEventListener('change', (event:any) => this.handleChangeOfSystemTheme(event));
        }

        if(this.currentTheme.endsWith('Dark')) {
            this.enableDarkMode();
        }
        else {
           this.enableLightMode();
        }
    }


    toggleReadingMode() {
        this.readingModeOn = !this.readingModeOn;

        this.updateURLOfPageAfterUserPersonalization();
    }


    updateReadingModeFont(newFont: string) {
        this.readingModeFont = newFont;

        this.updateURLOfPageAfterUserPersonalization();
    }


    updateReadingModeTextSize(newTextSize: number) {
        this.readingModeTextSize = newTextSize;

        this.updateURLOfPageAfterUserPersonalization();
    }


    updateReadingModeTextColor(newTextColor: string) {
        this.readingModeTextColor = newTextColor;

        this.updateURLOfPageAfterUserPersonalization();
    }


    updateReadingModeBackgroundColor(newBackgroundColor: string) {
        this.readingModeBackgroundColor = newBackgroundColor;

        this.updateURLOfPageAfterUserPersonalization();
    }


    updateURLOfPageAfterUserPersonalization() {
        let newURL = 'https://the-works-of-rishav-ray.com';
            
        if(this.readingModeOn || !this.currentTheme.startsWith('System:')) {
            newURL+='?';
            if(this.readingModeOn) {
                newURL+='readingMode=True';

                if(this.readingModeFont!=='Default (mix of all the options)') {
                    newURL+=`&font=${this.readingModeFont}`;
                }

                if (this.readingModeTextSize !== 1) {
                    newURL+=`&textSize=${this.readingModeTextSize}`;
                }

                if (this.readingModeTextColor.length > 0) {
                    newURL+=`&textColor=${this.readingModeTextColor.substring(1)}`;
                }

                if (this.readingModeBackgroundColor.length > 0) {
                    newURL+=`&backgroundColor=${this.readingModeBackgroundColor.substring(1)}`;
                }

                if (!this.currentTheme.startsWith('System:')) {
                    newURL+=`&theme=${this.currentTheme}`;
                }
            }
            else {
                newURL+=`theme=${this.currentTheme}`;
            }
        }

        history.pushState(null, 'About My Works', newURL);
    }


    updateDarkScreen(newDisplayDarkScreen:boolean) {
        this.displayDarkScreen = newDisplayDarkScreen;
    }


    enableLightMode() {
        document.body.style.removeProperty('background-color');
        document.body.style.removeProperty('color');

        document.querySelectorAll('.iconToBeAdjustedForDarkMode').forEach((iconRef:any) => {
            iconRef.style.removeProperty('filter');
        });

        this.colorWaveAnimation0PercentKeyFrameRule.style.setProperty('color', 'black');
        this.colorWaveAnimation100PercentKeyFrameRule.style.setProperty('color', 'black');

        if (!this.readingModeOn) {
            this.updateBgColorOfRelevantExperienceSection();
            this.updateTextColorsOfPenultimateSection();
        }

        this.updateURLOfPageAfterUserPersonalization();
    }


    enableDarkMode() {
        document.body.style.setProperty('background-color', '#282929', 'important');
        document.body.style.setProperty('color', 'white', 'important');

        document.querySelectorAll('.iconToBeAdjustedForDarkMode').forEach((iconRef:any) => {
            iconRef.style.setProperty('filter', 'brightness(5) contrast(0)', 'important');
        });

        this.colorWaveAnimation0PercentKeyFrameRule.style.setProperty('color', 'white');
        this.colorWaveAnimation100PercentKeyFrameRule.style.setProperty('color', 'white');

        if (!this.readingModeOn) {
            this.updateBgColorOfRelevantExperienceSection();
            this.updateTextColorsOfPenultimateSection();
        }

        this.updateURLOfPageAfterUserPersonalization();
    }


    handleChangeOfSystemTheme(event:any) {
        if (event.matches) {
            this.currentTheme = 'System: Dark';
           
            this.enableDarkMode();
        }
        else {
            this.currentTheme = 'System: Light';
    
            this.enableLightMode();
        }
    }


    closeAllPopupsAfterClickingDarkScreen() {
        this.displayTechOrSkillsPopup = false;
        this.displayDarkScreen = false;
    }


    onScroll() {
        this.userIsAtTheTop = window.scrollY === 0;

        if (!this.readingModeOn) {
            this.updateBgColorOfRelevantExperienceSection();
            this.updateDisplayMacbookAndPaddingTopOfRelevantExperienceSection();
    
            if (!this.fullStackTechsAndSkillsUsedHaveBeenShown) {
                this.showTheFullStackTechsAndSkillsUsed();
            }
    
            if (!this.frontendTechsAndSkillsUsedHaveBeenShown) {
                this.showTheFrontendTechsAndSkillsUsed();
            }
    
            if (!this.backendTechsAndSkillsUsedHaveBeenShown) {
                this.showTheBackendTechsAndSkillsUsed();
            }
    
            if (!this.dataAndTheCloudTechsAndSkillsUsedHaveBeenShown) {
                this.showTheDataAndTheCloudTechsAndSkillsUsed();
            }
    
            this.updateMarginBottomOfTechsAndSkillsUsedDescriptionText();
            this.updateMarginBottomOfTechsAndSkillsUsedFullStackElementsDiv();
            this.updateMarginBottomOfTechsAndSkillsUsedFrontendElementsDiv();
            this.updateMarginBottomOfTechsAndSkillsUsedBackendElementsDiv();
    
            this.updateTextColorsOfPenultimateSection();
        }
    }


    showTechOrSkillPopup(techOrSkillForPopup:any) {
        this.techOrSkillForPopup = techOrSkillForPopup;
        this.displayDarkScreen = true;
        this.displayTechOrSkillsPopup = true;
    }


    scrollToTheTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }


    scrollToTheBottom() {
        window.scrollTo({
            top: document.body.scrollHeight,
            behavior: 'smooth'
        });
    }


    scrollToSection(section:string) {
        if (section === 'briefIntro' && this.briefIntroRef) {
            const refToScrollTo = this.briefIntroRef.getBriefIntroRef();

            if (refToScrollTo) {
                refToScrollTo.nativeElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }

        else if (section === 'relevantExperience') {
            const refToScrollTo = this.relevantExperienceRef.getRelevantExperienceRef();

            if (refToScrollTo) {
                refToScrollTo.nativeElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }

        else {
            const refToScrollTo = this.techsAndSkillsUsedRef.getTechsAndSkillsUsedRef();

            if (refToScrollTo) {
                refToScrollTo.nativeElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        }
    }


    updateBgColorOfRelevantExperienceSection() {
        if (this.briefIntroRef && this.relevantExperienceRef) {
            const briefIntroReadingModeOffRef = this.briefIntroRef.getReadingModeOffRef();
            const relevantExperienceReadingModeOffRef = this.relevantExperienceRef.getReadingModeOffRef();

            if (briefIntroReadingModeOffRef && relevantExperienceReadingModeOffRef) {
                const briefIntroRect = briefIntroReadingModeOffRef.nativeElement.getBoundingClientRect();
                const relevantExperienceRect = relevantExperienceReadingModeOffRef.nativeElement.getBoundingClientRect();

                const userIsInSweetSpot = window.innerHeight > briefIntroRect.bottom && window.innerHeight <
                relevantExperienceRect.bottom;
                
                if (userIsInSweetSpot) {
                    const currDistanceScrolled = window.innerHeight - briefIntroRect.bottom;
                    const distanceBetweenTwoRectBottoms = relevantExperienceRect.bottom - briefIntroRect.bottom;

                    let newColor1RGB!:number[];
                    let newColor2RGB!:number[];

                    if (this.currentTheme.endsWith('Light')) {
                        newColor1RGB = [
                            255 + (0 - 255) * currDistanceScrolled/distanceBetweenTwoRectBottoms,
                            255 + (102 - 255) * currDistanceScrolled/distanceBetweenTwoRectBottoms,
                            255
                        ];

                        newColor2RGB = [
                            255 + (204 - 255) * currDistanceScrolled/distanceBetweenTwoRectBottoms,
                            255,
                            255
                        ];
                    }
                    else {
                        newColor1RGB = [
                            0,
                            0,
                            0 + 102 * currDistanceScrolled/distanceBetweenTwoRectBottoms,
                        ];

                        newColor2RGB = [
                            0 + 128 * currDistanceScrolled/distanceBetweenTwoRectBottoms,
                            0,
                            0
                        ];
                    }

                    relevantExperienceReadingModeOffRef.nativeElement.style.setProperty(
                        'background',
                        `linear-gradient(to bottom right,
                        rgb(${newColor1RGB[0]}, ${newColor1RGB[1]}, ${newColor1RGB[2]}) 0%,
                        rgb(${newColor2RGB[0]}, ${newColor2RGB[1]}, ${newColor2RGB[2]}) 100%)`
                    );
                }
            }
        }
    }


    updateDisplayMacbookAndPaddingTopOfRelevantExperienceSection() {
        if (this.briefIntroRef && this.relevantExperienceRef) {
            const briefIntroReadingModeOffRef = this.briefIntroRef.getReadingModeOffRef();
            const relevantExperienceReadingModeOffRef = this.relevantExperienceRef.getReadingModeOffRef();

            if (briefIntroReadingModeOffRef && relevantExperienceReadingModeOffRef) {
                const briefIntroRect = briefIntroReadingModeOffRef.nativeElement.getBoundingClientRect();
                const relevantExperienceRect = relevantExperienceReadingModeOffRef.nativeElement.getBoundingClientRect();

                const currDistanceScrolled = window.innerHeight - briefIntroRect.bottom;
                const distanceBetweenTwoRectBottoms = relevantExperienceRect.bottom - briefIntroRect.bottom;
                const proportionOfDistanceScrolled = currDistanceScrolled/distanceBetweenTwoRectBottoms

                if (proportionOfDistanceScrolled < 0.8) {
                    this.displayRelevantExperienceSectionMacbookIcon = true;
                }
                else {
                    this.displayRelevantExperienceSectionMacbookIcon = false;
                }

                if (proportionOfDistanceScrolled > 0 && proportionOfDistanceScrolled < 1) {
                    const newPaddingTop = 45 - 40 * proportionOfDistanceScrolled;

                    relevantExperienceReadingModeOffRef.nativeElement.style.setProperty(
                        'padding-top',
                        `${newPaddingTop}em`
                    );
                }
            }
        }
    }


    showTheFullStackTechsAndSkillsUsed() {
        if (this.relevantExperienceRef && this.techsAndSkillsUsedRef) {
            const relevantExperienceReadingModeOffRef = this.relevantExperienceRef.getReadingModeOffRef();
            const techsAndSkillsUsedFullStackTextRef = this.techsAndSkillsUsedRef.getTechsAndSkillsUsedFullStackTextRef();

            if (relevantExperienceReadingModeOffRef && techsAndSkillsUsedFullStackTextRef) {
                const relevantExperienceRect = relevantExperienceReadingModeOffRef.nativeElement.getBoundingClientRect();
                const techsAndSkillsUsedFullStackTextRect = techsAndSkillsUsedFullStackTextRef.nativeElement.getBoundingClientRect();

                const currDistanceScrolled = window.innerHeight - relevantExperienceRect.bottom;
                const distanceBetweenTwoRectBottoms = techsAndSkillsUsedFullStackTextRect.bottom - relevantExperienceRect.bottom;
                const proportionOfDistanceScrolled = currDistanceScrolled/distanceBetweenTwoRectBottoms;

                if (proportionOfDistanceScrolled >= 1.5) {
                    this.fullStackTechsAndSkillsUsedHaveBeenShown = true;
                }
            }
        }
    }


    showTheFrontendTechsAndSkillsUsed() {
        if (this.techsAndSkillsUsedRef) {
            const techsAndSkillsUsedFullStackTextRef = this.techsAndSkillsUsedRef.getTechsAndSkillsUsedFullStackTextRef();
            const techsAndSkillsUsedFrontendTextRef = this.techsAndSkillsUsedRef.getTechsAndSkillsUsedFrontendTextRef();

            if (techsAndSkillsUsedFullStackTextRef && techsAndSkillsUsedFrontendTextRef) {
                const techsAndSkillsUsedFullStackTextRect = techsAndSkillsUsedFullStackTextRef.nativeElement.getBoundingClientRect();
                const techsAndSkillsUsedFrontendTextRect = techsAndSkillsUsedFrontendTextRef.nativeElement.getBoundingClientRect();

                const currDistanceScrolled = window.innerHeight - techsAndSkillsUsedFullStackTextRect.bottom;
                const distanceBetweenTwoRectBottoms = techsAndSkillsUsedFrontendTextRect.bottom -
                techsAndSkillsUsedFullStackTextRect.bottom;
                const proportionOfDistanceScrolled = currDistanceScrolled/distanceBetweenTwoRectBottoms;

                if (proportionOfDistanceScrolled >= 1.25) {
                    this.frontendTechsAndSkillsUsedHaveBeenShown = true;
                }
            }
        }
    }


    showTheBackendTechsAndSkillsUsed() {
        if (this.techsAndSkillsUsedRef) {
            const techsAndSkillsUsedFrontendTextRef = this.techsAndSkillsUsedRef.getTechsAndSkillsUsedFrontendTextRef();
            const techsAndSkillsUsedBackendTextRef = this.techsAndSkillsUsedRef.getTechsAndSkillsUsedBackendTextRef();

            if (techsAndSkillsUsedFrontendTextRef && techsAndSkillsUsedBackendTextRef) {
                const techsAndSkillsUsedFrontendTextRect = techsAndSkillsUsedFrontendTextRef.nativeElement.getBoundingClientRect();
                const techsAndSkillsUsedBackendTextRect = techsAndSkillsUsedBackendTextRef.nativeElement.getBoundingClientRect();

                const currDistanceScrolled = window.innerHeight - techsAndSkillsUsedFrontendTextRect.bottom;
                const distanceBetweenTwoRectBottoms = techsAndSkillsUsedBackendTextRect.bottom -
                techsAndSkillsUsedFrontendTextRect.bottom;
                const proportionOfDistanceScrolled = currDistanceScrolled/distanceBetweenTwoRectBottoms;

                if (proportionOfDistanceScrolled >= 1.25) {
                    this.backendTechsAndSkillsUsedHaveBeenShown = true;
                }
            }
        }
    }


    showTheDataAndTheCloudTechsAndSkillsUsed() {
        if (this.techsAndSkillsUsedRef) {
            const techsAndSkillsUsedBackendTextRef = this.techsAndSkillsUsedRef.getTechsAndSkillsUsedBackendTextRef();
            const techsAndSkillsUsedDataAndTheCloudTextRef = this.techsAndSkillsUsedRef.getTechsAndSkillsUsedDataAndTheCloudTextRef();

            if (techsAndSkillsUsedBackendTextRef && techsAndSkillsUsedDataAndTheCloudTextRef) {
                const techsAndSkillsUsedBackendTextRect = techsAndSkillsUsedBackendTextRef.nativeElement.getBoundingClientRect();
                const techsAndSkillsUsedDataAndTheCloudTextRect = techsAndSkillsUsedDataAndTheCloudTextRef.nativeElement
                .getBoundingClientRect();

                const currDistanceScrolled = window.innerHeight - techsAndSkillsUsedBackendTextRect.bottom;
                const distanceBetweenTwoRectBottoms = techsAndSkillsUsedDataAndTheCloudTextRect.bottom -
                techsAndSkillsUsedBackendTextRect.bottom;
                const proportionOfDistanceScrolled = currDistanceScrolled/distanceBetweenTwoRectBottoms;

                if (proportionOfDistanceScrolled >= 1.25) {
                    this.dataAndTheCloudTechsAndSkillsUsedHaveBeenShown = true;
                }
            }
        }
    }


    updateMarginBottomOfTechsAndSkillsUsedDescriptionText() {
        if (this.relevantExperienceRef && this.techsAndSkillsUsedRef) {
            const relevantExperienceReadingModeOffRef = this.relevantExperienceRef.getReadingModeOffRef();
            const techsAndSkillsUsedFullStackTextRef = this.techsAndSkillsUsedRef.getTechsAndSkillsUsedFullStackTextRef();
            const techsAndSkillsUsedDescriptionTextRef = this.techsAndSkillsUsedRef.getTechsAndSkillsUsedDescriptionTextRef();

            if (relevantExperienceReadingModeOffRef && techsAndSkillsUsedFullStackTextRef &&
            techsAndSkillsUsedDescriptionTextRef) {
                const relevantExperienceRect = relevantExperienceReadingModeOffRef.nativeElement.getBoundingClientRect();
                const techsAndSkillsUsedFullStackTextRect = techsAndSkillsUsedFullStackTextRef.nativeElement.getBoundingClientRect();

                const currDistanceScrolled = window.innerHeight - relevantExperienceRect.bottom;
                const distanceBetweenTwoRectBottoms = techsAndSkillsUsedFullStackTextRect.bottom - relevantExperienceRect.bottom;
                const proportionOfDistanceScrolled = currDistanceScrolled/distanceBetweenTwoRectBottoms;

                if (proportionOfDistanceScrolled > 0 && proportionOfDistanceScrolled <= 3) {
                    techsAndSkillsUsedDescriptionTextRef.nativeElement.style.setProperty(
                        'margin-bottom',
                        `${50 - 52*(proportionOfDistanceScrolled/3)}em`
                    );
                }
            }
        }
    }


    updateMarginBottomOfTechsAndSkillsUsedFullStackElementsDiv() {
        if (this.techsAndSkillsUsedRef) {
            const techsAndSkillsUsedFrontendTextRef = this.techsAndSkillsUsedRef.getTechsAndSkillsUsedFrontendTextRef();
            const techsAndSkillsUsedFullStackTextRef = this.techsAndSkillsUsedRef.getTechsAndSkillsUsedFullStackTextRef();
            const techsAndSkillsUsedFullStackElementsDivRef =
            this.techsAndSkillsUsedRef.getTechsAndSkillsUsedFullStackElementsDivRef();

            if (techsAndSkillsUsedFrontendTextRef && techsAndSkillsUsedFullStackTextRef &&
            techsAndSkillsUsedFullStackElementsDivRef) {
                const techsAndSkillsUsedFrontendTextRect = techsAndSkillsUsedFrontendTextRef.nativeElement.getBoundingClientRect();
                const techsAndSkillsUsedFullStackTextRect = techsAndSkillsUsedFullStackTextRef.nativeElement.getBoundingClientRect();

                const currDistanceScrolled = window.innerHeight - techsAndSkillsUsedFullStackTextRect.bottom;
                const distanceBetweenTwoRectBottoms =
                techsAndSkillsUsedFrontendTextRect.bottom - techsAndSkillsUsedFullStackTextRect.bottom;
                const proportionOfDistanceScrolled = currDistanceScrolled/distanceBetweenTwoRectBottoms;

                if (proportionOfDistanceScrolled > 0 && proportionOfDistanceScrolled <= 1.7) {
                    techsAndSkillsUsedFullStackElementsDivRef.nativeElement.style.setProperty(
                        'margin-bottom',
                        `${50 - 50*(proportionOfDistanceScrolled/1.7)}em`
                    );
                }
            }
        }
    }


    updateMarginBottomOfTechsAndSkillsUsedFrontendElementsDiv() {
        if (this.techsAndSkillsUsedRef) {
            const techsAndSkillsUsedBackendTextRef = this.techsAndSkillsUsedRef.getTechsAndSkillsUsedBackendTextRef();
            const techsAndSkillsUsedFrontendTextRef = this.techsAndSkillsUsedRef.getTechsAndSkillsUsedFrontendTextRef();
            const techsAndSkillsUsedFrontendElementsDivRef =
            this.techsAndSkillsUsedRef.getTechsAndSkillsUsedFrontendElementsDivRef();

            if (techsAndSkillsUsedFrontendTextRef && techsAndSkillsUsedBackendTextRef &&
            techsAndSkillsUsedFrontendElementsDivRef) {
                const techsAndSkillsUsedBackendTextRect = techsAndSkillsUsedBackendTextRef.nativeElement.getBoundingClientRect();
                const techsAndSkillsUsedFrontendTextRect = techsAndSkillsUsedFrontendTextRef.nativeElement.getBoundingClientRect();

                const currDistanceScrolled = window.innerHeight - techsAndSkillsUsedFrontendTextRect.bottom;
                const distanceBetweenTwoRectBottoms =
                techsAndSkillsUsedBackendTextRect.bottom - techsAndSkillsUsedFrontendTextRect.bottom;
                const proportionOfDistanceScrolled = currDistanceScrolled/distanceBetweenTwoRectBottoms;

                if (proportionOfDistanceScrolled > 0 && proportionOfDistanceScrolled <= 1.7) {
                    techsAndSkillsUsedFrontendElementsDivRef.nativeElement.style.setProperty(
                        'margin-bottom',
                        `${50 - 50*(proportionOfDistanceScrolled/1.7)}em`
                    );
                }
            }
        }
    }


    updateMarginBottomOfTechsAndSkillsUsedBackendElementsDiv() {
        if (this.techsAndSkillsUsedRef) {
            const techsAndSkillsUsedDataAndTheCloudTextRef = this.techsAndSkillsUsedRef
            .getTechsAndSkillsUsedDataAndTheCloudTextRef();
            const techsAndSkillsUsedBackendTextRef = this.techsAndSkillsUsedRef.getTechsAndSkillsUsedBackendTextRef();
            const techsAndSkillsUsedBackendElementsDivRef =
            this.techsAndSkillsUsedRef.getTechsAndSkillsUsedBackendElementsDivRef();

            if (techsAndSkillsUsedDataAndTheCloudTextRef && techsAndSkillsUsedBackendTextRef &&
            techsAndSkillsUsedBackendElementsDivRef) {
                const techsAndSkillsUsedDataAndTheCloudTextRect = techsAndSkillsUsedDataAndTheCloudTextRef.nativeElement
                .getBoundingClientRect();
                const techsAndSkillsUsedBackendTextRect = techsAndSkillsUsedBackendTextRef.nativeElement.getBoundingClientRect();

                const currDistanceScrolled = window.innerHeight - techsAndSkillsUsedBackendTextRect.bottom;
                const distanceBetweenTwoRectBottoms =
                techsAndSkillsUsedDataAndTheCloudTextRect.bottom - techsAndSkillsUsedBackendTextRect.bottom;
                const proportionOfDistanceScrolled = currDistanceScrolled/distanceBetweenTwoRectBottoms;

                if (proportionOfDistanceScrolled > 0 && proportionOfDistanceScrolled <= 1.7) {
                techsAndSkillsUsedBackendElementsDivRef.nativeElement.style.setProperty(
                        'margin-bottom',
                        `${50 - 50*(proportionOfDistanceScrolled/1.7)}em`
                    );
                }
            }
        }
    }


    updateTextColorsOfPenultimateSection() {
        if (this.penultimateSectionRef) {
            let indexOfFocusedPenultimateSectionTextRef = -1;

            const allPenultimateSectionTextRefsInOrder = this.penultimateSectionRef.getAllTextRefsInOrder();

            for (let i=0; i<allPenultimateSectionTextRefsInOrder.length; i++) {
                const textRef = allPenultimateSectionTextRefsInOrder[i];
                
                if (textRef) {
                    const rect = textRef.nativeElement.getBoundingClientRect();
                    const isAboveBottomEdgeOfViewport = rect.bottom < window.innerHeight;
    
                    if (isAboveBottomEdgeOfViewport) {
                        indexOfFocusedPenultimateSectionTextRef = i;
                    }
                }
            }

            for (let i=0; i<allPenultimateSectionTextRefsInOrder.length; i++) {
                const textRef = allPenultimateSectionTextRefsInOrder[i];

                if (textRef) {
                    if (this.currentTheme.endsWith('Light')) {
                        if (i == indexOfFocusedPenultimateSectionTextRef) {
                            textRef.nativeElement.style.setProperty('color', 'black');
                        }
                        else {
                            textRef.nativeElement.style.setProperty('color', 'white');
                        }
                    }
                    else {
                        if (i == indexOfFocusedPenultimateSectionTextRef) {
                            textRef.nativeElement.style.setProperty('color', 'white');
                        }
                        else {
                            textRef.nativeElement.style.setProperty('color', 'black');
                        }
                    }
                }
            }
        }
    }


    toggleDisplayMiniReadingModeSettings() {
        this.displayMiniReadingModeSettings = !this.displayMiniReadingModeSettings;
    }


    toggleDisplayMiniFontSettings() {
        this.displayMiniFontSettings = !this.displayMiniFontSettings;

        if(this.displayMiniFontSettings) {
            this.displayMiniTextSizeSettings = false;
            this.displayMiniTextColorSettings = false;
            this.displayMiniBackgroundColorSettings = false;
        }
    }


    toggleDisplayMiniTextSizeSettings() {
        this.displayMiniTextSizeSettings = !this.displayMiniTextSizeSettings;

        if(this.displayMiniTextSizeSettings) {
            this.displayMiniFontSettings = false;
            this.displayMiniTextColorSettings = false;
            this.displayMiniBackgroundColorSettings = false;
        }
    }


    toggleDisplayMiniTextColorSettings() {
        this.displayMiniTextColorSettings = !this.displayMiniTextColorSettings;

        if(this.displayMiniTextColorSettings) {
            this.displayMiniFontSettings = false;
            this.displayMiniTextSizeSettings = false;
            this.displayMiniBackgroundColorSettings = false;
        }
    }


    toggleDisplayMiniBackgroundTextColorSettings() {
        this.displayMiniBackgroundColorSettings = !this.displayMiniBackgroundColorSettings;

        if(this.displayMiniBackgroundColorSettings) {
            this.displayMiniFontSettings = false;
            this.displayMiniTextSizeSettings = false;
            this.displayMiniTextColorSettings = false;
        }
    }
}
