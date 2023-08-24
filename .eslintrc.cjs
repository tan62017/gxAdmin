const { defineEslintConfig } = require('@tonyptang/eslint-config/utils')

module.exports = defineEslintConfig({
  extends: ['.eslintrc-auto-import.json'],
  globals: {
    defineOptions: true,
    defineModel: true,
    ElMessage: true
  },
  rules: {
    'no-tabs': 'off',
    '@typescript-eslint/no-var-requires': 'off'
  },
  prettier: true
})
