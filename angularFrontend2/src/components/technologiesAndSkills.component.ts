import { CommonModule } from '@angular/common';
import { Component, Directive, ElementRef, HostListener, Input, Renderer2, Output, EventEmitter } from '@angular/core';
import { SingleTechnologyOrSkill } from './singleTechnologyOrSkill.component';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';


@Directive({
    selector: '[startJumpyWaveWhenUserReachesThisPoint]',
    standalone: true,
})
export class StartJumpyWaveWhenUserReachesThisPoint {
    private scrollThreshold = 1120;

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
                    'Most of the Essential Technologies/Skills Utilized in My Project'
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
    selector: 'TechnologiesAndSkills',
    imports: [SingleTechnologyOrSkill, CommonModule, MoveFullStackSectionUpCloser, MoveFrontendSectionUpCloser,
    MoveBackendSectionUpCloser, MoveDataAndCloudSectionUpCloser, StartJumpyWaveWhenUserReachesThisPoint,
    StartFullStackColorfulWaveAndShowElementsWhenUserReachesThisPoint, StartFrontendColorfulWaveAndShowElementsWhenUserReachesThisPoint,
    StartBackendColorfulWaveAndShowElementsWhenUserReachesThisPoint, StartDataAndCloudColorfulWaveAndShowElementsWhenUserReachesThisPoint],
    standalone: true,
    templateUrl: '../templates/technologiesAndSkills.component.html',
    styleUrl: '../styles.css',
})
export class TechnologiesAndSkills {
    @Input() currentTheme!:string;
    @Input() displayDarkScreen!:boolean;
    @Output() notifyParentToShowPopupForTechnologyOrSkill:EventEmitter<Record<string, any>> = new EventEmitter<Record<string, any>>();
    technologiesAndSkillsUsed:Record<string, any>[] = [
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
            usedFor: [
                `Used for the styling of the frontend of <a href='https://github.com/MegaGramProject/Login-Register' target='_blank' rel='noopener noreferrer' style='color: black;'>Login-Register</a>
                for the following endpoints: /login, /signup, /ageCheck, /confirmCode, & for the 404-Not-Found-Page(although 99% of the CSS for the 404-Not-Found-Page was done by 
                <a href='https://rafaelalucas.com/' target='_blank' rel='noopener noreferrer' style='color: black;'>Rafaela Lucas</a>).`,

                `Used for the styling of the frontend of <a href='https://github.com/MegaGramProject/Reset-Password' target='_blank' rel='noopener noreferrer' style='color: black;'>Reset-Password</a>
                for the following endpoints: /forgotPassword, /setNewPassword/{username}/{passwordResetToken}, & for the 404-Not-Found-Page(although 99% of the CSS for the 404-Not-Found-Page was done by 
                <a href='https://rafaelalucas.com/' target='_blank' rel='noopener noreferrer' style='color: black;'>Rafaela Lucas</a>).`
            ]
        },
        {
            name: 'Github',
            type: 'Full-Stack',
            image: 'githubLogo.jpg',
            backgroundColor: 'white',
            color: 'black',
            usedFor: [
                'Each of the repositories mentioned below have a comprehensive README.md file with a consistent structure',

                `Used for the version-control of the frontend of <a href='https://github.com/MegaGramProject/Login-Register' target='_blank' rel='noopener noreferrer' style='color: black;'>Login-Register</a>.
                In this repository, the branches related to the frontend are- 'frontend', 'gcp-frontend', & 'main(default)'.`,
                
                `Used for the version-control of the backend of <a href='https://github.com/MegaGramProject/Login-Register' target='_blank' rel='noopener noreferrer' style='color: black;'>Login-Register</a>.
                In this repository, the branches related to the backend are- 'backend', 'gcp-backend', & 'main(default)'.`,
                
                `Used for the version-control of the frontend of <a href='https://github.com/MegaGramProject/Login-Register' target='_blank' rel='noopener noreferrer' style='color: black;'>Reset-Password</a>.
                In this repository, the branches related to the frontend are- 'frontend' & 'main(default)'.`,
                
                `Used for the version-control of the backend of <a href='https://github.com/MegaGramProject/Reset-Password' target='_blank' rel='noopener noreferrer' style='color: black;'>Reset-Password</a>.
                In this repository, the branch related to the backend is- 'main(default)'.`
            ]
        },
        {
            name: 'Google Cloud Platform',
            type: 'Data and the Cloud',
            image: 'googleCloudLogo.png',
            backgroundColor: 'white',
            color: 'black',
            usedFor: [
                `Used in the frontend of <a href='https://github.com/MegaGramProject/Login-Register' target='_blank' rel='noopener noreferrer' style='color: black;'>Login-Register</a>
                for the following purposes: reCaptcha(proving that login-attempts are not done by robots) and OAuth(allowing users to register and login with their Google accounts).`,

                `Used in the backend of <a href='https://github.com/MegaGramProject/Login-Register' target='_blank' rel='noopener noreferrer' style='color: black;'>Login-Register</a>
                for the following purpose: encryption/decryption of sensitive columns of the 'users' table with the help of
                Google-Cloud Key-Management-Service(and the keys are all rotated automatically every 70 days).`,

                `Used in the deployment of <a href='https://github.com/MegaGramProject/Login-Register' target='_blank' rel='noopener noreferrer' style='color: black;'>Login-Register</a>
                for the following purposes: Google-Kubernetes-Engine(GKE) Clusters for Kubernetes pods that run the frontend and backend production servers, as well
                as a Managed Instance Group that is used for routing requests made to https://megagram.com to the the GKE Load-Balancers for frontend and backend respectively.`,

                `Used in the backend of <a href='https://github.com/MegaGramProject/Reset-Password' target='_blank' rel='noopener noreferrer' style='color: black;'>Reset-Password</a>
                whenever the contact-info of a user needs to be decrypted via the Google-Cloud Key-Management-Service key that was used to encrypt it in the first place.`
            ]
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
            usedFor: [
                `Used in the frontend of <a href='https://github.com/MegaGramProject/Login-Register' target='_blank' rel='noopener noreferrer' style='color: black;'>Login-Register</a>
                for the following endpoints: /login, /signup, /ageCheck, /confirmCode, & for the 404-Not-Found-Page(although most of the HTML for the 404-Not-Found-Page was created by
                <a href='https://rafaelalucas.com/' target='_blank' rel='noopener noreferrer' style='color: black;'>Rafaela Lucas</a>).`,

                `Used in the frontend of <a href='https://github.com/MegaGramProject/Reset-Password' target='_blank' rel='noopener noreferrer' style='color: black;'>Reset-Password</a>
                for the following endpoints: /forgotPassword, /setNewPassword/{username}/{passwordResetToken}, & for the 404-Not-Found-Page(although most of the HTML for the 404-Not-Found-Page was created by
                <a href='https://rafaelalucas.com/' target='_blank' rel='noopener noreferrer' style='color: black;'>Rafaela Lucas</a>).`
            ]
        },
        {
            name: 'JavaScript (Vanilla)',
            type: 'Frontend',
            image: 'jsLogo.png',
            backgroundColor: '#faf4cd',
            color: 'black',
            usedFor: [
                `Used in the frontend of <a href='https://github.com/MegaGramProject/Login-Register' target='_blank' rel='noopener noreferrer' style='color: black;'>Login-Register</a>
                for the following endpoints: /login, /signup, /ageCheck, /confirmCode, & for the 404-Not-Found-Page. JQuery is used extensively in the JS-files due
                to its concise syntax and grand popularity in the world of web-frontends.`
            ]
        },
        {
            name: 'Spring Boot (Java)',
            type: 'Full-Stack',
            image: 'springBootLogo.png',
            backgroundColor: '#dcfce8',
            color: 'black',
            usedFor: [
                `Used in the backend of <a href='https://github.com/MegaGramProject/Reset-Password' target='_blank' rel='noopener noreferrer' style='color: black;'>Reset-Password</a>.
                This backend has 2 different endpoints, both of which are related to enabling users to reset their password.`
            ]
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
            usedFor: [
                `Used for the data of <a href='https://github.com/MegaGramProject/Login-Register' target='_blank'
                rel='noopener noreferrer' style='color: black;'>Login-Register</a>
                for the following tables: users(This table is hosted locally and accessbile via Ngrok. Each row represents a user of Megagram and contains these fields- id,
                username, fullName, dateOfBirth, contactInfo, accountBasedIn, hashedPassword, salt, created, isPrivate, & isVerified), & 
                userAuthTokens(This table is hosted on Google Cloud Spanner. Each row represents info about a specific user's authentication and refresh-token and contains the following fields-
                userId, hashedAuthToken, authTokenSalt, hashedRefreshToken, refreshTokenSalt, authTokenExpiry, & refreshTokenExpiry).`
            ]
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
            usedFor: [
                `Used for the data of <a href='https://github.com/MegaGramProject/Reset-Password' target='_blank'
                rel='noopener noreferrer' style='color: white;'>Reset-Password</a>
                for the following table: password_reset_tokens. This table has 4 columns, namely- id, userId, salt,
                hashedToken, and expiration.`
            ]
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
                `Used in the frontend of <a href='https://github.com/MegaGramProject/Login-Register' target='_blank' rel='noopener noreferrer' style='color: white;'>Login-Register</a>.
                This frontend has 4 different endpoints: /login, /signup, /ageCheck, & /confirmCode, as well as a 404-Not-Found-Page.`,

                `Used in the backend of <a href='https://github.com/MegaGramProject/Login-Register' target='_blank' rel='noopener noreferrer' style='color: white;'>Login-Register</a>.
                This backend has 14 different endpoints, most of which are related to the Megagram users table in MySQL.`
            ]
        },
        {
            name: 'ReactJS',
            type: 'Frontend',
            image: 'reactJSLogo.svg',
            backgroundColor: '#b6e2fa',
            color: 'black',
            usedFor: [
                `Used in the frontend of <a href='https://github.com/MegaGramProject/Reset-Password' target='_blank' rel='noopener noreferrer' style='color: black;'>Reset-Password</a>.
                This frontend has 2 different endpoints: /forgotPassword, /setNewPassword/{username}/{passwordResetToken}, as well as a 404-Not-Found-Page.`
            ]
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
        },
        {
            name: 'Redis',
            type: 'Data and the Cloud',
            image: 'redisLogo.webp',
            backgroundColor: '#ff8f8f',
            color: 'black',
            usedFor: [
                `Used in the backend-caching of <a href='https://github.com/MegaGramProject/Login-Register' target='_blank' rel='noopener noreferrer' style='color: black;'>Login-Register</a>
                for the following purposes: rate-limiting, efficient user-info-retrieval, and efficient and cost-saving language-translations.`
            ]
        },
        {
            name: 'Heroku',
            type: 'Data and the Cloud',
            image: 'herokuLogo.webp',
            backgroundColor: '#efedfc',
            color: 'black',
            usedFor: [
                `Used in the deployment of both the frontend and backend of
                <a href='https://github.com/MegaGramProject/Reset-Password' target='_blank' rel='noopener noreferrer' style='color: black;'>Reset-Password</a>.`
            ]
        },
    ];
    frontendTechnologiesAndSkillsUsed:Record<string, any>[] = [];
    backendTechnologiesAndSkillsUsed:Record<string, any>[] = [];
    dataAndTheCloudTechnologiesAndSkillsUsed:Record<string, any>[] = [];
    fullStackTechnologiesAndSkillsUsed:Record<string, any>[] = [];
    showDescription:boolean = false;
    showFrontendElements:boolean = false;
    showBackendElements:boolean = false;
    showDataAndCloudElements:boolean = false;
    @Output() notifyParentToCloseAllPopups:EventEmitter<any> = new EventEmitter<any>();
    @Input() readingModeOn!:boolean;
    @Input() readingModeFont!:string;
    @Input() readingModeTextSize!:number;
    @Input() readingModeTextColor!:string;
    @Input() readingModeBackgroundColor!:string;

    constructor(private sanitizer: DomSanitizer) {}

    ngOnInit() {
        this.technologiesAndSkillsUsed = this.technologiesAndSkillsUsed.sort((a, b) => a['name'].localeCompare(b['name']));
        this.frontendTechnologiesAndSkillsUsed = this.technologiesAndSkillsUsed.filter(x=>x['type']==='Frontend');
        this.backendTechnologiesAndSkillsUsed = this.technologiesAndSkillsUsed.filter(x=>x['type']==='Backend');
        this.dataAndTheCloudTechnologiesAndSkillsUsed = this.technologiesAndSkillsUsed.filter(x=>x['type']==='Data and the Cloud');
        this.fullStackTechnologiesAndSkillsUsed = this.technologiesAndSkillsUsed.filter(x=>x['type']==='Full-Stack');
    }

    trackByName(technologyOrSkill: any): string {
        return technologyOrSkill.name;
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

    tellParentToShowPopupForTechnologyOrSkill(info:any) {
        const type = info[0];
        const index = info[1];
        if(type==='Full-Stack') {
            this.notifyParentToShowPopupForTechnologyOrSkill.emit(this.fullStackTechnologiesAndSkillsUsed[index])
        }
        else if(type==='Frontend') {
            this.notifyParentToShowPopupForTechnologyOrSkill.emit(this.frontendTechnologiesAndSkillsUsed[index])
        }
        else if(type==='Backend') {
            this.notifyParentToShowPopupForTechnologyOrSkill.emit(this.backendTechnologiesAndSkillsUsed[index])
        }
        else {
            this.notifyParentToShowPopupForTechnologyOrSkill.emit(this.dataAndTheCloudTechnologiesAndSkillsUsed[index])
        }
    }

    onClickingDarkScreen() {
        this.notifyParentToCloseAllPopups.emit();
    }

    sanitize(htmlCodeAsString: string): SafeHtml {
        return this.sanitizer.bypassSecurityTrustHtml(htmlCodeAsString);
    }
}