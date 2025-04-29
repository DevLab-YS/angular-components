import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { TreeConfig, TreeNode } from '../../../tree/models/tree-config.model';
import { TreeComponent } from '../../../tree/tree.component';

@Component({
    selector: 'ys-tree-section',
    standalone: true,
    imports: [CommonModule, TranslateModule, TreeComponent],
    templateUrl: './tree-section.component.html'
})
export class TreeSectionComponent {
    config = new TreeConfig({
        prefix: 'angular-components.style-guide.section.tree.tree',
        nodes: [
            new TreeNode({
                label: 'Node 1'
            }),
            new TreeNode({
                label: 'Node 2',
                children: [
                    new TreeNode({
                        label: 'Child node 1'
                    }),
                    new TreeNode({
                        label: 'Child node 2'
                    })
                ]
            }),
            new TreeNode({
                label: 'Node 3'
            })
        ]
    });
}
