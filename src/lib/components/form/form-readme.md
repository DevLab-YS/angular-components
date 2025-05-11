# FormComponent – Configuration and Usage

`FormComponent` is a dynamic, modular system for building configurable forms. It lets you manage validation, field visibility, change-tracking and custom submit / cancel actions.

---

## Basic usage example

```ts
import {
    FormConfig,
    FormSection,
    TextFormField,
    SelectFormField,
    SelectOption
} from '@yirmelsanchez/angular-components';

this.formConfig = new FormConfig({
    prefix: 'user.form',
    header: 'User form',
    sections: [
        new FormSection({
            key: 'general',
            fields: [
                [
                    new TextFormField({ key: 'name', required: true }),
                    new SelectFormField({
                        key: 'role',
                        required: true,
                        options: [
                            new SelectOption({
                                value: 'admin',
                                visibleFields: ['general.adminCode']
                            }),
                            new SelectOption({
                                value: 'user',
                                visibleFields: []
                            })
                        ]
                    })
                ],
                [new TextFormField({ key: 'adminCode', required: true })]
            ]
        })
    ],
    submitAction: formValue => this.save(formValue)
});
```

---

## FormConfig

Main class that defines the form configuration.

### Properties

| Property       | Type                                           | Required | Description                    |
| -------------- | ---------------------------------------------- | -------- | ------------------------------ |
| `prefix`       | `string`                                       | ✅        | Translation-key prefix.        |
| `header`       | `string`                                       | ✅        | Form headline.                 |
| `height`       | `string`                                       | ❌        | Form height (e.g. `'50vh'`).   |
| `sections`     | `FormSection[]`                                | ✅        | Form sections.                 |
| `cancelAction` | `() => void`                                   | ❌        | Custom logic to run on cancel. |
| `submitAction` | `(formValue: Record<string, unknown>) => void` | ✅        | Logic to run on submit.        |

---

## FormSection

Defines a section inside the form.

### Properties

| Property      | Type            | Required | Description                                         |
| ------------- | --------------- | -------- | --------------------------------------------------- |
| `key`         | `string`        | ✅        | Unique section key.                                 |
| `fields`      | `FormField[][]` | ✅        | Matrix of fields (grouped by rows).                 |
| `showTitle`   | `boolean`       | ❌        | Show or hide the section title. Defaults to `true`. |
| `showTooltip` | `boolean`       | ❌        | Show or hide helper tooltips. Defaults to `true`.   |

---

## FormField

Represents an individual form field.

### Properties

| Property   | Type            | Required | Description                                       |
| ---------- | --------------- | -------- | ------------------------------------------------- |
| `key`      | `string`        | ✅        | Unique field key within the section.              |
| `type`     | `FormFieldType` | ✅        | Field type (`Text`, `Select`).                    |
| `value`    | `FieldValue`    | ✅        | Initial and current value wrapper.                |
| `width`    | `number`        | ❌        | Percentage width of the field. Defaults to `100`. |
| `disabled` | `boolean`       | ❌        | Disabled state. Defaults to `false`.              |
| `hidden`   | `boolean`       | ❌        | Hidden state. Defaults to `false`.                |
| `required` | `boolean`       | ❌        | Required state. Defaults to `false`.              |

---

## TextFormField

Specialised text-input field.

### Constructor

```ts
new TextFormField({ key: 'name', required: true });
```

---

## SelectFormField

Select field with options and conditional field visibility.

### Additional properties

| Property  | Type             | Required | Description                        |
| --------- | ---------------- | -------- | ---------------------------------- |
| `options` | `SelectOption[]` | ✅        | Options available in the dropdown. |

---

## SelectOption

Represents an option for a `Select` field.

### Properties

| Property        | Type       | Required | Description                                                          |
| --------------- | ---------- | -------- | -------------------------------------------------------------------- |
| `value`         | `string`   | ✅        | Value represented by the option.                                     |
| `visibleFields` | `string[]` | ❌        | Keys of fields that become **visible** when this option is selected. |

---

## FormFieldType

Enum listing the available field types.

| Value    | Description            |
| -------- | ---------------------- |
| `Text`   | Text input field.      |
| `Select` | Dropdown select field. |

---

## FieldValue

Wrapper class for a field’s initial and current value.

```ts
new FieldValue(initialValue, currentValue);
```

---

## Useful methods

| Method              | Where available                    | Description                                                    |
| ------------------- | ---------------------------------- | -------------------------------------------------------------- |
| `hasChanges()`      | FormConfig, FormSection, FormField | Returns `true` if current values differ from the initial ones. |
| `resetValues()`     | FormConfig, FormSection            | Resets current values back to the initial state.               |
| `getField(key)`     | FormConfig                         | Retrieves a field by key (`section.fieldKey`).                 |
| `setValues(values)` | FormConfig, FormSection            | Mass-assign values to specific fields.                         |

---

## Recommendations

* Use unique, consistent keys to identify fields (`section.field`).
* Define conditional visibility with `SelectOption.visibleFields`.
* Leverage `FormService` to update buttons, validate the form and toggle visibility dynamically.
