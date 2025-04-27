import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableHeaderComponent } from './header.component';
import { TableService } from '../../services/table.service';
import { CheckboxComponent } from '../../../checkbox/checkbox.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableColumn, TableConfig } from '../../models/table-config.model';
import { of } from 'rxjs';
import { EventEmitter } from '@angular/core';

describe('TableHeaderComponent', () => {
    let component: TableHeaderComponent;
    let fixture: ComponentFixture<TableHeaderComponent>;
    let tableServiceSpy: jasmine.SpyObj<TableService>;

    beforeEach(async () => {
        const spy = jasmine.createSpyObj('TableService', ['getColumnWidth']);

        await TestBed.configureTestingModule({
            imports: [
                TableHeaderComponent,
                TranslateModule.forRoot(),
                NgbTooltipModule,
                CommonModule,
                FormsModule,
                CheckboxComponent
            ],
            providers: [{ provide: TableService, useValue: spy }]
        }).compileComponents();

        fixture = TestBed.createComponent(TableHeaderComponent);
        component = fixture.componentInstance;
        tableServiceSpy = TestBed.inject(TableService) as jasmine.SpyObj<TableService>;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('getColumnWidth()', () => {
        it('should call TableService.getColumnWidth with correct parameters', () => {
            const column: TableColumn = new TableColumn({ width: 100, key: 'test' });
            component.config = new TableConfig({
                prefix: 'table',
                columns: [column],
                items: [],
                loadCells: () => [],
                $loadTable: new EventEmitter<void>()
            });

            tableServiceSpy.getColumnWidth.and.returnValue('100px');

            const result = component.getColumnWidth(column);

            expect(tableServiceSpy.getColumnWidth).toHaveBeenCalledWith(component.config.columns, column.width);
            expect(result).toBe('100px');
        });
    });

    describe('updateSelectedValue()', () => {
        it('should emit headerSelected when config exists', () => {
            spyOn(component.headerSelected, 'next');
            component.config = new TableConfig({
                prefix: 'table',
                columns: [],
                items: [],
                loadCells: () => [],
                $loadTable: new EventEmitter<void>()
            });
            component.allRowsSelected = true;

            component.updateSelectedValue();

            expect(component.headerSelected.next).toHaveBeenCalledWith(true);
        });

        it('should not emit if config is undefined', () => {
            spyOn(component.headerSelected, 'next');
            component.config = undefined;

            component.updateSelectedValue();

            expect(component.headerSelected.next).not.toHaveBeenCalled();
        });
    });
});
