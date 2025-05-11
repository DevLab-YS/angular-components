# ListComponent – Configuration and Usage

`ListComponent` is a flexible component for displaying dynamic, highly-configurable lists. It lets you define sections, list items, custom actions and control the visibility of each section.

---

## Basic usage example

```ts
import {
    ListConfig,
    ListSection,
    ListItem,
    ListItemType
} from '@yirmelsanchez/angular-components';

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

Represents the overall list configuration.

### Properties

| Property   | Type            | Required | Description                                 |
| ---------- | --------------- | -------- | ------------------------------------------- |
| `prefix`   | `string`        | ✅        | Translation-key prefix.                     |
| `sections` | `ListSection[]` | ✅        | Array of sections that hold the list items. |

---

## ListSection

Represents a section within the list.

### Properties

| Property    | Type                       | Required | Description                                                           |
| ----------- | -------------------------- | -------- | --------------------------------------------------------------------- |
| `key`       | `string`                   | ✅        | Unique key to identify the section.                                   |
| `showTitle` | `boolean`                  | ❌        | Whether the section should display a title. Defaults to `true`.       |
| `showItems` | `boolean`                  | ❌        | Whether the items in the section should be shown. Defaults to `true`. |
| `items`     | `ListItem[]`               | ✅        | Array of items contained in the section.                              |
| `action`    | `(item: ListItem) => void` | ❌        | Callback executed when an item is interacted with.                    |

---

## ListItem

Represents an item inside a section.

### Properties

| Property  | Type                      | Required | Description                               |
| --------- | ------------------------- | -------- | ----------------------------------------- |
| `title`   | `string`                  | ✅        | Item title.                               |
| `type`    | `ListItemType`            | ✅        | Item type (`Card` or `Text`).             |
| `tooltip` | `string`                  | ❌        | Optional tooltip for the item.            |
| `content` | `Record<string, unknown>` | ❌        | Additional data associated with the item. |

---

## ListItemType

Enum defining the available item types.

| Value  | Description      |
| ------ | ---------------- |
| `Card` | Card-style item. |
| `Text` | Plain-text item. |

---

## Translation key example

When using **ngx-translate** for i18n, `prefix` acts as the base for your keys.

```json
{
  "items": {
    "list": {
      "section1": {
        "label": "Section 1",
        "tooltip": "Section 1"
      }
    }
  }
}
```

---

## Recommendations

* Give every section and item a **unique key** to avoid conflicts.
* Use `clickHeader` (if exposed) to toggle section visibility efficiently.
* Leverage the utility method `getItemClasses` to fine-tune item styles.
