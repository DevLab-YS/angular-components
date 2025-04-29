# TreeComponent – Configuración y uso

El `TreeComponent` es un componente diseñado para representar estructuras jerárquicas de nodos, similar a un árbol. Permite configurar múltiples niveles de nodos, definir contenido asociado a cada uno, tooltips y controlar si se deben traducir o mostrar los hijos de cada nodo.

---

## Ejemplo de uso básico

```ts
import { TreeConfig, TreeNode } from './models/tree-config.model';

this.treeConfig = new TreeConfig({
    prefix: 'categories.tree',
    nodes: [
        new TreeNode({
            label: 'Electrónica',
            tooltip: 'Categoría de productos electrónicos',
            children: [new TreeNode({ label: 'Teléfonos' }), new TreeNode({ label: 'Portátiles' })]
        }),
        new TreeNode({ label: 'clothes', tooltip: 'categories.tree.clothes.tooltip', translate: true })
    ],
    clickNode: node => {
        console.log('Nodo clicado:', node.label);
    }
});
```

---

## TreeConfig

Clase que representa la configuración del árbol.

### Propiedades

| Propiedad   | Tipo                           | Requerido | Descripción                                      |
| ----------- | ------------------------------ | --------- | ------------------------------------------------ |
| `prefix`    | `string`                       | ✅        | Prefijo para las claves de traducción.           |
| `nodes`     | `TreeNode[]`                   | ✅        | Array de nodos raíz del árbol.                   |
| `clickNode` | `(treeNode: TreeNode) => void` | ❌        | Función que se ejecuta al hacer clic en un nodo. |

---

## TreeNode

Representa un nodo individual del árbol.

### Propiedades

| Propiedad      | Tipo         | Requerido | Descripción                                                                |
| -------------- | ------------ | --------- | -------------------------------------------------------------------------- |
| `label`        | `string`     | ✅        | Texto que se muestra como título del nodo.                                 |
| `content`      | `unknown`    | ❌        | Contenido adicional asociado al nodo.                                      |
| `showChildren` | `boolean`    | ❌        | Indica si los hijos del nodo deben mostrarse (por defecto `false`).        |
| `children`     | `TreeNode[]` | ❌        | Lista de nodos hijos (por defecto lista vacía).                            |
| `translate`    | `boolean`    | ❌        | Indica si la etiqueta y tooltip debe ser traducidos (por defecto `false`). |
| `tooltip`      | `string`     | ❌        | Tooltip opcional que se muestra al pasar el cursor sobre el nodo.          |

---

## Ejemplo de claves de traducción

Si se usa `ngx-translate`, puedes usar el `prefix` para definir las claves de traducción de los nodos:

```json
{
    "categories": {
        "tree": {
            "clothes": {
                "label": "Ropa",
                "tooltip": "Categoría ropa"
            }
        }
    }
}
```

---

## Recomendaciones

-   Usa el `prefix` para mantener organizada la internacionalización de los nodos.
-   Utiliza `clickNode` para manejar eventos interactivos como selección, navegación o edición.
-   Puedes anidar nodos hasta el nivel de profundidad que necesites, gracias a la propiedad `children`.
