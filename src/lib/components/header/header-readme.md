# HeaderComponent – Configuración y uso

El `HeaderComponent` es un componente flexible y configurable que permite definir acciones a izquierda y derecha, mostrar iconos, etiquetas y tooltips, todo a través de una instancia de la clase `HeaderConfig`.

---

## Ejemplo de uso básico

```ts
import { HeaderConfig, HeaderAction, HeaderActionType } from '@ys/angular-components';

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

Clase que representa la configuración del encabezado.

### Propiedades

| Propiedad      | Tipo             | Descripción                                 |
| -------------- | ---------------- | ------------------------------------------- |
| `prefix`       | `string`         | Prefijo para las claves de traducción.      |
| `leftActions`  | `HeaderAction[]` | Lista de acciones alineadas a la izquierda. |
| `rightActions` | `HeaderAction[]` | Lista de acciones alineadas a la derecha.   |

---

## HeaderAction

Define una acción en el encabezado.

### Propiedades

| Propiedad     | Tipo               | Requerido | Descripción                                                    |
| ------------- | ------------------ | --------- | -------------------------------------------------------------- |
| `key`         | `string`           | ✅        | Clave de identificación y traducción (usada con `prefix`).     |
| `type`        | `HeaderActionType` | ❌        | Tipo de acción: botón primario, secundario o texto.            |
| `icon`        | `IconDefinition`   | ❌        | Icono de FontAwesome opcional.                                 |
| `action`      | `() => void`       | ✅        | Función a ejecutar cuando se activa la acción.                 |
| `showLabel`   | `boolean`          | ❌        | Muestra o no el texto de la acción (por defecto: `true`).      |
| `showTooltip` | `boolean`          | ❌        | Muestra o no tooltip al pasar el cursor (por defecto: `true`). |

---

## HeaderActionType

| Valor             | Descripción                      |
| ----------------- | -------------------------------- |
| `PrimaryButton`   | Estilo de botón principal        |
| `SecondaryButton` | Estilo de botón secundario       |
| `Text`            | Acción con estilo de texto plano |

---

## Internacionalización

El componente usa `ngx-translate` para mostrar etiquetas y tooltips. Las claves se generan con el formato:

```
<prefix>.<key>.label
<prefix>.<key>.tooltip
```

Ejemplo:

```json
{
    "dashboard": {
        "header": {
            "back": {
                "label": "Volver",
                "tooltip": "Ir a la pantalla anterior"
            },
            "save": {
                "label": "Guardar",
                "tooltip": "Guardar los cambios"
            }
        }
    }
}
```

---

## Recomendaciones

-   Las acciones deben tener claves únicas dentro del header.
-   Usá `showLabel` en `false` si solo querés mostrar el icono.
-   El `prefix` permite organizar mejor las traducciones por módulo o sección.
