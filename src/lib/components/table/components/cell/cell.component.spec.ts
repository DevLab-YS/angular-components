import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableCellComponent } from './cell.component';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LinkTableCell } from '../../models/table-cell.model';

describe('TableCellComponent', () => {
    let component: TableCellComponent;
    let fixture: ComponentFixture<TableCellComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TableCellComponent,
                TranslateModule.forRoot(),
                NgbTooltipModule,
                FontAwesomeModule,
                CommonModule,
                FormsModule
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(TableCellComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    describe('clickLink()', () => {
        it('should call action if cell has action', () => {
            const actionSpy = jasmine.createSpy('action');
            component.cell = new LinkTableCell({
                content: 'test',
                action: actionSpy
            });

            component.clickLink();

            expect(actionSpy).toHaveBeenCalled();
        });

        it('should not throw error if cell is undefined', () => {
            component.cell = undefined;

            expect(() => component.clickLink()).not.toThrow();
        });
    });
});
