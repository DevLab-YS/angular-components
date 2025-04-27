import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableComponent } from './table.component';
import { TableColumn, TableConfig, TableRow } from './models/table-config.model';
import { TableHeaderComponent } from './components/header/header.component';
import { TableRowComponent } from './components/row/row.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { EventEmitter } from '@angular/core';
import { TextTableCell } from './models/table-cell.model';

describe('TableComponent', () => {
    let component: TableComponent;
    let fixture: ComponentFixture<TableComponent>;
    let loadTableSubject: EventEmitter<void>;

    const mockItems = [{ id: 1 }, { id: 2 }, { id: 3 }];

    const mockTableConfig = new TableConfig({
        prefix: 'table',
        columns: [new TableColumn({ key: 'id', width: 100 })],
        items: mockItems,
        loadCells: item => [new TextTableCell({ content: (item as { id: string }).id })],
        $loadTable: new EventEmitter<void>(),
        selectedItemsChange: jasmine.createSpy('selectedItemsChange')
    });

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TableComponent,
                CommonModule,
                TranslateModule.forRoot(),
                NgbTooltipModule,
                FontAwesomeModule,
                MatCheckboxModule,
                MatFormFieldModule,
                TableHeaderComponent,
                TableRowComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TableComponent);
        component = fixture.componentInstance;
        loadTableSubject = mockTableConfig.$loadTable as EventEmitter<void>;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('loadTable()', () => {
        it('should initialize rows on init', () => {
            component.config = mockTableConfig;
            component.ngAfterViewInit();
            expect(component.rows.length).toBe(3);
        });

        it('should reload rows on $loadTable event', () => {
            component.config = mockTableConfig;
            component.ngAfterViewInit();

            // Modify to check reload
            component.rows = [];
            loadTableSubject.next();

            expect(component.rows.length).toBe(3);
        });
    });

    describe('rowSelected()', () => {
        it('should update allSelected to true if all rows are selected', () => {
            component.rows = mockItems.map(item => new TableRow({ cells: [], content: item, selected: true }));
            component.config = mockTableConfig;

            component.rowSelected();

            expect(component.allSelected).toBeTrue();
            expect(mockTableConfig.selectedItemsChange).toHaveBeenCalledWith(
                jasmine.arrayContaining([{ id: 1 }, { id: 2 }, { id: 3 }]),
                jasmine.arrayContaining([0, 1, 2])
            );
        });

        it('should update allSelected to false if not all rows are selected', () => {
            component.rows = [
                new TableRow({ cells: [], content: { id: 1 }, selected: true }),
                new TableRow({ cells: [], content: { id: 2 }, selected: false })
            ];
            component.config = mockTableConfig;

            component.rowSelected();

            expect(component.allSelected).toBeFalse();
        });
    });

    describe('headerSelected()', () => {
        it('should select all rows when header is selected', () => {
            component.rows = mockItems.map(item => new TableRow({ cells: [], content: item, selected: false }));
            component.config = mockTableConfig;

            component.headerSelected(true);

            expect(component.rows.every(row => row.selected)).toBeTrue();
            expect(mockTableConfig.selectedItemsChange).toHaveBeenCalled();
        });

        it('should deselect all rows when header is deselected', () => {
            component.rows = mockItems.map(item => new TableRow({ cells: [], content: item, selected: true }));
            component.config = mockTableConfig;

            component.headerSelected(false);

            expect(component.rows.every(row => !row.selected)).toBeTrue();
            expect(mockTableConfig.selectedItemsChange).toHaveBeenCalled();
        });
    });

    describe('ngOnChanges()', () => {
        it('should reload rows if config input changes', () => {
            spyOn(component as any, 'loadTable');
            const changes = {
                config: {
                    currentValue: mockTableConfig,
                    previousValue: undefined,
                    firstChange: true,
                    isFirstChange: () => true
                }
            };
            component.ngOnChanges(changes);
            expect(component['loadTable']).toHaveBeenCalledWith(true);
        });
    });

    describe('ngOnDestroy()', () => {
        it('should unsubscribe loadTableSubscription', () => {
            component.config = mockTableConfig;
            component.ngAfterViewInit();

            spyOn(component['loadTableSubscription']!, 'unsubscribe');

            component.ngOnDestroy();

            expect(component['loadTableSubscription']!.unsubscribe).toHaveBeenCalled();
        });
    });
});
