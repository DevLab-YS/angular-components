import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TreeConfig, TreeNode } from '../../models/tree-config.model';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faAngleDown, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { TranslateModule } from '@ngx-translate/core';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'ys-tree-node',
    standalone: true,
    imports: [CommonModule, FontAwesomeModule, TranslateModule, NgbTooltipModule],
    templateUrl: './tree-node.component.html'
})
export class TreeNodeComponent {
    @Input() config?: TreeConfig;
    @Input() node?: TreeNode;
    @Input() level = 0;

    closeIcon = faAngleRight;
    openIcon = faAngleDown;

    clickNode() {
        this.node!.showChildren = !this.node!.showChildren;
        this.config?.clickNode(this.node!);
    }

    getOffsetArray(): number[] {
        return Array(this.level).fill(0);
    }
}
