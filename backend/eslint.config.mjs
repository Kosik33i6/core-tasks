import eslint from '@eslint/js';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  { ignores: ['dist', 'node_modules'] },
  {
    extends: [eslint.configs.recommended, tseslint.configs.recommended],
    files: ['**/*.{ts}'],
  },
);