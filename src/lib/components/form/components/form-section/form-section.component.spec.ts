import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormSectionComponent } from './form-section.component';
import { FormConfig, FormSection } from '../../models/form-config.model';
import { FormField } from '../../models/form-field.model';
import { provideHttpClient } from '@angular/common/http';

describe('FormSectionComponent', () => {
    let component: FormSectionComponent;
    let fixture: ComponentFixture<FormSectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [FormSectionComponent],
            providers: [provideHttpClient()]
        }).compileComponents();

        fixture = TestBed.createComponent(FormSectionComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should return correct section key', () => {
        component.formConfig = { prefix: 'formPrefix' } as FormConfig;
        component.section = { key: 'sectionKey', fields: [] } as unknown as FormSection;
        const key = component.getSectionKey();
        expect(key).toBe('formPrefix.sectionKey');
    });

    it('should return correct field width string', () => {
        const field = { key: 'f1', width: 50 } as unknown as FormField;
        const width = component.getFieldWidth(field);
        expect(width).toBe('50%');
    });

    it('should emit valueChange on fieldChange', () => {
        spyOn(component.valueChange, 'emit');
        component.fieldChange();
        expect(component.valueChange.emit).toHaveBeenCalled();
    });
});
