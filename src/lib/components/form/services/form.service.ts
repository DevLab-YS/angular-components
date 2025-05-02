import { Injectable } from '@angular/core';
import { FormConfig } from '../models/form-config.model';
import { FormField, FormFieldType, SelectFormField } from '../models/form-field.model';
import { LIBRARY_CONSTANTS } from '../../../shared/models/library-constants.model';
import { Button } from '../../button/models/button.model';

@Injectable({
    providedIn: 'root'
})
export class FormService {
    translationPrefix = LIBRARY_CONSTANTS.TRANSLATIONS_PREFIX;
    invalidFieldsMessage = `${this.translationPrefix}form.message.check-fields`;
    noChangesMessage = `${this.translationPrefix}form.message.has-no-changes`;

    constructor() {}

    getAcceptTooltip(config?: FormConfig): string {
        let tooltip = '';
        if (!this.hasChanges(config)) {
            tooltip = this.noChangesMessage;
        }

        if (!this.isValid(config)) {
            tooltip = this.invalidFieldsMessage;
        }

        return tooltip;
    }

    getFormValue(config?: FormConfig): Record<string, unknown> {
        const formValue = {} as Record<string, unknown>;

        if (config) {
            config.sections.forEach(section => {
                const sectionValue = {} as Record<string, unknown>;

                section.fields.forEach(row => {
                    row.forEach(field => {
                        if (!field.hidden) {
                            sectionValue[field.key] = field.value.current;
                        }
                    });
                });

                formValue[section.key] = sectionValue;
            });
        }

        return formValue;
    }

    hasChanges(config?: FormConfig): boolean {
        if (config) {
            return config.hasChanges();
        }

        return false;
    }

    isValid(config?: FormConfig): boolean {
        if (!config) {
            return false;
        }

        let validForm = true;

        config.sections.forEach(section => {
            section.fields.forEach(row => {
                row.forEach(field => {
                    if (!field.hidden && !field.disabled) {
                        if (field.required && !field.value.current) {
                            validForm = false;
                        }
                    }
                });
            });
        });

        return validForm;
    }

    resetValues(config?: FormConfig): void {
        if (config) {
            config.sections.forEach(section => {
                section.resetValues();
            });
        }
    }

    updateCancelButton(cancelButton: Button, config?: FormConfig): void {
        const hasChanges = this.hasChanges(config);
        cancelButton.tooltip = hasChanges ? '' : this.noChangesMessage;
        cancelButton.disabled = !hasChanges;
    }

    updateFieldsVisibility(config?: FormConfig): void {
        if (config) {
            const fields: FormField[] = [];

            config.sections.forEach(section => {
                fields.push(...section.fields.flat());
            });

            const selectFields = fields.filter(field => field.type === FormFieldType.Select);

            selectFields.forEach(field => this.hideSelectSubfields(field as SelectFormField, config));
        }
    }

    updateSaveButton(saveButton: Button, config?: FormConfig): void {
        saveButton.tooltip = this.getAcceptTooltip(config);
        saveButton.disabled = !(this.isValid(config) && this.hasChanges(config));
    }

    private hideSelectSubfields(select: SelectFormField, config: FormConfig): void {
        const allSubFields = new Set<string>();

        select.options.forEach(option => {
            option.visibleFields?.forEach(subfield => allSubFields.add(subfield));
        });

        allSubFields.forEach(subfieldKey => {
            const foundField = config.getField(subfieldKey);
            if (foundField) {
                foundField.hidden = true;
            }
        });

        if (!select.hidden) {
            const currentOption = select.options.find(option => option.value === select.value.current);

            if (currentOption) {
                currentOption.visibleFields.forEach(subfieldKey => {
                    const field = config.getField(subfieldKey);
                    if (field) {
                        field.hidden = false;
                    }
                });
            }
        }
    }
}
