import { Component, Input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderConfig, HeaderAction, HeaderActionType } from '../../models/header-config.model';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ys-header-action',
    standalone: true,
    imports: [TranslateModule, NgbTooltipModule, FontAwesomeModule, CommonModule],
    templateUrl: './header-action.component.html'
})
export class HeaderActionComponent {
    @Input()
    config?: HeaderConfig;

    @Input()
    action?: HeaderAction;

    clickAction(action: HeaderAction) {
        action.action();
    }

    getTypeClasses(): string {
        const general = 'tw-text-sm tw-flex tw-items-center tw-transition-all tw-h-[40px]',
            button = 'tw-rounded-md tw-px-2 tw-py-1',
            primaryBtn = 'tw-text-text-primaryInverse tw-bg-primary tw-border-primary hover:tw-opacity-80',
            secondaryBtn =
                'tw-text-text-secondary tw-bg-transparent tw-border-text-secondary hover:tw-text-text-primary hover:tw-bg-text-secondary',
            text = 'tw-text-text-primary tw-bg-transparent hover:tw-text-primary';

        if (this.action) {
            switch (this.action.type) {
                case HeaderActionType.PrimaryButton:
                    return `${general} ${button} ${primaryBtn}`;
                case HeaderActionType.SecondaryButton:
                    return `${general} ${button} ${secondaryBtn}`;
                case HeaderActionType.Text:
                    return `${general} ${text}`;
                default:
                    return general;
            }
        }
        return '';
    }
}
