import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { StyleGuideComponent } from './style-guide.component';
import { StyleGuideSectionComponent } from './components/style-guide-section/style-guide-section.component';
import { TranslateModule } from '@ngx-translate/core';

describe('StyleGuideComponent', () => {
    let component: StyleGuideComponent;
    let fixture: ComponentFixture<StyleGuideComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, StyleGuideSectionComponent, TranslateModule.forRoot()]
        }).compileComponents();

        fixture = TestBed.createComponent(StyleGuideComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
