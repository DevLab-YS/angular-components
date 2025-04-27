import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TableColumn, TableConfig } from '../../models/table-config.model';
import { FormsModule } from '@angular/forms';
import { TableService } from '../../services/table.service';
import { CheckboxComponent } from '../../../checkbox/checkbox.component';

@Component({
    selector: 'ys-table-header',
    standalone: true,
    imports: [TranslateModule, NgbTooltipModule, CommonModule, FormsModule, CheckboxComponent],
    templateUrl: './header.component.html'
})
export class TableHeaderComponent {
    @Input() config?: TableConfig;
    @Input() allRowsSelected: boolean;
    @Output() headerSelected = new EventEmitter<boolean>();

    constructor(private readonly tableService: TableService) {}

    getColumnWidth(column: TableColumn): string {
        return this.tableService.getColumnWidth(this.config?.columns || [], column.width);
    }

    updateSelectedValue() {
        if (this.config) {
            this.headerSelected.next(this.allRowsSelected);
        }
    }
}
