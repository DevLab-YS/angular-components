import { Component, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TableComponent } from '../../../table/table.component';
import { TableColumn, TableConfig } from '../../../table/models/table-config.model';
import { LinkTableCell, TextTableCell } from '../../../table/models/table-cell.model';
import { LIBRARY_CONSTANTS } from '../../../../shared/models/library-constants.model';

@Component({
    selector: 'ys-table-section',
    standalone: true,
    imports: [CommonModule, TranslateModule, TableComponent],
    templateUrl: './table-section.component.html'
})
export class TableSectionComponent {
    translationPrefix = LIBRARY_CONSTANTS.TRANSLATIONS_PREFIX;
    items = [
        { text: 'item 1', link: '/books/item1' },
        { text: 'item 2', link: '/books/item2' }
    ];
    columns = [new TableColumn({ key: 'name' }), new TableColumn({ key: 'path' })];
    loadCellsAction = (item: Record<string, unknown>) => {
        const itemFormatted = item as { text: string; link: string };
        return [
            new TextTableCell({ content: itemFormatted.text }),
            new LinkTableCell({ content: itemFormatted.link, action: () => {} })
        ];
    };
    tablePrefix = 'angular-components.style-guide.section.table.table';
    height = '200px';
    $loadTableEvent = new EventEmitter<void>();

    unselectableTableConfig = new TableConfig({
        prefix: this.tablePrefix,
        height: this.height,
        selectable: false,
        items: this.items,
        columns: this.columns,
        loadCells: this.loadCellsAction,
        $loadTable: this.$loadTableEvent
    });
    selectableTableConfig = new TableConfig({
        prefix: this.tablePrefix,
        height: this.height,
        selectable: true,
        items: this.items,
        columns: this.columns,
        loadCells: this.loadCellsAction,
        $loadTable: this.$loadTableEvent
    });
    emptyTableConfig = new TableConfig({
        prefix: this.tablePrefix,
        height: this.height,
        selectable: true,
        items: [],
        columns: this.columns,
        loadCells: this.loadCellsAction,
        $loadTable: this.$loadTableEvent
    });
}
