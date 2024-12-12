import { CommonModule } from '@angular/common';
import { Component, Directive, ElementRef, HostListener, Input, Renderer2, Output, EventEmitter } from '@angular/core';
import { SingleToolOrSkill } from './singleToolOrSkill.component';



@Directive({
    selector: '[startJumpyWaveWhenUserReachesThisPoint]',
    standalone: true,
})
export class StartJumpyWaveWhenUserReachesThisPoint {
    private scrollThreshold = 1020;

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;

        if (scrollY > this.scrollThreshold) {
            this.renderer.addClass(this.el.nativeElement, 'jumpyWave');
            window.removeEventListener('scroll', this.onScroll.bind(this));
            setTimeout(() => {
                this.renderer.setProperty(
                    this.el.nativeElement,
                    'innerHTML',
                    'Most of the Essential Tools/Skills Utilized Directly in My Project'
                );
                this.renderer.setStyle(
                    this.el.nativeElement,
                    'text-decoration',
                    'underline'
                );
            }, 3150);
        }
    }

}

@Directive({
    selector: '[startFullStackColorfulWaveAndShowElementsWhenUserReachesThisPoint]',
    standalone: true,
})
export class StartFullStackColorfulWaveAndShowElementsWhenUserReachesThisPoint {
    private scrollThreshold = 1430;
    @Output() private notifyParentToShowDescription = new EventEmitter();

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;

        if (scrollY > this.scrollThreshold) {
            this.renderer.addClass(this.el.nativeElement, 'colorfulWave');
            window.removeEventListener('scroll', this.onScroll.bind(this));
            this.notifyParentToShowDescription.emit();

        }
    }

}

@Directive({
    selector: '[moveFullStackSectionUpCloser]',
    standalone: true
    })
export class MoveFullStackSectionUpCloser {
    private scrollThreshold = 1100;
    private scrollUpperLimit = 1450;
    private originalMarginBottom = 30;
    private finalMarginBottom = 3;

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;
        if(scrollY >= this.scrollUpperLimit) {
            this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', `${this.finalMarginBottom}%`);
        }
        else if (scrollY > this.scrollThreshold) {
            const marginBottom = this.originalMarginBottom - 27/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY - this.scrollThreshold);
            this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', `${marginBottom}em`);
        }
        else {
            this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', `${this.originalMarginBottom}%`);
        }
    }
}

@Directive({
    selector: '[moveFrontendSectionUpCloser]',
    standalone: true
    })
export class MoveFrontendSectionUpCloser {
    private scrollThreshold = 1570;
    private scrollUpperLimit = 1920;
    private originalMarginBottom = 30;
    private finalMarginBottom = 0;

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;
        if(scrollY >= this.scrollUpperLimit) {
            this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', `${this.finalMarginBottom}%`);
        }
        else if (scrollY > this.scrollThreshold) {
            const marginBottom = this.originalMarginBottom - 30/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY - this.scrollThreshold);
            this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', `${marginBottom}em`);
        }
        else {
            this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', `${this.originalMarginBottom}%`);
        }
    }
}

@Directive({
    selector: '[startFrontendColorfulWaveAndShowElementsWhenUserReachesThisPoint]',
    standalone: true,
})
export class StartFrontendColorfulWaveAndShowElementsWhenUserReachesThisPoint {
    private scrollThreshold = 1870;
    @Output() private notifyParentToShowFrontendElements = new EventEmitter();

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;

        if (scrollY > this.scrollThreshold) {
            this.renderer.addClass(this.el.nativeElement, 'colorfulWave');
            window.removeEventListener('scroll', this.onScroll.bind(this));
            this.notifyParentToShowFrontendElements.emit();
        }
    }
}

@Directive({
    selector: '[moveBackendSectionUpCloser]',
    standalone: true
    })
export class MoveBackendSectionUpCloser {
    private scrollThreshold = 2324;
    private scrollUpperLimit = 2774;
    private originalMarginBottom = 30;
    private finalMarginBottom = 0;

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;
        if(scrollY >= this.scrollUpperLimit) {
            this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', `${this.finalMarginBottom}%`);
        }
        else if (scrollY > this.scrollThreshold) {
            const marginBottom = this.originalMarginBottom - 30/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY - this.scrollThreshold);
            this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', `${marginBottom}em`);
        }
        else {
            this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', `${this.originalMarginBottom}%`);
        }
    }
}


@Directive({
    selector: '[startBackendColorfulWaveAndShowElementsWhenUserReachesThisPoint]',
    standalone: true,
})
export class StartBackendColorfulWaveAndShowElementsWhenUserReachesThisPoint {
    private scrollThreshold = 2600;
    @Output() private notifyParentToShowBackendElements = new EventEmitter();

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;

        if (scrollY > this.scrollThreshold) {
            this.renderer.addClass(this.el.nativeElement, 'colorfulWave');
            window.removeEventListener('scroll', this.onScroll.bind(this));
            this.notifyParentToShowBackendElements.emit();
        }
    }
}

@Directive({
    selector: '[startDataAndCloudColorfulWaveAndShowElementsWhenUserReachesThisPoint]',
    standalone: true,
})
export class StartDataAndCloudColorfulWaveAndShowElementsWhenUserReachesThisPoint {
    private scrollThreshold = 3350;
    @Output() private notifyParentToShowDataAndCloudElements = new EventEmitter();

    constructor(private el: ElementRef, private renderer: Renderer2) {}

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;

        if (scrollY > this.scrollThreshold) {
            this.renderer.addClass(this.el.nativeElement, 'colorfulWave');
            window.removeEventListener('scroll', this.onScroll.bind(this));
            this.notifyParentToShowDataAndCloudElements.emit();

        }
    }
}

@Directive({
    selector: '[moveDataAndCloudSectionUpCloser]',
    standalone: true
    })
export class MoveDataAndCloudSectionUpCloser {
    private scrollThreshold = 3200;
    private scrollUpperLimit = 3550;
    private originalMarginBottom = 30;
    private finalMarginBottom = 0;

    constructor(private el: ElementRef, private renderer: Renderer2) {
    }

    @HostListener('window:scroll', ['$event'])
    onScroll(event: Event): void {
        const scrollY = window.scrollY;
        if(scrollY >= this.scrollUpperLimit) {
            this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', `${this.finalMarginBottom}%`);
        }
        else if (scrollY > this.scrollThreshold) {
            const marginBottom = this.originalMarginBottom - 30/(this.scrollUpperLimit-this.scrollThreshold) * (scrollY - this.scrollThreshold);
            this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', `${marginBottom}em`);
        }
        else {
            this.renderer.setStyle(this.el.nativeElement, 'margin-bottom', `${this.originalMarginBottom}%`);
        }
    }
}

@Component({
    selector: 'ToolsAndSkills',
    imports: [SingleToolOrSkill, CommonModule, MoveFullStackSectionUpCloser, MoveFrontendSectionUpCloser,
    MoveBackendSectionUpCloser, MoveDataAndCloudSectionUpCloser, StartJumpyWaveWhenUserReachesThisPoint,
    StartFullStackColorfulWaveAndShowElementsWhenUserReachesThisPoint, StartFrontendColorfulWaveAndShowElementsWhenUserReachesThisPoint,
    StartBackendColorfulWaveAndShowElementsWhenUserReachesThisPoint, StartDataAndCloudColorfulWaveAndShowElementsWhenUserReachesThisPoint],
    standalone: true,
    templateUrl: '../templates/toolsAndSkills.component.html',
    styleUrl: '../styles.css',
})
export class ToolsAndSkills {
    @Input() currentTheme!:string;
    toolsAndSkillsUsed:Record<string, any>[] = [
        {
            name: 'AngularTS',
            type: 'Frontend',
            image: 'angularLogo.png',
            backgroundColor: '#faedee',
            color: 'black',
            usedFor: []
        },
        {
            name: 'ASP Net Core(C#)',
            type: 'Backend',
            image: 'aspNetCoreLogo.png',
            backgroundColor: '#280247',
            color: 'white',
            usedFor: []
        },
        {
            name: 'CSS',
            type: 'Frontend',
            image: 'cssLogo.png',
            backgroundColor: '#f0f4ff',
            color: 'black',
            usedFor: []
        },
        {
            name: 'Github',
            type: 'Full-Stack',
            image: 'githubLogo.jpg',
            backgroundColor: 'white',
            color: 'black',
            usedFor: []
        },
        {
            name: 'Google Cloud',
            type: 'Data and the Cloud',
            image: 'googleCloudLogo.png',
            backgroundColor: 'white',
            color: 'black',
            usedFor: []
        },
        {
            name: 'GraphQL',
            type: 'Backend',
            image: 'graphqlLogo.png',
            backgroundColor: '#fff0fe',
            color: 'black',
            usedFor: []
        },
        {
            name: 'HTML',
            type: 'Frontend',
            image: 'htmlLogo.png',
            backgroundColor: '#ffeac4',
            color: 'black',
            usedFor: []
        },
        {
            name: 'JavaScript',
            type: 'Frontend',
            image: 'jsLogo.png',
            backgroundColor: '#faf4cd',
            color: 'black',
            usedFor: []
        },
        {
            name: 'Spring Boot (Java)',
            type: 'Full-Stack',
            image: 'springBootLogo.png',
            backgroundColor: '#dcfce8',
            color: 'black',
            usedFor: []
        },
        {
            name: 'MongoDB (local & Atlas)',
            type: 'Data and the Cloud',
            image: 'mongoDBLogo.png',
            backgroundColor: '#e1fae5',
            color: 'black',
            usedFor: []
        },
        {
            name: 'MySQL',
            type: 'Data and the Cloud',
            image: 'mysqlLogo.png',
            backgroundColor: '#f5f8ff',
            color: 'black',
            usedFor: []
        },
        {
            name: 'NodeJS',
            type: 'Backend',
            image: 'nodeJSLogo.webp',
            backgroundColor: '#e6fff7',
            color: 'black',
            usedFor: []
        },
        {
            name: 'ExpressJS',
            type: 'Backend',
            image: 'expressJSLogo.png',
            backgroundColor: 'white',
            color: 'black',
            usedFor: []
        },
        {
            name: 'PostgresSQL',
            type: 'Data and the Cloud',
            image: 'psqlLogo.png',
            backgroundColor: '#09235e',
            color: 'white',
            usedFor: []
        },
        {
            name: 'Laravel (PHP)',
            type: 'Backend',
            image: 'laravelLogo.png',
            backgroundColor: '#40070b',
            color: 'white',
            usedFor: []
        },
        {
            name: 'Payment-Processing (Stripe)',
            type: 'Full-Stack',
            image: 'stripeLogo.png',
            backgroundColor: '#eee0ff',
            color: 'black',
            usedFor: []
        },
        {
            name: 'Django (Python)',
            type: 'Full-Stack',
            image: "pythonLogo.png",
            backgroundColor: '#3d3d3d',
            color: 'white',
            usedFor: [
                "Used for the frontend for <a href=\"https://github.com/Megagram/Login-Register\" style:\"color: red;\">Login-Register</a>",
                "Used for the backend of productPageViewers & updatesOfCartsAndSavedItems (djangoBackend6)",
                "Used for the backend of productPageViewers & updatesOfCartsAndSavedItems (djangoBackend6)",
                "Used for the backend of productPageViewers & updatesOfCartsAndSavedItems (djangoBackend6)",
                "Used for the backend of productPageViewers & updatesOfCartsAndSavedItems (djangoBackend6)"
            ]
        },
        {
            name: 'ReactJS',
            type: 'Frontend',
            image: 'reactJSLogo.svg',
            backgroundColor: '#b6e2fa',
            color: 'black',
            usedFor: []
        },
        {
            name: 'SCSS',
            type: 'Frontend',
            image: 'scssLogo.png',
            backgroundColor: '#ffedff',
            color: 'black',
            usedFor: []
        },
        {
            
            name: 'VueJS',
            type: 'Frontend',
            image: 'vueJS3dLogo.webp',
            backgroundColor: '#b2f7e0',
            color: 'black',
            usedFor: []
        },
        {
            
            name: 'WebSockets',
            type: 'Backend',
            image: 'websocketLogo.png',
            backgroundColor: '#f2f2f2',
            color: 'black',
            usedFor: []
        }
    ];
    frontendToolsAndSkillsUsed:Record<string, any>[] = [];
    backendToolsAndSkillsUsed:Record<string, any>[] = [];
    dataAndTheCloudToolsAndSkillsUsed:Record<string, any>[] = [];
    fullStackToolsAndSkillsUsed:Record<string, any>[] = [];
    showDescription:boolean = false;
    showFrontendElements:boolean = false;
    showBackendElements:boolean = false;
    showDataAndCloudElements:boolean = false;

    ngOnInit() {
        this.toolsAndSkillsUsed = this.toolsAndSkillsUsed.sort((a, b) => a['name'].localeCompare(b['name']));
        this.frontendToolsAndSkillsUsed = this.toolsAndSkillsUsed.filter(x=>x['type']==='Frontend');
        this.backendToolsAndSkillsUsed = this.toolsAndSkillsUsed.filter(x=>x['type']==='Backend');
        this.dataAndTheCloudToolsAndSkillsUsed = this.toolsAndSkillsUsed.filter(x=>x['type']==='Data and the Cloud');
        this.fullStackToolsAndSkillsUsed = this.toolsAndSkillsUsed.filter(x=>x['type']==='Full-Stack');
    }

    trackByName(toolOrSkill: any): string {
        return toolOrSkill.name;
    }

    setShowDescriptionToTrue() {
        this.showDescription = true;
    }

    setShowFrontendElementsToTrue() {
        this.showFrontendElements = true;
    }

    setShowBackendElementsToTrue() {
        this.showBackendElements = true;
    }

    setShowDataAndCloudElementsToTrue() {
        this.showDataAndCloudElements = true;
    }
}