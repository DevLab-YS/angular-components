# TreeComponent – Configuration and Usage

`TreeComponent` is designed to display hierarchical data as a tree. You can define multiple node levels, attach custom content and tooltips, decide whether labels/tooltips should be translated and control the visibility of each node’s children.

---

## Basic usage example

```ts
import { TreeConfig, TreeNode } from './models/tree-config.model';

this.treeConfig = new TreeConfig({
    prefix: 'categories.tree',
    nodes: [
        new TreeNode({
            label: 'Electronics',
            tooltip: 'Electronic-products category',
            children: [
                new TreeNode({ label: 'Phones' }),
                new TreeNode({ label: 'Laptops' })
            ]
        }),
        new TreeNode({
            label: 'clothes',
            tooltip: 'categories.tree.clothes.tooltip',
            translate: true   // label + tooltip will be run through ngx-translate
        })
    ],
    clickNode: node => {
        console.log('Clicked node:', node.label);
    }
});
```

---

## TreeConfig

Represents the overall tree configuration.

| Property    | Type                           | Required | Description                            |
| ----------- | ------------------------------ | -------- | -------------------------------------- |
| `prefix`    | `string`                       | ✅        | Translation-key prefix.                |
| `nodes`     | `TreeNode[]`                   | ✅        | Array of root-level nodes.             |
| `clickNode` | `(treeNode: TreeNode) => void` | ❌        | Callback fired when a node is clicked. |

---

## TreeNode

Represents an individual node.

| Property       | Type         | Required | Description                                                          |
| -------------- | ------------ | -------- | -------------------------------------------------------------------- |
| `label`        | `string`     | ✅        | Text displayed as the node title.                                    |
| `content`      | `unknown`    | ❌        | Extra data associated with the node.                                 |
| `showChildren` | `boolean`    | ❌        | Whether the node’s children are visible (default `false`).           |
| `children`     | `TreeNode[]` | ❌        | Array of child nodes (defaults to an empty array).                   |
| `translate`    | `boolean`    | ❌        | Translate `label` and `tooltip` via ngx-translate (default `false`). |
| `tooltip`      | `string`     | ❌        | Optional tooltip shown on hover.                                     |

---

## Translation-key example

When using **ngx-translate**, build your keys from the `prefix` plus the node labels:

```json
{
  "categories": {
    "tree": {
      "clothes": {
        "label": "Clothes",
        "tooltip": "Clothing category"
      }
    }
  }
}
```

---

## Recommendations

* Use a meaningful `prefix` to keep node translations organised.
* Handle interactive behaviour (selection, navigation, editing) in the `clickNode` callback.
* Nest as many levels as you need—the `children` property supports unlimited depth.
