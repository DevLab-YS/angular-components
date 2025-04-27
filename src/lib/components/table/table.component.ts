import {
    AfterViewInit,
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnDestroy,
    OnInit,
    Output,
    SimpleChanges
} from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableHeaderComponent } from './components/header/header.component';
import { TableConfig, TableRow } from './models/table-config.model';
import { TableRowComponent } from './components/row/row.component';
import { Subscription } from 'rxjs';
import { LIBRARY_CONSTANTS } from '../../shared/models/library-constants.model';

@Component({
    selector: 'ys-table',
    standalone: true,
    imports: [
        TranslateModule,
        NgbTooltipModule,
        FontAwesomeModule,
        CommonModule,
        MatCheckboxModule,
        MatFormFieldModule,
        TableHeaderComponent,
        TableRowComponent
    ],
    templateUrl: './table.component.html'
})
export class TableComponent implements AfterViewInit, OnChanges, OnDestroy {
    @Input() config?: TableConfig;

    allSelected = false;
    rows: TableRow[] = [];

    translationPrefix = LIBRARY_CONSTANTS.TRANSLATIONS_PREFIX;

    private loadTableSubscription?: Subscription;

    ngAfterViewInit(): void {
        this.loadTable(true);
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (changes['config']) {
            this.loadTable(true);
        }
    }

    ngOnDestroy(): void {
        if (this.loadTableSubscription) {
            this.loadTableSubscription?.unsubscribe();
        }
    }

    headerSelected(value: boolean) {
        this.allSelected = value;
        this.rows.forEach(row => (row.selected = value));

        const selectedRows = this.rows.map((row, index) => ({ row, index })).filter(({ row }) => row.selected);
        this.notifySelectedRows(selectedRows, this.config);
    }

    rowSelected() {
        const totalRows = this.rows.length;
        const selectedRows = this.rows.map((row, index) => ({ row, index })).filter(({ row }) => row.selected);

        this.allSelected = selectedRows.length === totalRows;
        this.notifySelectedRows(selectedRows, this.config);
    }

    private loadTable(init = false): void {
        if (this.config) {
            if (init) {
                this.loadRows(this.config);
            }

            if (this.loadTableSubscription) {
                this.loadTableSubscription.unsubscribe();
            }

            this.loadTableSubscription = this.config.$loadTable.subscribe(() => {
                this.loadRows(this.config);
            });
        } else {
            this.loadRows();
        }
    }

    private loadRows(tableConfig?: TableConfig): void {
        if (tableConfig) {
            this.rows = tableConfig.items.map(
                item =>
                    new TableRow({
                        cells: tableConfig.loadCells(item),
                        content: item
                    })
            );
        } else {
            this.rows = [];
        }
        this.allSelected = false;
    }

    private notifySelectedRows(
        selectedRows: {
            row: TableRow;
            index: number;
        }[],
        config?: TableConfig
    ): void {
        if (config && config.selectedItemsChange) {
            config.selectedItemsChange(
                selectedRows.map(row => row.row.content),
                selectedRows.map(row => row.index)
            );
        }
    }
}
