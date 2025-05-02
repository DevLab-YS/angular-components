export class FormField {
    key: string;
    type: FormFieldType;
    value: FieldValue;
    width: number;
    disabled: boolean;
    hidden: boolean;
    required: boolean;

    constructor({
        key,
        type,
        value,
        width = 100,
        disabled = false,
        hidden = false,
        required = false
    }: FormFieldParameters) {
        this.key = key;
        this.type = type;
        this.value = value;
        this.width = width;
        this.disabled = disabled;
        this.hidden = hidden;
        this.required = required;
    }

    hasChanges(): boolean {
        return this.value.current !== this.value.initial;
    }

    resetValue(): void {
        this.value.current = this.value.initial;
    }

    setValue(value: unknown): void {
        this.value.initial = value;
        this.value.current = value;
    }

    updateValue(value: unknown): void {
        this.value.current = value;
    }
}

export interface FormFieldParameters {
    key: string;
    type: FormFieldType;
    value: FieldValue;
    width?: number;
    disabled?: boolean;
    hidden?: boolean;
    required?: boolean;
}

export enum FormFieldType {
    Text = 'text',
    Select = 'select'
}

export class FieldValue {
    constructor(
        public initial: unknown,
        public current: unknown
    ) {}
}

export class TextFormField extends FormField {
    constructor({ key, width, disabled, hidden, required }: TextFormFieldParameters) {
        super({
            key,
            type: FormFieldType.Text,
            value: new FieldValue('', ''),
            width,
            disabled,
            hidden,
            required
        });
    }
}

export interface TextFormFieldParameters {
    key: string;
    width?: number;
    disabled?: boolean;
    hidden?: boolean;
    required?: boolean;
}

export class SelectFormField extends FormField {
    options: SelectOption[];

    constructor({ key, width, disabled, hidden, required, options }: SelectFormFieldParameters) {
        super({
            key,
            type: FormFieldType.Select,
            value: new FieldValue('', ''),
            width,
            disabled,
            hidden,
            required
        });
        this.options = options;
    }
}

export interface SelectFormFieldParameters {
    key: string;
    width?: number;
    disabled?: boolean;
    hidden?: boolean;
    required?: boolean;
    options: SelectOption[];
}

export class SelectOption {
    value: string;
    visibleFields: string[];

    constructor({ value, visibleFields = [] }: SelectOptionParameters) {
        this.value = value;
        this.visibleFields = visibleFields;
    }
}

export interface SelectOptionParameters {
    value: string;
    visibleFields?: string[];
}
