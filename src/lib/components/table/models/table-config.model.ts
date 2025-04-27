import { EventEmitter } from '@angular/core';
import { TableCell } from './table-cell.model';

export class TableConfig {
    prefix: string;
    height: string;
    selectable: boolean;
    showTooltip: boolean;
    items: Record<string, unknown>[];
    columns: TableColumn[];
    loadCells: (item: Record<string, unknown>) => TableCell[];
    selectedItemsChange?: (items: Record<string, unknown>[], indexes: number[]) => void;
    $loadTable: EventEmitter<void>;

    constructor({
        prefix,
        height = '60vh',
        selectable = true,
        showTooltip = false,
        items = [],
        columns,
        loadCells,
        selectedItemsChange,
        $loadTable
    }: TableConfigParameters) {
        this.prefix = prefix;
        this.height = height;
        this.selectable = selectable;
        this.showTooltip = showTooltip;
        this.items = items;
        this.columns = columns;
        this.loadCells = loadCells;
        this.selectedItemsChange = selectedItemsChange;
        this.$loadTable = $loadTable;
    }
}

export interface TableConfigParameters {
    prefix: string;
    height?: string;
    selectable?: boolean;
    showTooltip?: boolean;
    items?: Record<string, unknown>[];
    columns: TableColumn[];
    loadCells: (item: Record<string, unknown>) => TableCell[];
    selectedItemsChange?: (items: Record<string, unknown>[], indexes: number[]) => void;
    $loadTable: EventEmitter<void>;
}

export class TableColumn {
    key: string;
    width: number;

    constructor({ key, width = 10 }: TableColumnParameters) {
        this.key = key;
        this.width = width;
    }
}

export interface TableColumnParameters {
    key: string;
    width?: number;
}

export class TableRow {
    cells: TableCell[];
    selected: boolean;
    content: Record<string, unknown>;

    constructor({ cells, selected = false, content }: TableRowParameters) {
        this.cells = cells;
        this.selected = selected;
        this.content = content;
    }
}

export interface TableRowParameters {
    cells: TableCell[];
    selected?: boolean;
    content: Record<string, unknown>;
}
