import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';
import prettierConfig from 'eslint-config-prettier';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [eslint.configs.recommended, tseslint.configs.recommended, prettierConfig],
    files: ['**/*.{ts}'],
    rules: {
      'no-console': 'warn',
    },
  },
);