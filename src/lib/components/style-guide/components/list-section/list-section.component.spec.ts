import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ListSectionComponent } from './list-section.component';
import { ListComponent } from '../../../list/list.component';

describe('ListSectionComponent', () => {
    let component: ListSectionComponent;
    let fixture: ComponentFixture<ListSectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, ListComponent, TranslateModule]
        }).compileComponents();

        fixture = TestBed.createComponent(ListSectionComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
