import { CommonModule } from '@angular/common';
import { Component, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Renderer2, SimpleChanges } from '@angular/core';
import { RouterModule } from '@angular/router';



@Directive({
    selector: '[changeColorOfText0AsUserScrolls]',
    standalone: true
    })
export class ChangeColorOfText0AsUserScrolls {
    private scrollThreshold = 4300;
    private scrollUpperLimit = 4700;
    @Input() currentTheme!:string;
    private colorsBeforeAndInBetween:Record<string, string> = {
        Light: 'black',
        Dark: 'white',
        'System: Light': 'black',
        'System: Dark': 'white'
    };
    private colorsAfter:Record<string, string> = {
        Light: 'white',
        Dark: 'black',
        'System: Light': 'white',
        'System: Dark': 'black'
    };

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;
        if(scrollY >= this.scrollUpperLimit) {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsAfter[this.currentTheme]);
        }
        else if (scrollY > this.scrollThreshold) {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndInBetween[this.currentTheme]);
        }
        else {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndInBetween[this.currentTheme]);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['currentTheme'] && typeof window!=='undefined') {
            const scrollY = window.scrollY;
            if(scrollY >= this.scrollUpperLimit) {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsAfter[this.currentTheme]);
            }
            else if (scrollY > this.scrollThreshold) {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndInBetween[this.currentTheme]);
            }
            else {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndInBetween[this.currentTheme]);
            }
        }
    }
}

@Directive({
    selector: '[changeColorOfText1AsUserScrolls]',
    standalone: true
    })
export class ChangeColorOfText1AsUserScrolls {
    private scrollThreshold = 4700;
    private scrollUpperLimit = 5100;
    @Input() currentTheme!:string;
    private colorsBeforeAndAfter:Record<string, string> = {
        Light: 'white',
        Dark: 'black',
        'System: Light': 'white',
        'System: Dark': 'black'
    };
    private colorsInBetween:Record<string, string> = {
        Light: 'black',
        Dark: 'white',
        'System: Light': 'black',
        'System: Dark': 'white'
    };

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;
        if(scrollY >= this.scrollUpperLimit) {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
        }
        else if (scrollY > this.scrollThreshold) {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsInBetween[this.currentTheme]);
        }
        else {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['currentTheme'] && typeof window!=='undefined') {
            const scrollY = window.scrollY;
            if(scrollY >= this.scrollUpperLimit) {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
            }
            else if (scrollY > this.scrollThreshold) {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsInBetween[this.currentTheme]);
            }
            else {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
            }
        }
    }
}

@Directive({
    selector: '[changeColorOfText2AsUserScrolls]',
    standalone: true
    })
export class ChangeColorOfText2AsUserScrolls {
    private scrollThreshold = 5100;
    private scrollUpperLimit = 5500;
    @Input() currentTheme!:string;
    private colorsBeforeAndAfter:Record<string, string> = {
        Light: 'white',
        Dark: 'black',
        'System: Light': 'white',
        'System: Dark': 'black'
    };
    private colorsInBetween:Record<string, string> = {
        Light: 'black',
        Dark: 'white',
        'System: Light': 'black',
        'System: Dark': 'white'
    };

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;
        if(scrollY >= this.scrollUpperLimit) {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
        }
        else if (scrollY > this.scrollThreshold) {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsInBetween[this.currentTheme]);
        }
        else {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['currentTheme'] && typeof window!=='undefined') {
            const scrollY = window.scrollY;
            if(scrollY >= this.scrollUpperLimit) {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
            }
            else if (scrollY > this.scrollThreshold) {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsInBetween[this.currentTheme]);
            }
            else {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
            }
        }
    }
}

@Directive({
    selector: '[changeColorOfText3AsUserScrolls]',
    standalone: true
    })
export class ChangeColorOfText3AsUserScrolls {
    private scrollThreshold = 5500;
    private scrollUpperLimit = 5700;
    @Input() currentTheme!:string;
    private colorsBeforeAndAfter:Record<string, string> = {
        Light: 'white',
        Dark: 'black',
        'System: Light': 'white',
        'System: Dark': 'black'
    };
    private colorsInBetween:Record<string, string> = {
        Light: 'black',
        Dark: 'white',
        'System: Light': 'black',
        'System: Dark': 'white'
    };

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;
        if(scrollY >= this.scrollUpperLimit) {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
        }
        else if (scrollY > this.scrollThreshold) {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsInBetween[this.currentTheme]);
        }
        else {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['currentTheme'] && typeof window!=='undefined') {
            const scrollY = window.scrollY;
            if(scrollY >= this.scrollUpperLimit) {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
            }
            else if (scrollY > this.scrollThreshold) {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsInBetween[this.currentTheme]);
            }
            else {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
            }
        }
    }
}

@Directive({
    selector: '[changeColorOfText4AsUserScrolls]',
    standalone: true
    })
export class ChangeColorOfText4AsUserScrolls {
    private scrollThreshold = 5700;
    private scrollUpperLimit = 5850;
    @Input() currentTheme!:string;
    private colorsBeforeAndAfter:Record<string, string> = {
        Light: 'white',
        Dark: 'black',
        'System: Light': 'white',
        'System: Dark': 'black'
    };
    private colorsInBetween:Record<string, string> = {
        Light: 'black',
        Dark: 'white',
        'System: Light': 'black',
        'System: Dark': 'white'
    };

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;
        if(scrollY >= this.scrollUpperLimit) {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
        }
        else if (scrollY > this.scrollThreshold) {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsInBetween[this.currentTheme]);
        }
        else {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['currentTheme'] && typeof window!=='undefined') {
            const scrollY = window.scrollY;
            if(scrollY >= this.scrollUpperLimit) {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
            }
            else if (scrollY > this.scrollThreshold) {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsInBetween[this.currentTheme]);
            }
            else {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
            }
        }
    }
}

@Directive({
    selector: '[changeColorOfText5AsUserScrolls]',
    standalone: true
    })
export class ChangeColorOfText5AsUserScrolls {
    private scrollThreshold = 5850;
    private scrollUpperLimit = 6200;
    @Input() currentTheme!:string;
    private colorsBeforeAndAfter:Record<string, string> = {
        Light: 'white',
        Dark: 'black',
        'System: Light': 'white',
        'System: Dark': 'black'
    };
    private colorsInBetween:Record<string, string> = {
        Light: 'black',
        Dark: 'white',
        'System: Light': 'black',
        'System: Dark': 'white'
    };

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;
        if(scrollY >= this.scrollUpperLimit) {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
        }
        else if (scrollY > this.scrollThreshold) {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsInBetween[this.currentTheme]);
        }
        else {
            this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
        }
    }

    ngOnChanges(changes: SimpleChanges) {
        if (changes['currentTheme'] && typeof window!=='undefined') {
            const scrollY = window.scrollY;
            if(scrollY >= this.scrollUpperLimit) {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
            }
            else if (scrollY > this.scrollThreshold) {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsInBetween[this.currentTheme]);
            }
            else {
                this.renderer.setStyle(this.el.nativeElement, 'color', this.colorsBeforeAndAfter[this.currentTheme]);
            }
        }
    }
}


@Component({
    selector: 'PenultimateSection',
    templateUrl: '../templates/PenultimateSection.component.html',
    styleUrl: '../styles.css',
    standalone: true,
    imports: [RouterModule, CommonModule, ChangeColorOfText0AsUserScrolls,
    ChangeColorOfText1AsUserScrolls, ChangeColorOfText2AsUserScrolls,
    ChangeColorOfText3AsUserScrolls, ChangeColorOfText4AsUserScrolls, ChangeColorOfText5AsUserScrolls]
})
export class PenultimateSection {
    @Input() currentTheme!:string;
    @Input() displayDarkScreen!:boolean;
    @Output() notifyParentToCloseAllPopups:EventEmitter<any> = new EventEmitter<any>();

    onClickingDarkScreen() {
        this.notifyParentToCloseAllPopups.emit();
    }
}
