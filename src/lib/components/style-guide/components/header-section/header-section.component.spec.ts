import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { HeaderSectionComponent } from './header-section.component';
import { HeaderComponent } from '../../../header/header.component';

describe('HeaderSectionComponent', () => {
    let component: HeaderSectionComponent;
    let fixture: ComponentFixture<HeaderSectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, HeaderComponent, TranslateModule]
        }).compileComponents();

        fixture = TestBed.createComponent(HeaderSectionComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
