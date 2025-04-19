/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
module.exports = {
    content: [
        "./src/**/*.{html,ts}"
    ],
    darkMode: 'class',
    prefix: "tw-",
    theme: {
        extend: {
            colors: {
                primaryColor: "var(--primary-color)",
                primaryInverse: "var(--primary-inverse-color)",
                secondaryColor: "var(--secondary-color)",
                tertiaryColor: "var(--tertiary-color)",
                background: {
                    primary: "var(--background-primary-color)",
                    secondary: "var(--background-secondary-color)",
                    tertiary: "var(--background-tertiary-color)",
                },
                text: {
                    primary: "var(--text-primary-color)",
                    primaryInverse: "var(--text-primary-inverse-color)",
                    secondary: "var(--text-secondary-color)",
                    secondaryInverse: "var(--text-secondary-inverse-color)",
                },
                success: "var(--success-color)",
                successInverse: "var(--success-inverse-color)",
                warning: "var(--warning-color)",
                warningInverse: "var(--warning-inverse-color)",
                danger: "var(--danger-color)",
                dangerInverse: "var(--danger-inverse-color)"
            }
        }
    },
    plugins: [],
    safelist: [
      {
        pattern: /(bg|text|border)-(primary|secondary|tertiary|success|warning|danger|background-primary|background-secondary|background-tertiary|text-primary|text-secondary)/,
        variants: ['dark', 'hover', 'focus']
      }
    ]
}

