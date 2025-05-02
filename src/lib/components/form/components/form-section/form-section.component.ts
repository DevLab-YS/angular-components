import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormConfig, FormSection } from '../../models/form-config.model';
import { FormField } from '../../models/form-field.model';
import { FormFieldComponent } from '../form-field/form-field.component';

@Component({
    selector: 'ys-form-section',
    standalone: true,
    imports: [TranslateModule, NgbTooltipModule, CommonModule, FormFieldComponent],
    templateUrl: './form-section.component.html'
})
export class FormSectionComponent {
    @Input() section?: FormSection;
    @Input() formConfig?: FormConfig;
    @Output() valueChange = new EventEmitter<void>();

    getSectionKey(): string {
        return `${this.formConfig?.prefix}.${this.section?.key}`;
    }

    getFieldWidth(field: FormField): string {
        return `${field.width}%`;
    }

    fieldChange() {
        this.valueChange.emit();
    }
}
