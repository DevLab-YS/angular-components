export class ListConfig {
    sections: ListSection[];
    prefix: string;

    constructor({ sections, prefix }: ListConfigParameters) {
        this.sections = sections;
        this.prefix = prefix;
    }
}

export interface ListConfigParameters {
    sections: ListSection[];
    prefix: string;
}

export class ListSection {
    key: string;
    showTitle: boolean;
    showItems: boolean;
    items: ListItem[];
    action: (item: ListItem) => void;

    constructor({ key, items, showTitle = true, showItems = true }: ListSectionParameters) {
        this.key = key;
        this.items = items;
        this.showTitle = showTitle;
        this.showItems = showItems;
    }
}

export interface ListSectionParameters {
    key: string;
    items: ListItem[];
    showTitle?: boolean;
    showItems?: boolean;
    action?: (item: ListItem) => void;
}

export class ListItem {
    title: string;
    type: ListItemType;
    tooltip: string;
    content?: Record<string, unknown>;

    constructor({ title, type = ListItemType.Card, tooltip = '', content }: ListItemParameters) {
        this.title = title;
        this.content = content;
        this.tooltip = tooltip;
        this.type = type;
    }
}

export interface ListItemParameters {
    title: string;
    type: ListItemType;
    tooltip?: string;
    content?: Record<string, unknown>;
}

export enum ListItemType {
    Card = 'card',
    Text = 'text'
}
