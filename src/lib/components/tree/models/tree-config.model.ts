export class TreeConfig {
    prefix: string;
    nodes: TreeNode[];
    clickNode: (treeNode: TreeNode) => void;

    constructor({ prefix, nodes, clickNode = () => {} }: TreeConfigParameters) {
        this.prefix = prefix;
        this.nodes = nodes;
        this.clickNode = clickNode;
    }
}

export interface TreeConfigParameters {
    prefix: string;
    nodes: TreeNode[];
    clickNode?: (treeNode: TreeNode) => void;
}

export class TreeNode {
    label: string;
    content?: unknown;
    showChildren: boolean;
    children: TreeNode[];
    translate: boolean;
    tooltip: string;

    constructor({
        label,
        content,
        showChildren = false,
        translate = false,
        tooltip = '',
        children = []
    }: TreeNodeParameters) {
        this.label = label;
        this.content = content;
        this.showChildren = showChildren;
        this.translate = translate;
        this.tooltip = tooltip;
        this.children = children;
    }
}

export interface TreeNodeParameters {
    label: string;
    content?: unknown;
    showChildren?: boolean;
    translate?: boolean;
    tooltip?: string;
    children?: TreeNode[];
}
