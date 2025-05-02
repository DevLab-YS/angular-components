# ListComponent – Configuración y uso

El `ListComponent` es un componente flexible para mostrar listas dinámicas y configurables. Permite configurar secciones, elementos de lista, acciones personalizadas y la visibilidad de las secciones.

---

## Ejemplo de uso básico

```ts
import { ListConfig, ListSection, ListItem, ListItemType } from '@yirmelsanchez/angular-components';

this.listConfig = new ListConfig({
    prefix: 'items.list',
    sections: [
        new ListSection({
            key: 'section1',
            items: [
                new ListItem({ title: 'Item 1', type: ListItemType.Card, tooltip: 'Tooltip 1' }),
                new ListItem({ title: 'Item 2', type: ListItemType.Text, tooltip: 'Tooltip 2' })
            ]
        })
    ]
});
```

---

## ListConfig

Clase que representa la configuración de la lista.

### Propiedades

| Propiedad  | Tipo            | Requerido | Descripción                                                |
| ---------- | --------------- | --------- | ---------------------------------------------------------- |
| `prefix`   | `string`        | ✅        | Prefijo para las claves de traducción.                     |
| `sections` | `ListSection[]` | ✅        | Array de secciones que contiene los elementos de la lista. |

---

## ListSection

Representa una sección dentro de la lista.

### Propiedades

| Propiedad   | Tipo                       | Requerido | Descripción                                                                  |
| ----------- | -------------------------- | --------- | ---------------------------------------------------------------------------- |
| `key`       | `string`                   | ✅        | Clave única para identificar la sección.                                     |
| `showTitle` | `boolean`                  | ❌        | Indica si la sección tiene un título (por defecto `true`).                   |
| `showItems` | `boolean`                  | ❌        | Indica si los elementos de la sección se deben mostrar (por defecto `true`). |
| `items`     | `ListItem[]`               | ✅        | Array de elementos dentro de la sección.                                     |
| `action`    | `(item: ListItem) => void` | ❌        | Acción que se ejecuta cuando se interactúa con un elemento.                  |

---

## ListItem

Representa un elemento dentro de una sección.

### Propiedades

| Propiedad | Tipo                      | Requerido | Descripción                              |
| --------- | ------------------------- | --------- | ---------------------------------------- |
| `title`   | `string`                  | ✅        | Título del elemento.                     |
| `type`    | `ListItemType`            | ✅        | Tipo de elemento (`Card` o `Text`).      |
| `tooltip` | `string`                  | ❌        | Tooltip opcional para el elemento.       |
| `content` | `Record<string, unknown>` | ❌        | Datos adicionales asociados al elemento. |

---

## ListItemType

Enum que define los tipos de elementos de la lista.

| Valor  | Descripción              |
| ------ | ------------------------ |
| `Card` | Elemento de tipo "card". |
| `Text` | Elemento de tipo "text". |

---

## Ejemplo de claves de traducción

Si se usa `ngx-translate` para la internacionalización, puedes usar el `prefix` como base para las claves de traducción.

Ejemplo de claves:

```json
{
    "items": {
        "list": {
            "section1": {
                "label": "Sección 1",
                "tooltip": "Sección 1"
            }
        }
    }
}
```

---

## Recomendaciones

-   Define claves únicas en las secciones y elementos para evitar conflictos.
-   Usa `clickHeader` para gestionar la visibilidad de las secciones de manera eficiente.
-   Aprovecha la flexibilidad de las clases en `getItemClasses` para personalizar los estilos de los elementos de la lista.
