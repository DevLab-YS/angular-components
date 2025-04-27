import { Injectable } from '@angular/core';
import { TableColumn } from '../models/table-config.model';

@Injectable({
    providedIn: 'root'
})
export class TableService {
    getColumnWidth(columns: TableColumn[], relativeWidth: number): string {
        const checkboxWidth = 15;
        const totalWidth = columns.reduce((sum, item) => sum + item.width, 0) ?? 0;

        if (totalWidth === 0) {
            return `${relativeWidth}%`;
        }

        const absoluteWidth = relativeWidth / totalWidth;

        return `calc(${absoluteWidth * 100}% - ${checkboxWidth * absoluteWidth}px)`;
    }
}
