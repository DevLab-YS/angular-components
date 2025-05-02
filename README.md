# Angular Component Library

Esta es una librería de componentes desarrollada en Angular que permite construir interfaces reutilizables, modernas y altamente configurables. Cada componente está diseñado para integrarse fácilmente en proyectos y puede personalizarse mediante configuración, traducciones y estilos.

---

## Componentes principales

| Componente        | Descripción                              | Documentación                                              |
| ----------------- | ---------------------------------------- | ---------------------------------------------------------- |
| `FormComponent`   | Componente de formularios configurables. | [Ver README](./src/lib/components/form/form-readme.md)     |
| `HeaderComponent` | Componente de cabeceras configurables.   | [Ver README](./src/lib/components/header/header-readme.md) |
| `ListComponent`   | Visualización de listas dinámicas.       | [Ver README](./src/lib/components/list/list-readme.md)     |
| `TableComponent`  | Componente de tablas configurables.      | [Ver README](./src/lib/components/table/table-readme.md)   |
| `TreeComponent`   | Visualización de árboles dinámicos.      | [Ver README](./src/lib/components/tree/tree-readme.md)     |

---

## Componentes auxiliares

| Componente            | Descripción                         | Ubicación                        |
| --------------------- | ----------------------------------- | -------------------------------- |
| `ButtonComponent`     | Botones estandarizados.             | `src/lib/components/button`      |
| `CheckboxComponent`   | Checkboxs.                          | `src/lib/components/checkbox`    |
| `StyleGuideComponent` | Estilos por defecto de la librería. | `src/lib/components/style-guide` |

---

## Uso básico

```ts
import { FormConfig, FormSection, TextFormField } from '@yirmelsanchez/angular-components';

this.formConfig = new FormConfig({
    prefix: 'user.form',
    header: 'Formulario',
    sections: [
        new FormSection({
            key: 'main',
            fields: [[new TextFormField({ key: 'username' })]]
        })
    ],
    submitAction: value => console.log(value)
});
```

---

## Estilos y TailwindCSS

Esta librería utiliza [TailwindCSS](https://tailwindcss.com/) para los estilos. Además, se apoya en variables CSS que deben definirse en tu aplicación principal.

### Variables CSS requeridas

Incluye estas definiciones en tu `styles.scss` o en el archivo global de estilos:

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

### Configuración de `tailwind.config.ts`

A continuación se muestra un [ejemplo](./tailwind.config.js) de configuración Tailwind para configurar los estilos de los componentes asignando las variables anteriores.

---

## Pruebas

Cada componente incluye su archivo de test `.spec.ts`. Se recomienda ejecutar `ng test`.

---

## Recomendaciones

-   Usa `TranslateModule` de `@ngx-translate` para soporte multilenguaje.
-   Configura correctamente las claves `prefix` para traducciones consistentes.
-   Usa claves únicas para secciones y campos (`section.fieldName`).
-   Asegúrate de definir todas las variables CSS necesarias.
-   Los estilos siguen el enfoque utilitario de Tailwind, evita sobrescribir con clases personalizadas.
-   Mantén cada componente desacoplado y reutilizable.

---

## Compilación

Ejecuta `ng build` para construir la librería. Los artefactos del build se almacenarán en el directorio `dist/`.
