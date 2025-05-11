# TableComponent – Configuration and Usage

`TableComponent` is a flexible component for displaying dynamic tables. It lets you configure columns and rows, enable row-selection, load custom cells and trigger manual reloads via events.

---

## Basic usage example

```ts
import {
    LinkTableCell,
    TableConfig,
    TableColumn,
    TextTableCell
} from '@yirmelsanchez/angular-components';

this.tableConfig = new TableConfig({
    prefix: 'users.table',
    columns: [
        new TableColumn({ key: 'name',   width: 30 }),
        new TableColumn({ key: 'email',  width: 50 }),
        new TableColumn({ key: 'actions', width: 20 })
    ],
    items: this.users, // array of objects
    loadCells: item => [
        new TextTableCell({ content: item.name }),
        new TextTableCell({ content: item.email }),
        new LinkTableCell({ content: 'Edit', action: () => this.editUser(item) })
    ],
    selectedItemsChange: (items, indexes) => {
        console.log('Selected:', items, indexes);
    },
    $loadTable: new EventEmitter<void>()
});
```

---

## TableConfig

Represents the table configuration.

### Properties

| Property              | Type                        | Required | Description                                              |
| --------------------- | --------------------------- | -------- | -------------------------------------------------------- |
| `prefix`              | `string`                    | ✅        | Translation-key prefix.                                  |
| `height`              | `string`                    | ❌        | Table height (default `'60vh'`).                         |
| `selectable`          | `boolean`                   | ❌        | Enables row selection (default `true`).                  |
| `showTooltip`         | `boolean`                   | ❌        | Shows tooltips in cells when provided (default `false`). |
| `items`               | `Record<string, unknown>[]` | ❌        | List of objects that populate the rows.                  |
| `columns`             | `TableColumn[]`             | ✅        | Column definitions.                                      |
| `loadCells`           | `(item) => TableCell[]`     | ✅        | Maps each item to an array of cells (`TableCell[]`).     |
| `selectedItemsChange` | `(items, indexes) => void`  | ❌        | Callback fired whenever the row selection changes.       |
| `$loadTable`          | `EventEmitter<void>`        | ✅        | Event used to reload the table from the outside.         |

---

## TableColumn

Defines a table column.

### Properties

| Property | Type     | Required | Description                            |
| -------- | -------- | -------- | -------------------------------------- |
| `key`    | `string` | ✅        | Unique key that identifies the column. |
| `width`  | `number` | ❌        | Column width (percentage or pixels).   |

---

## TableRow

Represents a table row.

### Properties

| Property   | Type                      | Required | Description                                    |
| ---------- | ------------------------- | -------- | ---------------------------------------------- |
| `cells`    | `TableCell[]`             | ✅        | Array of cells contained in the row.           |
| `selected` | `boolean`                 | ❌        | Whether the row is selected (default `false`). |
| `content`  | `Record<string, unknown>` | ✅        | Original data object associated with the row.  |

---

## TableCell

Base class describing a cell’s content.

### Properties

| Property    | Type       | Required | Description                                                 |
| ----------- | ---------- | -------- | ----------------------------------------------------------- |
| `content`   | `unknown`  | ✅        | Cell content.                                               |
| `tooltip`   | `string`   | ❌        | Optional tooltip for the cell.                              |
| `type`      | `CellType` | ✅        | Cell type (`text` or `link`).                               |
| `translate` | `boolean`  | ❌        | Whether the content should be translated (default `false`). |

---

## CellType

Enum describing cell types.

| Value  | Description                       |
| ------ | --------------------------------- |
| `text` | Plain-text cell.                  |
| `link` | Cell containing a link or action. |

---

## Cell classes

* **TextTableCell**
  Plain text cell.

  ```ts
  constructor({ tooltip?, content, translate = false })
  ```

* **LinkTableCell**
  Cell that renders a link and triggers an action on click.

  ```ts
  constructor({ tooltip?, content, action, translate = false })
  ```

---

## Manually reloading the table

Emit the `$loadTable` event to reload the data from outside the component:

```ts
this.tableConfig.$loadTable.emit();
```

This re-executes `loadCells` over the current `items`.

---

## Internationalisation

Use **ngx-translate** to translate headers and cell tooltips. Keys are based on `prefix`.

```json
{
  "users": {
    "table": {
      "name":    { "label": "Name" },
      "email":   { "label": "Email" },
      "actions": { "label": "Actions" }
    }
  }
}
```

---

## Recommendations

* Ensure every column has a **unique `key`** to avoid conflicts.
* Use `selectedItemsChange` to reactively handle selected rows.
* Call `$loadTable.emit()` whenever you need to refresh the data without recreating the table.
