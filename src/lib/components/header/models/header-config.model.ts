import { IconDefinition } from '@fortawesome/angular-fontawesome';

export class HeaderConfig {
    leftActions: HeaderAction[] = [];
    rightActions: HeaderAction[] = [];
    prefix: string;

    constructor({ prefix, leftActions = [], rightActions = [] }: HeaderConfigParameters) {
        this.prefix = prefix;
        this.leftActions = leftActions;
        this.rightActions = rightActions;
    }
}

export interface HeaderConfigParameters {
    prefix: string;
    leftActions?: HeaderAction[];
    rightActions?: HeaderAction[];
}

export class HeaderAction {
    key: string;
    type: HeaderActionType;
    icon?: IconDefinition;
    action: () => void;

    showLabel: boolean;
    showTooltip: boolean;

    constructor({
        key,
        type = HeaderActionType.Text,
        icon,
        action,
        showLabel = true,
        showTooltip = true
    }: HeaderActionParameters) {
        this.key = key;
        this.type = type;
        this.icon = icon;
        this.action = action;
        this.showLabel = showLabel;
        this.showTooltip = showTooltip;
    }
}

export interface HeaderActionParameters {
    key: string;
    type?: HeaderActionType;
    icon?: IconDefinition;
    action: () => void;

    showLabel?: boolean;
    showTooltip?: boolean;
}

export enum HeaderActionType {
    PrimaryButton = 'primary-button',
    SecondaryButton = 'secondary-button',
    Text = 'text'
}
