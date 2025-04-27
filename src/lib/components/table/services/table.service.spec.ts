import { TestBed } from '@angular/core/testing';
import { TableService } from './table.service';
import { TableColumn } from '../models/table-config.model';

describe('TableService', () => {
    let service: TableService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(TableService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    describe('getColumnWidth', () => {
        it('should return relative width when total column width is 0', () => {
            const columns: TableColumn[] = [
                new TableColumn({ key: 'column1', width: 0 }),
                new TableColumn({ key: 'column2', width: 0 })
            ];
            const relativeWidth = 100;
            const result = service.getColumnWidth(columns, relativeWidth);
            expect(result).toBe('100%');
        });

        it('should calculate the correct width when columns have width', () => {
            const columns: TableColumn[] = [
                new TableColumn({ key: 'column1', width: 50 }),
                new TableColumn({ key: 'column2', width: 50 })
            ];
            const relativeWidth = 100;
            const result = service.getColumnWidth(columns, relativeWidth);

            const totalWidth = columns[0].width + columns[1].width;
            const expectedWidth = (relativeWidth / totalWidth) * 100;

            expect(result).toContain(`calc(${expectedWidth}%`);
        });

        it('should correctly calculate the width taking into account the checkbox width', () => {
            const columns: TableColumn[] = [
                new TableColumn({ key: 'column1', width: 100 }),
                new TableColumn({ key: 'column2', width: 200 })
            ];
            const relativeWidth = 100;
            const result = service.getColumnWidth(columns, relativeWidth);

            const totalWidth = columns[0].width + columns[1].width;
            const expectedWidth = (relativeWidth / totalWidth) * 100;

            expect(result).toContain(`calc(${expectedWidth}%`);
        });
    });
});
