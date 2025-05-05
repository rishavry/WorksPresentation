import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';


@Component({
    selector: 'LastSection',
    templateUrl: '../templates/LastSection.component.html',
    styleUrl: '../styles.css',
    standalone: true,
    imports: [CommonModule]
})
export class LastSection {
    @Input() currentTheme!:string;
    @Input() displayDarkScreen!:boolean;
    @Output() notifyParentToCloseAllPopups:EventEmitter<any> = new EventEmitter<any>();
    confettiHasBeenStarted:boolean = false;
    @Input() readingModeOn!:boolean;
    @Input() readingModeFont!:string;
    @Input() readingModeTextSize!:number;
    @Input() readingModeTextColor!:string;
    @Input() readingModeBackgroundColor!:string;

    onClickingDarkScreen() {
        this.notifyParentToCloseAllPopups.emit();
    }

    startConfettiOnMouseEnter() {
        if(!this.confettiHasBeenStarted)  {
            this.confettiHasBeenStarted = true;
            (window as any).confetti({
                particleCount: 500,
                spread: 500,
                origin: { x: 0.1, y: 0.1},
            });

            setTimeout(() => {
                (window as any).confetti({
                    particleCount: 500,
                    spread: 500,
                    origin: { x: 0.7, y: 0.7},
                });
            }, 1000)
        }
    }

    startConfettiAfterClickingTrophy() {
        (window as any).confetti({
            particleCount: Math.floor(Math.random()*1000+0),
            spread: Math.floor(Math.random()*1000+0),
            origin: { x: Math.random(), y: Math.random() },
        });
    }
}
