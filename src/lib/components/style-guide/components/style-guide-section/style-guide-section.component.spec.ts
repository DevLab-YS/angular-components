import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { StyleGuideSectionComponent } from './style-guide-section.component';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderSectionComponent } from '../header-section/header-section.component';

describe('StyleGuideSectionComponent', () => {
    let component: StyleGuideSectionComponent;
    let fixture: ComponentFixture<StyleGuideSectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, HeaderSectionComponent, TranslateModule]
        }).compileComponents();

        fixture = TestBed.createComponent(StyleGuideSectionComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
