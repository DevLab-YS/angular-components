# TableComponent – Configuración y uso

El `TableComponent` es un componente flexible para mostrar tablas dinámicas. Permite configurar columnas, filas, selección de elementos, carga de celdas personalizadas y recarga mediante eventos.

---

## Ejemplo de uso básico

```ts
import { LinkTableCell, TableConfig, TableColumn, TextTableCell } from '@yirmelsanchez/angular-components';

this.tableConfig = new TableConfig({
    prefix: 'users.table',
    columns: [
        new TableColumn({ key: 'name', width: 30 }),
        new TableColumn({ key: 'email', width: 50 }),
        new TableColumn({ key: 'actions', width: 20 })
    ],
    items: this.users, // array de objetos
    loadCells: item => [
        new TextTableCell({ content: item.name }),
        new TextTableCell({ content: item.email }),
        new LinkTableCell({ content: 'Edit', action: () => this.editUser(item) })
    ],
    selectedItemsChange: (items, indexes) => {
        console.log('Seleccionados:', items, indexes);
    },
    $loadTable: new EventEmitter<void>()
});
```

---

## TableConfig

Clase que representa la configuración de la tabla.

### Propiedades

| Propiedad             | Tipo                        | Requerido | Descripción                                                       |
| --------------------- | --------------------------- | --------- | ----------------------------------------------------------------- |
| `prefix`              | `string`                    | ✅        | Prefijo para las claves de traducción.                            |
| `height`              | `string`                    | ❌        | Altura de la tabla (por defecto `'60vh'`).                        |
| `selectable`          | `boolean`                   | ❌        | Permite seleccionar filas (por defecto `true`).                   |
| `showTooltip`         | `boolean`                   | ❌        | Muestra tooltips en celdas si aplica (por defecto `false`).       |
| `items`               | `Record<string, unknown>[]` | ❌        | Lista de objetos que representan los datos de las filas.          |
| `columns`             | `TableColumn[]`             | ✅        | Configuración de las columnas de la tabla.                        |
| `loadCells`           | `(item) => TableCell[]`     | ✅        | Función que mapea cada item a un array de celdas (`TableCell[]`). |
| `selectedItemsChange` | `(items, indexes) => void`  | ❌        | Callback que se dispara cuando cambia la selección de filas.      |
| `$loadTable`          | `EventEmitter<void>`        | ✅        | Evento para recargar la tabla desde el exterior.                  |

---

## TableColumn

Define una columna de la tabla.

### Propiedades

| Propiedad | Tipo     | Requerido | Descripción                                 |
| --------- | -------- | --------- | ------------------------------------------- |
| `key`     | `string` | ✅        | Clave única para identificar la columna.    |
| `width`   | `number` | ❌        | Ancho de la columna (porcentaje o píxeles). |

---

## TableRow

Representa una fila de la tabla.

### Propiedades

| Propiedad  | Tipo                      | Requerido | Descripción                                                |
| ---------- | ------------------------- | --------- | ---------------------------------------------------------- |
| `cells`    | `TableCell[]`             | ✅        | Array de celdas que contiene la fila.                      |
| `selected` | `boolean`                 | ❌        | Indica si la fila está seleccionada (por defecto `false`). |
| `content`  | `Record<string, unknown>` | ✅        | Datos originales asociados a la fila.                      |

---

## TableCell

Clase base para representar el contenido de una celda.

### Propiedades

| Propiedad   | Tipo       | Requerido | Descripción                                                      |
| ----------- | ---------- | --------- | ---------------------------------------------------------------- |
| `content`   | `unknown`  | ✅        | Contenido de la celda.                                           |
| `tooltip`   | `string`   | ❌        | Tooltip opcional para la celda.                                  |
| `type`      | `CellType` | ✅        | Tipo de celda (`text` o `link`).                                 |
| `translate` | `boolean`  | ❌        | Indica si el contenido debe ser traducido (por defecto `false`). |

---

## CellType

Enum que define el tipo de celda.

| Valor  | Descripción                   |
| ------ | ----------------------------- |
| `text` | Celda de texto plano.         |
| `link` | Celda con un enlace o acción. |

---

## Tipos de celdas

-   **TextTableCell**:  
    Representa una celda de solo texto.

    ```ts
    constructor({ tooltip?, content, translate = false })
    ```

-   **LinkTableCell**:  
    Representa una celda con un enlace que dispara una acción al hacer clic.

    ```ts
    constructor({ tooltip?, content, action, translate = false })
    ```

---

## Recarga manual de la tabla

Para recargar los datos de la tabla desde el exterior, se emite el evento `$loadTable`:

```ts
this.tableConfig.$loadTable.emit();
```

Esto volverá a ejecutar `loadCells` sobre los `items` actuales.

---

## Internacionalización

La tabla puede utilizar `ngx-translate` para traducir los encabezados y tooltips de las celdas, usando el `prefix` como base de las claves de traducción.

Ejemplo de claves:

```json
{
    "users": {
        "table": {
            "name": {
                "label": "Nombre"
            },
            "email": {
                "label": "Correo Electrónico"
            },
            "actions": {
                "label": "Acciones"
            }
        }
    }
}
```

---

## Recomendaciones

-   Define claves únicas en las columnas (`key`) para evitar conflictos.
-   Usa `selectedItemsChange` para manejar los elementos seleccionados de forma reactiva.
-   Aprovecha `$loadTable.emit()` cuando quieras refrescar los datos sin necesidad de recrear la tabla.
