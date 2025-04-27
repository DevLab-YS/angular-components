import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { TableConfig, TableRow } from '../../models/table-config.model';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { faCircleCheck as faCircleCheck_reg } from '@fortawesome/free-regular-svg-icons';
import { TableService } from '../../services/table.service';
import { TableCellComponent } from '../cell/cell.component';
import { CheckboxComponent } from '../../../checkbox/checkbox.component';

@Component({
    selector: 'ys-table-row',
    standalone: true,
    imports: [
        TranslateModule,
        NgbTooltipModule,
        FontAwesomeModule,
        CommonModule,
        MatCheckboxModule,
        FormsModule,
        TableCellComponent,
        CheckboxComponent
    ],
    templateUrl: './row.component.html'
})
export class TableRowComponent {
    @Input() row?: TableRow;
    @Input() config?: TableConfig;
    @Output() rowSelected = new EventEmitter<boolean>();

    checkedIcon = faCircleCheck;
    uncheckedIcon = faCircleCheck_reg;

    constructor(private readonly tableService: TableService) {}

    getColumnWidth(index: number): string {
        const column = this.config!.columns[index];
        return this.tableService.getColumnWidth(this.config!.columns || [], column.width);
    }

    updateSelectedValue() {
        if (this.row) {
            this.rowSelected.next(this.row.selected);
        }
    }
}
