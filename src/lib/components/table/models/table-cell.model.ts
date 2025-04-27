export class TableCell {
    content: unknown;
    tooltip?: string;
    type: CellType;
    translate: boolean;

    constructor({ tooltip, type, content, translate = false }: TableCellParameters) {
        this.tooltip = tooltip;
        this.type = type;
        this.content = content;
        this.translate = translate;
    }
}

export interface TableCellParameters {
    tooltip?: string;
    type: CellType;
    content: unknown;
    translate?: boolean;
}

export enum CellType {
    Text = 'text',
    Link = 'link'
}

export class TextTableCell extends TableCell {
    constructor({ tooltip, content, translate }: TextTableCellParameters) {
        super({ tooltip, type: CellType.Text, content, translate });
    }
}

export interface TextTableCellParameters {
    tooltip?: string;
    content: string;
    translate?: boolean;
}

export class LinkTableCell extends TableCell {
    action: () => void;

    constructor({ tooltip, content, action, translate }: LinkTableCellParameters) {
        super({ tooltip, type: CellType.Link, content, translate });
        this.action = action;
    }
}

export interface LinkTableCellParameters {
    tooltip?: string;
    content: string;
    translate?: boolean;
    action: () => void;
}
