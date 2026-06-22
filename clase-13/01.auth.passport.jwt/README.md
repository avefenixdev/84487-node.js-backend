# EditorConfig

<https://editorconfig.org/>

- EditorConfig.EditorConfig

## Crear el archivo .editorconfig

## Pego lo siguiente en el archivo

```ini
root = true

[*]
charset = utf-8
end_of_line = lf
insert_final_newline = true
indent_style = space
indent_size = 2
trim_trailing_whitespace = true
```

## Su función es estandarizar el editor:

- indentación
- charset
- finales de línea
- espacios finales

# Prettier

<https://prettier.io/>

Prettier no valida lógica, No detecta bugs, No remplaza a otras herramientas. Corrije estilo.

- comillas
- saltos de línea
- ancho de línea
- puntos y comas
- orden visual

## Instalando la extensión

- esbenp.prettier-vscode

## crear un archivo .prettierrc.json

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "printWidth": 80,
  "trailingComma": "es5"
}
```

## Configurar el prettier como formateador por defecto

> Voy al engranaje y busco Formatter -> Configuro a prettier como formateador por defecto

# ESLint (Cerebro)

<https://eslint.org/>

- Detecta errores reales de código
- evita malas prácticas
- controla entorno (Node, Browser)
- valida reglas de equipo

## Instalando extensiones

- dbaeumer.vscode-eslint
- usernamehw.errorlens

## Creamos un archivo llamado eslint.config.js

```js
import js from '@eslint/js';
import prettier from 'eslint-config-prettier';

export default [
  js.configs.recommended,
  prettier,
  {
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    env: {
      node: true,
    },
    rules: {
      'no-console': 'off',
      'no-unused-vars': ['warn'],
    },
  },
];
```

# Dependencias para la gestión de usuario y autenticación

- bcrypt -> encriptar la contraseña del usuario y poder guardar en la DB <https://www.npmjs.com/package/bcrypt>
- express-session -> gestión de sesiones
- connect-mongo -> nos va a permitir persistir las sesiones de usuario dentro de la DB
- mongoose -> Conectar y usar la DB
- cookie-parser -> procesar las cookies que lleguen del frontend
- passport -> gestión más fácil de sesiones y cookies para el auth
- passwport-local -> la gestión de sesiones va a ser a través de un correo y un password

```sh
npm i bcrypt express-session connect-mongo mongoose cookie-parser passport passport-local
```
