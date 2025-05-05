import { TopSection } from '../components/TopSection.component';
import { BriefIntro } from '../components/BriefIntro.component';

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';


@Component({
    selector: 'MainPage',
    standalone: true,
    imports: [CommonModule, TopSection, BriefIntro],
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

    initialAnimationsAreFinished:boolean = true; //change to false

    displayDarkScreen:boolean = false;

    colorWaveAnimation0PercentKeyFrameRule!:CSSKeyframeRule;
    colorWaveAnimation100PercentKeyFrameRule!:CSSKeyframeRule;

    darkModeQuery!:any;

    displayTechnologyOrSkillsPopup:boolean = false;


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
        this.initialAnimationsAreFinished = true;

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
        let newURL = 'http://localhost:8017';
            
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
        this.displayTechnologyOrSkillsPopup = false;
        this.displayDarkScreen = false;
    }
}
