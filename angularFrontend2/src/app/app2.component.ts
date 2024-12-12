import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BriefIntro } from '../components/briefIntro.component';
import { RelevantExperience } from '../components/relevantExperience.component';
import { ToolsAndSkills } from '../components/toolsAndSkills.component';
import { TopSection } from '../components/topSection.component';
import { ToolOrSkillPopup } from '../components/toolOrSkillPopup.component';

@Component({
    selector: 'app2',
    standalone: true,
    imports: [CommonModule, TopSection, BriefIntro, RelevantExperience,
    ToolsAndSkills, ToolOrSkillPopup],
    templateUrl: './app2.component.html',
    styleUrl: '../styles.css'
})

export class App2 {
    userIsAtTheTop:boolean = true;
    displayDarkScreen:boolean = false;
    currentTheme:string = 'System: Light';
    readingModeOn:boolean = false;
    darkModeQuery!:any;
    colorWave0PercentKeyFrameRule!:CSSKeyframeRule;
    colorWave100PercentKeyFrameRule!:CSSKeyframeRule;
    displayToolOrSkillsPopup:boolean = false;
    toolOrSkillForPopup!:Record<string, any>;

    ngOnInit(): void {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', this.onScroll);

            const sheets = Array.from(document.styleSheets);
            let rulesWereFound = false;
            for (let sheet of sheets) {
                const rules = Array.from(sheet.cssRules);
                for (let rule of rules) {
                    if (rule instanceof CSSKeyframesRule && rule.name === 'colorWave') {
                        this.colorWave0PercentKeyFrameRule = (rule.cssRules[0] as CSSKeyframeRule);
                        this.colorWave100PercentKeyFrameRule = (rule.cssRules[2] as CSSKeyframeRule);
                        rulesWereFound = true;
                        break;
                    }
                }
                if(rulesWereFound) {
                    break;
                }
            }

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
            }
            else {
                this.currentTheme = 'System: Light';
                this.colorWave0PercentKeyFrameRule.style.setProperty('color', 'black');
                this.colorWave100PercentKeyFrameRule.style.setProperty('color', 'black');
                
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
                }
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
        }
    }

    toggleReadingMode() {
        this.readingModeOn = !this.readingModeOn;
    }

    showPopupForToolOrSkill(toolOrSkillForPopup:Record<string, any>) {
        this.toolOrSkillForPopup = toolOrSkillForPopup;
        this.displayDarkScreen = true;
        this.displayToolOrSkillsPopup = true;
    }

    closePopupForToolOrSkill() {
        this.displayToolOrSkillsPopup = false;
        this.displayDarkScreen = false;
    }

    closeAllPopupsAfterClickingDarkScreen() {
        this.displayToolOrSkillsPopup = false;
        this.displayDarkScreen = false;
    }

}
