import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TreeSectionComponent } from './tree-section.component';
import { TreeComponent } from '../../../tree/tree.component';

describe('TreeSectionComponent', () => {
    let component: TreeSectionComponent;
    let fixture: ComponentFixture<TreeSectionComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, TreeComponent, TranslateModule]
        }).compileComponents();

        fixture = TestBed.createComponent(TreeSectionComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });
});
