import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormConfig } from './models/form-config.model';
import { FormSectionComponent } from './components/form-section/form-section.component';
import { ButtonComponent } from '../button/button.component';
import { Button, ButtonType } from '../button/models/button.model';
import { LIBRARY_CONSTANTS } from '../../shared/models/library-constants.model';
import { FormField, FormFieldType, SelectFormField } from './models/form-field.model';
import { FormService } from './services/form.service';

@Component({
    selector: 'ys-form',
    standalone: true,
    imports: [TranslateModule, NgbTooltipModule, CommonModule, ButtonComponent, FormSectionComponent],
    templateUrl: './form.component.html'
})
export class FormComponent implements OnInit, OnChanges {
    @Input() config?: FormConfig;

    translationPrefix = LIBRARY_CONSTANTS.TRANSLATIONS_PREFIX;

    saveButton = new Button({
        label: `${this.translationPrefix}form.button.save`,
        tooltip: '',
        disabled: true,
        action: () => this.saveAction()
    });
    cancelButton = new Button({
        label: `${this.translationPrefix}form.button.cancel`,
        tooltip: '',
        disabled: true,
        action: () => this.cancelAction(),
        type: ButtonType.Secondary
    });

    constructor(private readonly formService: FormService) {}

    ngOnInit(): void {
        this.checkForm();
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['config']) {
            this.ngOnInit();
        }
    }

    getFormHeightStyle(): string {
        if (this.config) {
            return `height: ${this.config.height};`;
        }
        return '';
    }

    sectionValueChange(): void {
        this.checkForm();
    }

    private checkForm(): void {
        this.formService.updateFieldsVisibility(this.config);
        this.formService.updateSaveButton(this.saveButton, this.config);
        this.formService.updateCancelButton(this.cancelButton, this.config);
    }

    private saveAction(): void {
        if (this.formService.isValid(this.config) && this.formService.hasChanges(this.config)) {
            const formValue = this.formService.getFormValue(this.config);
            this.config?.submitAction(formValue);
        }
    }

    private cancelAction(): void {
        if (this.formService.hasChanges(this.config)) {
            // TODO: implements a confirmation
            this.formService.resetValues(this.config);
            if (this.config && this.config.cancelAction) {
                this.config.cancelAction();
            }
            this.checkForm();
        }
    }
}
