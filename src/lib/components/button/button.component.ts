import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { Button, ButtonType } from './models/button.model';
import { TranslateModule } from '@ngx-translate/core';

@Component({
    selector: 'ys-button',
    standalone: true,
    imports: [CommonModule, FormsModule, NgbTooltip, TranslateModule],
    templateUrl: './button.component.html'
})
export class ButtonComponent {
    @Input() button?: Button;

    getClasses(): string {
        if (this.button) {
            const common =
                    'tw-text-sm tw-flex tw-items-center tw-transition-all tw-h-[40px] tw-mx-2 tw-cursor-pointer tw-border tw-rounded-md tw-px-2 tw-py-1 tw-font-semibold disabled:tw-opacity-60',
                primary = 'tw-text-text-primaryInverse tw-bg-text-primary tw-border-text-primary',
                secondary = 'tw-text-text-primary tw-bg-transparent tw-border-text-secondaryInverse',
                tertiary = 'tw-text-text-primary tw-bg-transparent tw-border-transparent';

            switch (this.button.type) {
                case ButtonType.Primary:
                    return this.button.disabled ? `${common} ${primary}` : `${common} ${primary} hover:tw-opacity-80`;
                case ButtonType.Secondary:
                    return this.button.disabled
                        ? `${common} ${secondary}`
                        : `${common} ${secondary} hover:tw-bg-text-secondaryInverse hover:tw-opacity-80`;
                case ButtonType.Tertiary:
                    return this.button.disabled
                        ? `${common} ${tertiary}`
                        : `${common} ${tertiary} hover:tw-text-primaryColor`;
                default:
                    return '';
            }
        }
        return '';
    }

    onClick(): void {
        if (this.button && !this.button.disabled) {
            this.button.action();
        }
    }
}
