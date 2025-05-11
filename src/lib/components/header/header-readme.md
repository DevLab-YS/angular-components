# HeaderComponent – Configuration and Usage

`HeaderComponent` is a flexible, highly-configurable component that lets you define left- and right-aligned actions, show icons, labels and tooltips—everything driven by a `HeaderConfig` instance.

---

## Basic usage example

```ts
import {
    HeaderConfig,
    HeaderAction,
    HeaderActionType
} from '@yirmelsanchez/angular-components';

this.headerConfig = new HeaderConfig({
    prefix: 'dashboard.header',
    leftActions: [
        new HeaderAction({
            key: 'back',
            icon: faArrowLeft,
            type: HeaderActionType.SecondaryButton,
            action: () => this.goBack()
        })
    ],
    rightActions: [
        new HeaderAction({
            key: 'save',
            icon: faSave,
            type: HeaderActionType.PrimaryButton,
            action: () => this.saveData(),
            showTooltip: true
        })
    ]
});
```

---

## HeaderConfig

Represents the header’s overall configuration.

### Properties

| Property       | Type             | Description                                    |
| -------------- | ---------------- | ---------------------------------------------- |
| `prefix`       | `string`         | Translation-key prefix.                        |
| `leftActions`  | `HeaderAction[]` | List of actions aligned to the **left** side.  |
| `rightActions` | `HeaderAction[]` | List of actions aligned to the **right** side. |

---

## HeaderAction

Defines a single header action.

### Properties

| Property      | Type               | Required | Description                                                   |
| ------------- | ------------------ | -------- | ------------------------------------------------------------- |
| `key`         | `string`           | ✅        | Identifier / translation key (combined with `prefix`).        |
| `type`        | `HeaderActionType` | ❌        | Action style: primary button, secondary button or plain text. |
| `icon`        | `IconDefinition`   | ❌        | Optional FontAwesome icon.                                    |
| `action`      | `() => void`       | ✅        | Callback executed when the action is triggered.               |
| `showLabel`   | `boolean`          | ❌        | Whether to display the action’s text. Default is `true`.      |
| `showTooltip` | `boolean`          | ❌        | Whether to show a tooltip on hover. Default is `true`.        |

---

## HeaderActionType

| Value             | Description            |
| ----------------- | ---------------------- |
| `PrimaryButton`   | Primary button style   |
| `SecondaryButton` | Secondary button style |
| `Text`            | Plain-text action      |

---

## Internationalisation

The component relies on **ngx-translate**. Keys follow this pattern:

```
<prefix>.<key>.label
<prefix>.<key>.tooltip
```

Example:

```json
{
  "dashboard": {
    "header": {
      "back": {
        "label": "Back",
        "tooltip": "Go to the previous screen"
      },
      "save": {
        "label": "Save",
        "tooltip": "Save changes"
      }
    }
  }
}
```

---

## Recommendations

* Each action must have a unique key within the header.
* Set `showLabel` to `false` if you want to display only the icon.
* Use `prefix` to keep translation keys organised by module or feature.
