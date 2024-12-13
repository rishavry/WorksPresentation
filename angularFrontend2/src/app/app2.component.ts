import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BriefIntro } from '../components/briefIntro.component';
import { GoldenStandards } from '../components/goldenStandards.component';
import { RelevantExperience } from '../components/relevantExperience.component';
import { TechnologiesAndSkills } from '../components/technologiesAndSkills.component';
import { TechnologyOrSkillPopup } from '../components/technologyOrSkillPopup.component';
import { TopSection } from '../components/topSection.component';
import { PenultimateSection} from '../components/penultimateSection.component';
import { LastSection } from '../components/lastSection.component';

@Component({
    selector: 'app2',
    standalone: true,
    imports: [CommonModule, TopSection, BriefIntro, RelevantExperience,
    TechnologiesAndSkills, TechnologyOrSkillPopup, GoldenStandards, PenultimateSection,
    LastSection],
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

            if(readingMode!==null) {
                this.readingModeOn = readingMode==='True' || readingMode==='true' ? true : false;
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

}
