import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormField, SelectFormField } from '../../models/form-field.model';
import { FormsModule } from '@angular/forms';
import { LIBRARY_CONSTANTS } from '../../../../shared/models/library-constants.model';

@Component({
    selector: 'ys-form-field',
    standalone: true,
    imports: [CommonModule, FormsModule, TranslateModule, NgbTooltipModule],
    templateUrl: './form-field.component.html'
})
export class FormFieldComponent {
    @Input() field?: FormField;
    @Input() prefix = '';
    @Output() change = new EventEmitter<void>();

    translatePrefix = LIBRARY_CONSTANTS.TRANSLATIONS_PREFIX;

    getClasses(): string {
        const common =
            'tw-w-full tw-px-3 tw-py-2 tw-h-[44px] tw-border tw-rounded-sm tw-bg-background-secondary tw-border-text-secondaryInverse hover:tw-border-primaryInverse focus:tw-border-primaryColor focus:tw-outline-none focus:tw-ring-0 tw-text-text-primary placeholder:tw-text-text-secondary/50 tw-transition-all tw-duration-200 tw-ease-in-out disabled:tw-bg-background-tertiary';

        return common;
    }

    getFieldKey(): string {
        if (this.field) {
            return `${this.prefix}.${this.field?.key}`;
        }
        return '';
    }

    getSelectFilter(): SelectFormField {
        return this.field as SelectFormField;
    }

    inputChange() {
        this.change.emit();
    }
}
