export class Button {
    label: string;
    tooltip: string;
    type: ButtonType;
    disabled: boolean;
    action: () => void;

    constructor({ label, tooltip = '', type = ButtonType.Primary, disabled = false, action }: ButtonParameters) {
        this.label = label;
        this.tooltip = tooltip;
        this.type = type;
        this.disabled = disabled;
        this.action = action;
    }
}

export interface ButtonParameters {
    label: string;
    tooltip?: string;
    type?: ButtonType;
    disabled?: boolean;
    action: () => void;
}

export enum ButtonType {
    Primary = 'primary',
    Secondary = 'secondary',
    Tertiary = 'tertiary'
}
