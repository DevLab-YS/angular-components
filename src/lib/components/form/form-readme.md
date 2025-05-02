# FormComponent – Configuración y uso

El `FormComponent` es un sistema dinámico y modular para construir formularios configurables. Permite gestionar validaciones, visibilidad de campos, estados de cambio y acciones personalizadas de envío o cancelación.

---

## Ejemplo de uso básico

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
    header: 'Formulario de usuario',
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

Clase principal de configuración del formulario.

### Propiedades

| Propiedad      | Tipo                                           | Requerido | Descripción                             |
| -------------- | ---------------------------------------------- | --------- | --------------------------------------- |
| `prefix`       | `string`                                       | ✅        | Prefijo de claves de traducción.        |
| `header`       | `string`                                       | ✅        | Título principal del formulario.        |
| `height`       | `string`                                       | ❌        | Altura del formulario (e.g., `'50vh'`). |
| `sections`     | `FormSection[]`                                | ✅        | Secciones del formulario.               |
| `cancelAction` | `() => void`                                   | ❌        | Acción personalizada al cancelar.       |
| `submitAction` | `(formValue: Record<string, unknown>) => void` | ✅        | Acción al enviar el formulario.         |

---

## FormSection

Define una sección dentro del formulario.

### Propiedades

| Propiedad     | Tipo            | Requerido | Descripción                                                   |
| ------------- | --------------- | --------- | ------------------------------------------------------------- |
| `key`         | `string`        | ✅        | Clave única de la sección.                                    |
| `fields`      | `FormField[][]` | ✅        | Matriz de campos (agrupados por filas).                       |
| `showTitle`   | `boolean`       | ❌        | Muestra u oculta el título de la sección. Por defecto `true`. |
| `showTooltip` | `boolean`       | ❌        | Muestra u oculta los tooltips de ayuda. Por defecto `true`.   |

---

## FormField

Representa un campo de formulario.

### Propiedades

| Propiedad  | Tipo            | Requerido | Descripción                                    |
| ---------- | --------------- | --------- | ---------------------------------------------- |
| `key`      | `string`        | ✅        | Clave única del campo dentro de la sección.    |
| `type`     | `FormFieldType` | ✅        | Tipo del campo (`Text`, `Select`).             |
| `value`    | `FieldValue`    | ✅        | Valor inicial y actual del campo.              |
| `width`    | `number`        | ❌        | Ancho porcentual del campo. Por defecto `100`. |
| `disabled` | `boolean`       | ❌        | Campo deshabilitado. Por defecto `false`.      |
| `hidden`   | `boolean`       | ❌        | Campo oculto. Por defecto `false`.             |
| `required` | `boolean`       | ❌        | Campo obligatorio. Por defecto `false`.        |

---

## TextFormField

Campo especializado para entrada de texto.

### Constructor

```ts
new TextFormField({ key: 'name', required: true });
```

---

## SelectFormField

Campo de selección con opciones y visibilidad condicional de otros campos.

### Propiedades adicionales

| Propiedad | Tipo             | Requerido | Descripción                          |
| --------- | ---------------- | --------- | ------------------------------------ |
| `options` | `SelectOption[]` | ✅        | Opciones disponibles en el selector. |

---

## SelectOption

Representa una opción de un campo tipo `Select`.

### Propiedades

| Propiedad       | Tipo       | Requerido | Descripción                                                     |
| --------------- | ---------- | --------- | --------------------------------------------------------------- |
| `value`         | `string`   | ✅        | Valor que representa la opción.                                 |
| `visibleFields` | `string[]` | ❌        | Lista de claves de campos que deben mostrarse si se selecciona. |

---

## FormFieldType

Enum que define los tipos de campos disponibles.

| Valor    | Descripción                     |
| -------- | ------------------------------- |
| `Text`   | Campo de texto.                 |
| `Select` | Campo de selección desplegable. |

---

## FieldValue

Encapsula el valor inicial y actual de un campo.

```ts
new FieldValue(initialValue, currentValue);
```

---

## Métodos útiles

| Método              | Ubicación                          | Descripción                                                 |
| ------------------- | ---------------------------------- | ----------------------------------------------------------- |
| `hasChanges()`      | FormConfig, FormSection, FormField | Verifica si hay cambios en los valores respecto al inicial. |
| `resetValues()`     | FormConfig, FormSection            | Reinicia los valores actuales a su estado inicial.          |
| `getField(key)`     | FormConfig                         | Retorna un campo por su clave (`seccion.keyCampo`).         |
| `setValues(values)` | FormConfig, FormSection            | Establece valores masivamente para campos específicos.      |

---

## Recomendaciones

-   Usa claves únicas y consistentes para identificar campos (`section.field`).
-   Configura las visibilidades condicionales usando `SelectOption.visibleFields`.
-   Aprovecha el servicio `FormService` para actualizar botones, validar, y manipular visibilidad.
