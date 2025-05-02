import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ButtonComponent } from './button.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbTooltip } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule } from '@ngx-translate/core';
import { Button, ButtonType } from './models/button.model';

describe('ButtonComponent', () => {
    let component: ButtonComponent;
    let fixture: ComponentFixture<ButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule, NgbTooltip, TranslateModule.forRoot(), ButtonComponent]
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should call action function if button is defined', () => {
        const actionMock = jasmine.createSpy(),
            button = new Button({
                label: 'test',
                type: ButtonType.Primary,
                action: actionMock
            });
        component.button = button;

        component.onClick();
        expect(actionMock).toHaveBeenCalled();
    });

    describe('getClasses', () => {
        it('should return correct class for primary button', () => {
            component.button = new Button({
                label: 'btn',
                type: ButtonType.Primary,
                action: () => {}
            });

            const classes = component.getClasses();
            expect(classes).toContain('tw-bg-text-primary');
        });

        it('should return correct class for secondary button', () => {
            component.button = new Button({
                label: 'btn',
                type: ButtonType.Secondary,
                action: () => {}
            });

            const classes = component.getClasses();
            expect(classes).toContain('tw-border-text-secondaryInverse');
        });

        it('should return correct class for tertiary button', () => {
            component.button = new Button({
                label: 'btn',
                type: ButtonType.Tertiary,
                action: () => {}
            });

            const classes = component.getClasses();
            expect(classes).toContain('tw-text-text-primary');
        });

        it('should return empty string if action is undefined', () => {
            component.button = undefined;
            expect(component.getClasses()).toBe('');
        });
    });
});
