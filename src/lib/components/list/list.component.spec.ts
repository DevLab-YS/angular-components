import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListComponent } from './list.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { MatMenuModule } from '@angular/material/menu';
import { ListConfig, ListSection, ListItem, ListItemType } from './models/list-config.model';

describe('ListComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FontAwesomeModule, TranslateModule.forRoot(), NgbTooltipModule, MatMenuModule]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should toggle the section visibility when clickHeader is called', () => {
        const section = new ListSection({
            key: 'test',
            showItems: false,
            items: []
        });

        component.clickHeader(section);
        expect(section.showItems).toBeTrue();

        component.clickHeader(section);
        expect(section.showItems).toBeFalse();
    });

    it('should return correct classes for Card item type', () => {
        const item = new ListItem({
            type: ListItemType.Card,
            title: 'Card Item'
        });

        const classes = component.getItemClasses(item);
        expect(classes).toContain('tw-bg-background-tertiary');
        expect(classes).toContain('tw-shadow-md');
        expect(classes).toContain('hover:tw-opacity-80');
    });

    it('should return correct classes for Text item type', () => {
        const item = new ListItem({
            type: ListItemType.Text,
            title: 'Card Item'
        });

        const classes = component.getItemClasses(item);
        expect(classes).toContain('tw-bg-transparent');
        expect(classes).toContain('hover:tw-text-primaryInverse');
    });
});
