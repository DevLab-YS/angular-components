import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TreeConfig } from './models/tree-config.model';
import { TreeNodeComponent } from './components/node/tree-node.component';

@Component({
    selector: 'ys-tree',
    standalone: true,
    imports: [CommonModule, TreeNodeComponent],
    templateUrl: './tree.component.html'
})
export class TreeComponent {
    @Input() config?: TreeConfig;

    level = 0;
}
