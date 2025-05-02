import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormFieldComponent } from './form-field.component';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { FormField } from '../../models/form-field.model';
import { CommonModule } from '@angular/common';

describe('FormFieldComponent', () => {
    let component: FormFieldComponent;
    let fixture: ComponentFixture<FormFieldComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, FormsModule, TranslateModule.forRoot(), FormFieldComponent]
        }).compileComponents();

        fixture = TestBed.createComponent(FormFieldComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should return the correct field key with prefix', () => {
        component.prefix = 'testPrefix';
        component.field = { key: 'name', type: 'text' } as FormField;
        expect(component.getFieldKey()).toBe('testPrefix.name');
    });

    it('should emit change event on inputChange', () => {
        spyOn(component.change, 'emit');
        component.inputChange();
        expect(component.change.emit).toHaveBeenCalled();
    });

    it('should return default classes string from getClasses()', () => {
        const classes = component.getClasses();
        expect(classes).toContain('tw-w-full');
    });
});
