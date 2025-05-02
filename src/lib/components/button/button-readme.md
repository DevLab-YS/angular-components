# ButtonComponent – Configuración y uso

El `ButtonComponent` es un componente reutilizable para acciones con distintos estilos visuales. Su configuración se basa en una instancia de la clase `Button`, que permite definir el comportamiento, estado, estilo y accesibilidad del botón.

---

## Ejemplo de uso básico

```ts
import { Button, ButtonType } from './models/button.model';

this.myButton = new Button({
    label: 'button.save.label',
    tooltip: 'button.save.tooltip',
    type: ButtonType.Primary,
    disabled: false,
    action: () => this.saveData()
});
```

---

## Button

Clase que representa la configuración de un botón.

### Propiedades

| Propiedad  | Tipo         | Requerido | Descripción                                                  |
| ---------- | ------------ | --------- | ------------------------------------------------------------ |
| `label`    | `string`     | ✅        | Clave de traducción del texto que se mostrará en el botón.   |
| `tooltip`  | `string`     | ❌        | Texto de ayuda que se muestra al pasar el cursor (tooltip).  |
| `type`     | `ButtonType` | ❌        | Estilo del botón (por defecto `Primary`).                    |
| `disabled` | `boolean`    | ❌        | Define si el botón está deshabilitado (por defecto `false`). |
| `action`   | `() => void` | ✅        | Función que se ejecuta al hacer clic en el botón.            |

---

## ButtonType

Enum que define el estilo visual del botón.

| Valor       | Descripción                 |
| ----------- | --------------------------- |
| `Primary`   | Botón destacado principal.  |
| `Secondary` | Botón de menor jerarquía.   |
| `Tertiary`  | Botón de estilo más neutro. |

---

## Internacionalización

El componente utiliza `ngx-translate` para mostrar el texto (`label`) y el tooltip (`tooltip`) del botón. Las claves pueden generarse con un `prefix`, si se integra dentro de una configuración más amplia.

Ejemplo de claves de traducción:

```json
{
    "button": {
        "save": {
            "label": "Guardar",
            "tooltip": "Guarda los cambios realizados"
        }
    }
}
```

---

## Recomendaciones

-   Usa claves de traducción significativas y consistentes con el `prefix` del módulo o vista.
-   Elige el `ButtonType` adecuado según la importancia de la acción.
-   Asegúrate de deshabilitar los botones si la acción no debe estar disponible temporalmente.
-   Centraliza la lógica de `action` para mantener la claridad y la mantenibilidad del componente.
