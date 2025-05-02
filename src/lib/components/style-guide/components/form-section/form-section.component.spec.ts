import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormSectionComponent } from './form-section.component';
import { FormComponent } from '../../../form/form.component';

describe('FormSectionComponent', () => {
    let component: FormSectionComponent;
    let fixture: ComponentFixture<FormSectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, FormComponent, TranslateModule]
        }).compileComponents();

        fixture = TestBed.createComponent(FormSectionComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
