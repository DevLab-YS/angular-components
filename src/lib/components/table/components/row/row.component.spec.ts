import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableRowComponent } from './row.component';
import { TableService } from '../../services/table.service';
import { TableRow, TableConfig, TableColumn } from '../../models/table-config.model';
import { CheckboxComponent } from '../../../checkbox/checkbox.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormsModule } from '@angular/forms';
import { TableCellComponent } from '../cell/cell.component';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';

describe('TableRowComponent', () => {
    let component: TableRowComponent;
    let fixture: ComponentFixture<TableRowComponent>;
    let tableServiceSpy: jasmine.SpyObj<TableService>;

    beforeEach(async () => {
        tableServiceSpy = jasmine.createSpyObj('TableService', ['getColumnWidth']);

        await TestBed.configureTestingModule({
            imports: [
                TableRowComponent,
                CheckboxComponent,
                TableCellComponent,
                TranslateModule.forRoot(),
                NgbTooltipModule,
                CommonModule,
                MatCheckboxModule,
                FormsModule
            ],
            providers: [{ provide: TableService, useValue: tableServiceSpy }]
        }).compileComponents();

        fixture = TestBed.createComponent(TableRowComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('getColumnWidth()', () => {
        it('should call TableService.getColumnWidth with correct parameters', () => {
            const column = new TableColumn({
                    width: 120,
                    key: 'name'
                }),
                config = new TableConfig({
                    prefix: 'table',
                    columns: [column],
                    items: [],
                    loadCells: () => [],
                    $loadTable: new EventEmitter<void>()
                });
            component.config = config;

            tableServiceSpy.getColumnWidth.and.returnValue('120px');

            const width = component.getColumnWidth(0);

            expect(tableServiceSpy.getColumnWidth).toHaveBeenCalledWith(config.columns, config.columns[0].width);
            expect(width).toBe('120px');
        });
    });

    describe('updateSelectedValue()', () => {
        it('should emit rowSelected event with row.selected', () => {
            const row: TableRow = new TableRow({
                cells: [],
                content: {},
                selected: true
            });
            component.row = row;

            spyOn(component.rowSelected, 'next');

            component.updateSelectedValue();

            expect(component.rowSelected.next).toHaveBeenCalledWith(true);
        });

        it('should not emit rowSelected if row is undefined', () => {
            spyOn(component.rowSelected, 'next');

            component.row = undefined;
            component.updateSelectedValue();

            expect(component.rowSelected.next).not.toHaveBeenCalled();
        });
    });
});
