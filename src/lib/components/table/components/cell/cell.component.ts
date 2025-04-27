import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { LinkTableCell, TableCell } from '../../models/table-cell.model';

@Component({
    selector: 'app-table-cell',
    standalone: true,
    imports: [TranslateModule, NgbTooltipModule, FontAwesomeModule, CommonModule, FormsModule],
    templateUrl: './cell.component.html'
})
export class TableCellComponent {
    @Input() cell?: TableCell;

    clickLink() {
        if (this.cell && (this.cell as LinkTableCell).action) {
            (this.cell as LinkTableCell).action();
        }
    }
}
