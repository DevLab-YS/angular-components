import { FormField } from './form-field.model';

export class FormConfig {
    prefix: string;
    header: string;
    height: string;
    sections: FormSection[];
    cancelAction?: () => void;
    submitAction: (value: Record<string, unknown>) => void;

    constructor({ prefix, header, height = '50vh', sections, cancelAction, submitAction }: FormConfigParameters) {
        this.prefix = prefix;
        this.header = header;
        this.height = height;
        this.sections = sections;
        this.cancelAction = cancelAction;
        this.submitAction = submitAction;
    }

    hasChanges(): boolean {
        let changes = false;

        this.sections.forEach(section => {
            if (section.hasChanges()) {
                changes = true;
            }
        });

        return changes;
    }

    resetValues(): void {
        this.sections.forEach(section => section.resetValues());
    }

    setValues(value: Record<string, Record<string, unknown>>): void {
        const sectionKeys = Object.keys(value);

        sectionKeys.forEach(sectionKey => {
            const foundSection = this.sections.find(section => section.key === sectionKey);

            if (foundSection) {
                foundSection.setValues(value[sectionKey]);
            }
        });
    }

    getField(key: string): FormField | undefined {
        const keyParts = key.split('.');

        if (keyParts.length !== 2 || !keyParts[0] || !keyParts[1]) {
            return undefined;
        }

        const sectionIndex = this.sections.findIndex(section => section.key === keyParts[0]);

        if (sectionIndex === -1) {
            return undefined;
        }

        const fields = this.sections[sectionIndex].fields.flat(),
            field = fields.find(field => field.key === keyParts[1]);

        return field;
    }
}

export interface FormConfigParameters {
    prefix: string;
    header: string;
    height?: string;
    sections: FormSection[];
    cancelAction?: () => void;
    submitAction: (formValue: unknown) => void;
}

export class FormSection {
    key: string;
    fields: FormField[][];
    showTitle: boolean;
    showTooltip: boolean;

    constructor({ key, fields, showTitle = true, showTooltip = true }: FormSectionParameters) {
        this.key = key;
        this.fields = fields;
        this.showTitle = showTitle;
        this.showTooltip = showTooltip;
    }

    hasChanges(): boolean {
        let changes = false;

        this.fields.forEach(row => {
            row.forEach(field => {
                if (!field.disabled && !field.hidden && field.hasChanges()) {
                    changes = true;
                }
            });
        });
        return changes;
    }

    resetValues(): void {
        this.fields.forEach(row => {
            row.forEach(field => {
                field.resetValue();
            });
        });
    }

    setValues(values: Record<string, unknown>) {
        const fieldKeys = Object.keys(values);
        const fields = this.fields.flat();

        fieldKeys.forEach(fieldKey => {
            const foundField = fields.find(field => field.key === fieldKey);

            if (foundField) {
                foundField.setValue(values[fieldKey]);
            }
        });
    }
}

export interface FormSectionParameters {
    key: string;
    fields: FormField[][];
    showTitle?: boolean;
    showTooltip?: boolean;
}
