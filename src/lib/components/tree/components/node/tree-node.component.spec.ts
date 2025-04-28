import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TreeNodeComponent } from './tree-node.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TreeConfig, TreeNode } from '../../models/tree-config.model';

describe('TreeNodeComponent', () => {
    let component: TreeNodeComponent;
    let fixture: ComponentFixture<TreeNodeComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [CommonModule, FontAwesomeModule, TranslateModule.forRoot(), NgbTooltipModule]
        }).compileComponents();

        fixture = TestBed.createComponent(TreeNodeComponent);
        component = fixture.componentInstance;
    });

    it('should create the component', () => {
        expect(component).toBeTruthy();
    });

    it('should call config.clickNode', () => {
        const node = new TreeNode({ label: 'test' }),
            config = new TreeConfig({
                prefix: 'tree',
                nodes: [node],
                clickNode: jasmine.createSpy()
            });
        component.node = node;
        component.config = config;

        component.clickNode();

        expect(config.clickNode).toHaveBeenCalledWith(node);
    });

    it('getOffsetArray, should return an array with level length', () => {
        const level = 3;
        component.level = level;

        const result = component.getOffsetArray();

        expect(result.length).toBe(level);
    });
});
