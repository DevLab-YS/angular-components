import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormComponent } from './form.component';
import { FormService } from './services/form.service';
import { ButtonType } from '../button/models/button.model';
import { provideHttpClient } from '@angular/common/http';
import { FormConfig } from './models/form-config.model';

describe('FormComponent', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;
    let mockFormService: jasmine.SpyObj<FormService>;

    beforeEach(async () => {
        mockFormService = jasmine.createSpyObj<FormService>('FormService', [
            'updateFieldsVisibility',
            'updateSaveButton',
            'updateCancelButton',
            'isValid',
            'hasChanges',
            'getFormValue',
            'resetValues'
        ]);

        await TestBed.configureTestingModule({
            imports: [FormComponent],
            providers: [{ provide: FormService, useValue: mockFormService }, provideHttpClient()]
        }).compileComponents();

        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should call checkForm on ngOnInit', () => {
        component.config = { sections: [] } as unknown as FormConfig;
        component.ngOnInit();
        expect(mockFormService.updateFieldsVisibility).toHaveBeenCalledWith(component.config);
        expect(mockFormService.updateSaveButton).toHaveBeenCalledWith(component.saveButton, component.config);
        expect(mockFormService.updateCancelButton).toHaveBeenCalledWith(component.cancelButton, component.config);
    });

    it('should call ngOnInit on config change', () => {
        spyOn(component, 'ngOnInit');
        const changes = {
            config: {
                currentValue: {},
                previousValue: null,
                firstChange: true,
                isFirstChange: () => true
            }
        };
        component.ngOnChanges(changes);
        expect(component.ngOnInit).toHaveBeenCalled();
    });

    it('should return form height style when config is set', () => {
        component.config = { height: '400px' } as unknown as FormConfig;
        expect(component.getFormHeightStyle()).toBe('height: 400px;');
    });

    it('should return empty string when config is not set', () => {
        component.config = undefined;
        expect(component.getFormHeightStyle()).toBe('');
    });

    it('should call checkForm on sectionValueChange', () => {
        component.config = { sections: [] } as unknown as FormConfig;
        component.sectionValueChange();
        expect(mockFormService.updateFieldsVisibility).toHaveBeenCalled();
    });

    it('should call submitAction on saveAction when form is valid and has changes', () => {
        const submitSpy = jasmine.createSpy('submitAction');
        component.config = {
            submitAction: submitSpy
        } as unknown as FormConfig;

        mockFormService.isValid.and.returnValue(true);
        mockFormService.hasChanges.and.returnValue(true);
        mockFormService.getFormValue.and.returnValue({ test: 1 });

        component['saveAction']();
        expect(mockFormService.getFormValue).toHaveBeenCalledWith(component.config);
        expect(submitSpy).toHaveBeenCalledWith({ test: 1 });
    });

    it('should not call submitAction if form is invalid or has no changes', () => {
        const submitSpy = jasmine.createSpy('submitAction');
        component.config = {
            submitAction: submitSpy
        } as unknown as FormConfig;

        mockFormService.isValid.and.returnValue(false);
        mockFormService.hasChanges.and.returnValue(true);

        component['saveAction']();
        expect(submitSpy).not.toHaveBeenCalled();

        mockFormService.isValid.and.returnValue(true);
        mockFormService.hasChanges.and.returnValue(false);

        component['saveAction']();
        expect(submitSpy).not.toHaveBeenCalled();
    });

    it('should call reset and cancel actions on cancelAction when there are changes', () => {
        const cancelSpy = jasmine.createSpy('cancelAction');
        component.config = {
            cancelAction: cancelSpy
        } as unknown as FormConfig;

        mockFormService.hasChanges.and.returnValue(true);

        component['cancelAction']();
        expect(mockFormService.resetValues).toHaveBeenCalledWith(component.config);
        expect(cancelSpy).toHaveBeenCalled();
        expect(mockFormService.updateFieldsVisibility).toHaveBeenCalled(); // checkForm
    });

    it('should not call reset or cancelAction if there are no changes', () => {
        const cancelSpy = jasmine.createSpy('cancelAction');
        component.config = {
            cancelAction: cancelSpy
        } as unknown as FormConfig;

        mockFormService.hasChanges.and.returnValue(false);

        component['cancelAction']();
        expect(mockFormService.resetValues).not.toHaveBeenCalled();
        expect(cancelSpy).not.toHaveBeenCalled();
    });

    it('should initialize buttons with correct properties', () => {
        expect(component.saveButton.label).toContain('form.button.save');
        expect(component.saveButton.disabled).toBeTrue();
        expect(component.cancelButton.label).toContain('form.button.cancel');
        expect(component.cancelButton.disabled).toBeTrue();
        expect(component.cancelButton.type).toBe(ButtonType.Secondary);
    });
});
