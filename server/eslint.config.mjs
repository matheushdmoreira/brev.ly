import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import simpleImportSort from 'eslint-plugin-simple-import-sort'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ['**/node_modules', '**/build'],
  },
  ...compat.extends('@rocketseat/eslint-config/node'),
  {
    plugins: {
      'simple-import-sort': simpleImportSort,
    },

    rules: {
      'simple-import-sort/imports': 'error',
      camelcase: 'off',
      'no-useless-catch': 'off',
      'no-useless-constructor': 'off',
      '@typescript-eslint/no-unsafe-declaration-merging': 'off',
    },
  },
]
