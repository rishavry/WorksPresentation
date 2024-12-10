import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BriefIntro } from '../components/briefIntro.component';
import { TopSection } from '../components/topSection.component';

@Component({
    selector: 'app2',
    standalone: true,
    imports: [CommonModule, TopSection, BriefIntro],
    templateUrl: './app2.component.html',
    styleUrl: '../styles.css'
})

export class App2 {
    userIsAtTheTop:boolean = true;
    displayDarkScreen:boolean = false;
    currentTheme:string = 'System: Light';
    readingModeOn:boolean = false;
    darkModeQuery!:any;

    ngOnInit(): void {
        if (typeof window !== 'undefined') {
            window.addEventListener('scroll', this.onScroll);
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
            }
            else {
                this.currentTheme = 'System: Light';
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
                } else {
                    this.currentTheme = 'System: Light';
                    document.body.style.removeProperty('background-color');
                    document.body.style.removeProperty('color');
                    const icons = document.querySelectorAll('.iconToBeAdjustedForDarkMode');
                        icons.forEach(icon => {
                            if (icon instanceof HTMLElement) {
                                icon.style.removeProperty('filter');
                            }
                        });
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
        }
    }

    toggleReadingMode() {
        this.readingModeOn = !this.readingModeOn;
    }

}
