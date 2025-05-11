# Angular Component Library

This library provides reusable, modern and highly-configurable UI components built with Angular. Each component is designed for easy integration and can be customised through configuration objects, i18n keys and styling.

---

## Core components

| Component         | Description                      | Documentation                                              |
| ----------------- | -------------------------------- | ---------------------------------------------------------- |
| `FormComponent`   | Configurable form builder.       | [See README](./src/lib/components/form/form-readme.md)     |
| `HeaderComponent` | Customisable page headers.       | [See README](./src/lib/components/header/header-readme.md) |
| `ListComponent`   | Dynamic list viewer.             | [See README](./src/lib/components/list/list-readme.md)     |
| `TableComponent`  | Configurable data tables.        | [See README](./src/lib/components/table/table-readme.md)   |
| `TreeComponent`   | Dynamic tree / hierarchy viewer. | [See README](./src/lib/components/tree/tree-readme.md)     |

---

## Helper components

| Component             | Description                      | Location                         |
| --------------------- | -------------------------------- | -------------------------------- |
| `ButtonComponent`     | Standardised buttons.            | `src/lib/components/button`      |
| `CheckboxComponent`   | Checkbox inputs.                 | `src/lib/components/checkbox`    |
| `StyleGuideComponent` | Library default styles showcase. | `src/lib/components/style-guide` |

---

## Basic usage

```ts
import {
  FormConfig,
  FormSection,
  TextFormField
} from '@yirmelsanchez/angular-components';

this.formConfig = new FormConfig({
  prefix: 'user.form',
  header: 'Form',
  sections: [
    new FormSection({
      key: 'main',
      fields: [[ new TextFormField({ key: 'username' }) ]]
    })
  ],
  submitAction: value => console.log(value)
});
```

---

## Styling with TailwindCSS

The library uses [TailwindCSS](https://tailwindcss.com/) and relies on a set of **CSS variables** that must be defined in your application.

### Required CSS variables

Add these definitions to `styles.scss` (or your global style file):

```css
:root {
  --primary-color: #045256;
  --primary-inverse-color: #0f7e82;
  --secondary-color: #ddf7f8;
  --tertiary-color: #9ab8ba;

  --background-primary-color: #ffffff;
  --background-secondary-color: #f0f0f0;
  --background-tertiary-color: #d3d3d3;

  --text-primary-color: #212121;
  --text-secondary-color: #757575;
  --text-primary-inverse-color: #ffffff;
  --text-secondary-inverse-color: #bdbdbd;

  --warning-color: #f2994a;
  --warning-inverse-color: #ffcc9b;
  --danger-color: #e74c3c;
  --danger-inverse-color: #ffb3ae;
}

:root.dark-theme {
  --primary-color: #0f7e82;
  --primary-inverse-color: #045256;
  --secondary-color: #102f30;
  --tertiary-color: #3c5052;

  --background-primary-color: #121212;
  --background-secondary-color: #282828;
  --background-tertiary-color: #575757;

  --text-primary-color: #ffffff;
  --text-secondary-color: #bdbdbd;
  --text-primary-inverse-color: #212121;
  --text-secondary-inverse-color: #757575;

  --warning-color: #ffcc9b;
  --warning-inverse-color: #f2994a;
  --danger-color: #ffb3ae;
  --danger-inverse-color: #e74c3c;
}
```

### `tailwind.config.ts`

See the [example configuration](./tailwind.config.js) for how to map the variables above to Tailwind utility classes.

---

## Testing

Each component ships with a corresponding `.spec.ts` file. Run

```bash
ng test
```

to execute unit tests.

---

## Recommendations

* Use `TranslateModule` from **@ngx-translate** for multi-language support.
* Set the `prefix` key correctly to keep translation keys consistent.
* Choose unique keys for sections and fields (`section.fieldName`).
* Make sure **all** required CSS variables are defined.
* Follow Tailwind’s utility-first approach—avoid excessive custom CSS overrides.
* Keep each component decoupled and reusable.

---

## Building

Run

```bash
ng build
```

to build the library. Build artefacts are output to the `dist/` directory.
