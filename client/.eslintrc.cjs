/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution');

module.exports = {
  root: true,
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  overrides: [
    {
      files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}'],
      extends: ['plugin:cypress/recommended']
    }
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    // Indentation de 2 espaces
    'indent': ['error', 2],

    // Toujours utiliser des points-virgules à la fin des déclarations
    'semi': ['error', 'always'],

    // Interdiction des variables non utilisées
    'no-unused-vars': 'error',

    // Interdiction d'utiliser à la fois des espaces et des tabulations pour l'indentation
    'no-mixed-spaces-and-tabs': 'error',

    // Limite de la longueur d'une ligne de code à 80 caractères (ignorer les commentaires)
    'max-len': ['error', {'code': 127, 'ignoreComments': true}],

    // Interdiction des espaces en fin de ligne
    'no-trailing-spaces': 'error',

    // Exiger des valeurs par défaut pour les propriétés Vue.js (props)
    'vue/require-default-prop': 'error',

    // Interdiction d'utiliser v-html pour réduire les vulnérabilités XSS
    'vue/no-v-html': 'error',
  }
};
