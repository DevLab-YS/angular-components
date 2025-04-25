import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderActionComponent } from './header-action.component';
import { HeaderAction, HeaderActionType } from '../../models/header-config.model';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { CommonModule } from '@angular/common';

describe('HeaderActionComponent', () => {
    let component: HeaderActionComponent;
    let fixture: ComponentFixture<HeaderActionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [
                TranslateModule.forRoot(),
                NgbTooltipModule,
                FontAwesomeModule,
                CommonModule,
                HeaderActionComponent
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderActionComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should call action function when clickAction is called', () => {
        const actionMock = jasmine.createSpy();
        const action = new HeaderAction({
            key: 'test',
            type: HeaderActionType.Text,
            action: actionMock
        });

        component.clickAction(action);
        expect(actionMock).toHaveBeenCalled();
    });

    describe('getTypeClasses', () => {
        it('should return correct class for PrimaryButton', () => {
            component.action = new HeaderAction({
                key: 'btn',
                type: HeaderActionType.PrimaryButton,
                action: () => {}
            });

            const classes = component.getTypeClasses();
            expect(classes).toContain('tw-bg-text-primary');
        });

        it('should return correct class for SecondaryButton', () => {
            component.action = new HeaderAction({
                key: 'btn',
                type: HeaderActionType.SecondaryButton,
                action: () => {}
            });

            const classes = component.getTypeClasses();
            expect(classes).toContain('tw-border-text-secondaryInverse');
        });

        it('should return correct class for Text', () => {
            component.action = new HeaderAction({
                key: 'btn',
                type: HeaderActionType.Text,
                action: () => {}
            });

            const classes = component.getTypeClasses();
            expect(classes).toContain('tw-text-text-primary');
        });

        it('should return empty string if action is undefined', () => {
            component.action = undefined;
            expect(component.getTypeClasses()).toBe('');
        });
    });
});
