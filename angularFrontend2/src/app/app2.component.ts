import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BriefIntro } from '../components/briefIntro.component';
import { GoldenStandards } from '../components/goldenStandards.component';
import { LastSection } from '../components/lastSection.component';
import { PenultimateSection } from '../components/penultimateSection.component';
import { RelevantExperience } from '../components/relevantExperience.component';
import { TechnologiesAndSkills } from '../components/technologiesAndSkills.component';
import { TechnologyOrSkillPopup } from '../components/technologyOrSkillPopup.component';
import { TopSection } from '../components/topSection.component';
import { ColorPickerModule } from 'ngx-color-picker';

@Component({
    selector: 'app2',
    standalone: true,
    imports: [CommonModule, TopSection, BriefIntro, RelevantExperience,
    TechnologiesAndSkills, TechnologyOrSkillPopup, GoldenStandards, PenultimateSection,
    LastSection, FormsModule, ColorPickerModule],
    templateUrl: './app2.component.html',
    styleUrl: '../styles.css'
})

export class App2 {
    userIsAtTheTop:boolean = true;
    displayDarkScreen:boolean = false;
    currentTheme:string = "System: Light";
    readingModeOn:boolean = false;
    darkModeQuery!:any;
    colorWave0PercentKeyFrameRule!:CSSKeyframeRule;
    colorWave100PercentKeyFrameRule!:CSSKeyframeRule;
    displayTechnologyOrSkillsPopup:boolean = false;
    technologyOrSkillForPopup!:Record<string, any>;
    keyFrameRulesForSmoothColorChangingForGoldenStandardsSection:Record<number, any> = {
        0: null,
        25: null,
        50: null,
        75: null,
        100: null
    };
    readingModeFont:string = "Default (mix of all the options)";
    readingModeTextSize:number = 1;
    readingModeTextColor:string = '';
    readingModeBackgroundColor:string = '';
    miniReadingModeSettingsAreVisible:boolean = true;
    displayMiniFontSettings:boolean = false;
    displayMiniTextSizeSettings:boolean = false;
    displayMiniTextColorSettings:boolean = false;
    displayMiniBackgroundColorSettings:boolean = false;

    constructor(private route: ActivatedRoute) { }

    ngOnInit(): void {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', this.onScroll);
            const sheets = Array.from(document.styleSheets);
            let rules1WereFound = false;
            let rules2WereFound = false;
            for (let sheet of sheets) {
                let rules;
                try {
                    rules = Array.from(sheet.cssRules);
                }
                catch (error) {
                    continue;
                }
                for (let rule of rules) {
                    if (rule instanceof CSSKeyframesRule && rule.name === 'colorWave') {
                        this.colorWave0PercentKeyFrameRule = (rule.cssRules[0] as CSSKeyframeRule);
                        this.colorWave100PercentKeyFrameRule = (rule.cssRules[2] as CSSKeyframeRule);
                        rules1WereFound = true;
                    }
                    else if (rule instanceof CSSKeyframesRule && rule.name === 'smoothColorChangingForGoldenStandardsSection') {
                        this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection = {
                            0: (rule.cssRules[0] as CSSKeyframeRule),
                            25: (rule.cssRules[1] as CSSKeyframeRule),
                            50: (rule.cssRules[2] as CSSKeyframeRule),
                            75: (rule.cssRules[3] as CSSKeyframeRule),
                            100: (rule.cssRules[4] as CSSKeyframeRule)
                        };
                        rules2WereFound = true;
                    }
                    if(rules1WereFound && rules2WereFound) {
                        break;
                    }
                }
                if(rules1WereFound && rules2WereFound) {
                    break;
                }
            }

            const theme = this.route.snapshot.queryParamMap.get('theme');
            const readingMode = this.route.snapshot.queryParamMap.get('readingMode');
            const font = this.route.snapshot.queryParamMap.get('font');
            const textSize = this.route.snapshot.queryParamMap.get('textSize');
            const textColor = this.route.snapshot.queryParamMap.get('textColor');
            const backgroundColor = this.route.snapshot.queryParamMap.get('backgroundColor');

            if(readingMode!==null) {
                this.readingModeOn = readingMode==='True' || readingMode==='true' ? true : false;
                if(font!==null) {
                    this.readingModeFont = font;
                }
                if(textSize!==null) {
                    this.readingModeTextSize = parseFloat(textSize);
                }
                if(textColor!==null) {
                    this.readingModeTextColor = "#"+textColor;
                }
                if(backgroundColor!==null) {
                    this.readingModeBackgroundColor = "#"+backgroundColor;
                }
            }
            if(theme==null || theme==='System') {
                this.darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
                if (this.darkModeQuery.matches) {
                    this.currentTheme = 'System: Dark';
                    document.body.style.setProperty('background-color', '#282929', 'important');
                    document.body.style.setProperty('color', 'white', 'important');
                    const icons = document.querySelectorAll('.iconToBeAdjustedForDarkMode');
                    icons.forEach(icon => {
                        if (icon instanceof HTMLElement) {
                            icon.style.setProperty('filter', 'brightness(5) contrast(0)', 'important');
                        }
                    });
                    this.colorWave0PercentKeyFrameRule.style.setProperty('color', 'white');
                    this.colorWave100PercentKeyFrameRule.style.setProperty('color', 'white');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[0].style.setProperty('background', 'linear-gradient(to right, #000099 50%, #993333 50%)');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[25].style.setProperty('background', 'linear-gradient(to right, #000099 37.5%, #993333 62.5%)');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[50].style.setProperty('background', 'linear-gradient(to right, #000099 25%, #993333 75%)');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[75].style.setProperty('background', 'linear-gradient(to right, #000099 12.5%, #993333 87.5%)');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[100].style.setProperty('background', 'linear-gradient(to bottom right, #000099 0%, #993333 100%)');
                }
                else {
                    this.currentTheme = 'System: Light';
                    
                }
            }
            else {
                this.currentTheme = theme;
                if(this.currentTheme==='Dark') {
                    document.body.style.setProperty('background-color', '#282929', 'important');
                    document.body.style.setProperty('color', 'white', 'important');
                    const icons = document.querySelectorAll('.iconToBeAdjustedForDarkMode');
                    icons.forEach(icon => {
                        if (icon instanceof HTMLElement) {
                            icon.style.setProperty('filter', 'brightness(5) contrast(0)', 'important');
                        }
                    });
                    this.colorWave0PercentKeyFrameRule.style.setProperty('color', 'white');
                    this.colorWave100PercentKeyFrameRule.style.setProperty('color', 'white');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[0].style.setProperty('background', 'linear-gradient(to right, #000099 50%, #993333 50%)');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[25].style.setProperty('background', 'linear-gradient(to right, #000099 37.5%, #993333 62.5%)');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[50].style.setProperty('background', 'linear-gradient(to right, #000099 25%, #993333 75%)');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[75].style.setProperty('background', 'linear-gradient(to right, #000099 12.5%, #993333 87.5%)');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[100].style.setProperty('background', 'linear-gradient(to bottom right, #000099 0%, #993333 100%)');
                }
            }
            this.darkModeQuery.addEventListener('change', (event: any) => {
                if(this.currentTheme.startsWith('System:')==false) {
                    return;
                }
                if (event.matches) {
                    this.currentTheme = 'System: Dark';
                    document.body.style.setProperty('background-color', '#282929', 'important');
                    document.body.style.setProperty('color', 'white', 'important');
                    const icons = document.querySelectorAll('.iconToBeAdjustedForDarkMode');
                    icons.forEach(icon => {
                        if (icon instanceof HTMLElement) {
                            icon.style.setProperty('filter', 'brightness(5) contrast(0)', 'important');
                        }
                    });
                    this.colorWave0PercentKeyFrameRule.style.setProperty('color', 'white');
                    this.colorWave100PercentKeyFrameRule.style.setProperty('color', 'white');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[0].style.setProperty('background', 'linear-gradient(to right, #000099 50%, #993333 50%)');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[25].style.setProperty('background', 'linear-gradient(to right, #000099 37.5%, #993333 62.5%)');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[50].style.setProperty('background', 'linear-gradient(to right, #000099 25%, #993333 75%)');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[75].style.setProperty('background', 'linear-gradient(to right, #000099 12.5%, #993333 87.5%)');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[100].style.setProperty('background', 'linear-gradient(to bottom right, #000099 0%, #993333 100%)');
                }
                else {
                    this.currentTheme = 'System: Light';
                    document.body.style.removeProperty('background-color');
                    document.body.style.removeProperty('color');
                    const icons = document.querySelectorAll('.iconToBeAdjustedForDarkMode');
                    icons.forEach(icon => {
                        if (icon instanceof HTMLElement) {
                            icon.style.removeProperty('filter');
                        }
                    });
                    this.colorWave0PercentKeyFrameRule.style.setProperty('color', 'black');
                    this.colorWave100PercentKeyFrameRule.style.setProperty('color', 'black');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[0].style.setProperty('background', 'linear-gradient(to right, #33ccff 50%, #ff6666 50%)');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[25].style.setProperty('background', 'linear-gradient(to right, #33ccff 37.5%, #ff6666 62.5%)');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[50].style.setProperty('background', 'linear-gradient(to right, #33ccff 25%, #ff6666 75%)');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[75].style.setProperty('background', 'linear-gradient(to right, #33ccff 12.5%, #ff6666 87.5%)');
                    this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[100].style.setProperty('background', 'linear-gradient(to bottom right, #33ccff 0%, #ff6666 100%)');
                }
                this.updateURLOfPageAfterUserPersonalization();
            });
        }
    }
    
    onScroll = (): void => {
        this.userIsAtTheTop = window.scrollY === 0;
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

    updateDarkScreen(displayDarkScreen:boolean) {
        this.displayDarkScreen = displayDarkScreen;
    }

    updateTheme(newTheme: string) {
        if(newTheme==='System') {
            const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            if (darkModeQuery.matches) {
                this.currentTheme = 'System: Dark';
            } else {
                this.currentTheme = 'System: Light';
            }
        }
        else {
            this.currentTheme = newTheme;
        }
        if(this.currentTheme.endsWith('Dark')) {
            document.body.style.setProperty('background-color', '#282929', 'important');
            document.body.style.setProperty('color', 'white', 'important');
            const icons = document.querySelectorAll('.iconToBeAdjustedForDarkMode');
            icons.forEach(icon => {
                if (icon instanceof HTMLElement) {
                    icon.style.setProperty('filter', 'brightness(5) contrast(0)', 'important');
                }
            });
            this.colorWave0PercentKeyFrameRule.style.setProperty('color', 'white');
            this.colorWave100PercentKeyFrameRule.style.setProperty('color', 'white');
            this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[0].style.setProperty('background', 'linear-gradient(to right, #000099 50%, #993333 50%)');
            this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[25].style.setProperty('background', 'linear-gradient(to right, #000099 37.5%, #993333 62.5%)');
            this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[50].style.setProperty('background', 'linear-gradient(to right, #000099 25%, #993333 75%)');
            this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[75].style.setProperty('background', 'linear-gradient(to right, #000099 12.5%, #993333 87.5%)');
            this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[100].style.setProperty('background', 'linear-gradient(to bottom right, #000099 0%, #993333 100%)');
        }
        else {
            document.body.style.removeProperty('background-color');
            document.body.style.removeProperty('color');
            const icons = document.querySelectorAll('.iconToBeAdjustedForDarkMode');
            icons.forEach(icon => {
                if (icon instanceof HTMLElement) {
                    icon.style.removeProperty('filter');
                }
            });
            this.colorWave0PercentKeyFrameRule.style.setProperty('color', 'black');
            this.colorWave100PercentKeyFrameRule.style.setProperty('color', 'black');
            this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[0].style.setProperty('background', 'linear-gradient(to right, #33ccff 50%, #ff6666 50%)');
            this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[25].style.setProperty('background', 'linear-gradient(to right, #33ccff 37.5%, #ff6666 62.5%)');
            this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[50].style.setProperty('background', 'linear-gradient(to right, #33ccff 25%, #ff6666 75%)');
            this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[75].style.setProperty('background', 'linear-gradient(to right, #33ccff 12.5%, #ff6666 87.5%)');
            this.keyFrameRulesForSmoothColorChangingForGoldenStandardsSection[100].style.setProperty('background', 'linear-gradient(to bottom right, #33ccff 0%, #ff6666 100%)');

        }
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

    toggleReadingMode() {
        this.readingModeOn = !this.readingModeOn;
        this.updateURLOfPageAfterUserPersonalization();
    }

    showPopupForTechnologyOrSkill(technologyOrSkillForPopup:Record<string, any>) {
        this.technologyOrSkillForPopup = technologyOrSkillForPopup;
        this.displayDarkScreen = true;
        this.displayTechnologyOrSkillsPopup = true;
    }

    closePopupForTechnologyOrSkill() {
        this.displayTechnologyOrSkillsPopup = false;
        this.displayDarkScreen = false;
    }

    closeAllPopupsAfterClickingDarkScreen() {
        this.displayTechnologyOrSkillsPopup = false;
        this.displayDarkScreen = false;
    }

    updateURLOfPageAfterUserPersonalization() {
        let newURL = "http://localhost:8037";
        if(this.readingModeOn==true || !this.currentTheme.startsWith('System:')) {
            newURL+="?";
            if(this.readingModeOn) {
                newURL+="readingMode=True";
                if(this.readingModeFont!=='Default (mix of all the options)') {
                    newURL+=`&font=${this.readingModeFont}`;
                }
                if(this.readingModeTextSize!==1) {
                    newURL+=`&textSize=${this.readingModeTextSize}`;
                }
                if(this.readingModeTextColor.length>0) {
                    newURL+=`&textColor=${this.readingModeTextColor.substring(1)}`;
                }
                if(this.readingModeBackgroundColor.length>0) {
                    newURL+=`&backgroundColor=${this.readingModeBackgroundColor.substring(1)}`;
                }
                if(!this.currentTheme.startsWith('System:')) {
                    newURL+=`&theme=${this.currentTheme}`;
                }
            }
            else if(!this.currentTheme.startsWith('System:')) {
                newURL+=`theme=${this.currentTheme}`;
            }
        }

        history.pushState(null, 'About my Work', newURL);
    }

    toggleMiniReadingModeSettingsVisibility() {
        this.miniReadingModeSettingsAreVisible = !this.miniReadingModeSettingsAreVisible;
    }

    toggleMiniFontSettings() {
        this.displayMiniFontSettings = !this.displayMiniFontSettings;
        if(this.displayMiniFontSettings==true) {
            this.displayMiniTextSizeSettings = false;
            this.displayMiniTextColorSettings = false;
            this.displayMiniBackgroundColorSettings = false;
        }
    }

    toggleMiniTextSizeSettings() {
        this.displayMiniTextSizeSettings = !this.displayMiniTextSizeSettings;
        if(this.displayMiniTextSizeSettings==true) {
            this.displayMiniFontSettings = false;
            this.displayMiniTextColorSettings = false;
            this.displayMiniBackgroundColorSettings = false;
        }
    }

    toggleMiniTextColorSettings() {
        this.displayMiniTextColorSettings = !this.displayMiniTextColorSettings;
        if(this.displayMiniTextColorSettings==true) {
            this.displayMiniFontSettings = false;
            this.displayMiniTextSizeSettings = false;
            this.displayMiniBackgroundColorSettings = false;
        }
    }

    toggleBackgroundTextColorSettings() {
        this.displayMiniBackgroundColorSettings = !this.displayMiniBackgroundColorSettings;
        if(this.displayMiniBackgroundColorSettings==true) {
            this.displayMiniFontSettings = false;
            this.displayMiniTextSizeSettings = false;
            this.displayMiniTextColorSettings = false;
        }
    }

}
