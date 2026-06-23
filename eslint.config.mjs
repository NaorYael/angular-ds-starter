import baseConfig from './eslint.base.config.mjs';
import nx from '@nx/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier/flat';

export default [
  {
    ignores: ['**/dist'],
  },
  ...baseConfig,
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  ...nx.configs['flat/angular'],
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.cts', '**/*.mts'],
    rules: {
      '@nx/enforce-module-boundaries': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          args: 'all',
          argsIgnorePattern: '^_',
          caughtErrors: 'all',
          caughtErrorsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          ignoreRestSiblings: true,
        },
      ],
      '@angular-eslint/directive-selector': 'error',
      '@angular-eslint/component-selector': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'warn',
      '@angular-eslint/prefer-on-push-component-change-detection': 'warn',
      '@angular-eslint/prefer-standalone': 'warn',
      '@angular-eslint/prefer-signals': 'warn',
      '@angular-eslint/prefer-inject': 'warn',
      '@typescript-eslint/no-explicit-any': 'warn',
      '@angular-eslint/no-output-on-prefix': 'off',
      '@typescript-eslint/no-extra-semi': 'error',
      '@typescript-eslint/no-empty-object-type': 'warn',
      '@typescript-eslint/no-unused-expressions': 'off',
      '@typescript-eslint/no-unsafe-function-type': 'off',
      'no-extra-semi': 'off',
      'no-console': 'warn',
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: '@angular/common',
              importNames: ['CommonModule'],
              message:
                'Import specific symbols from @angular/common (e.g. class bindings, AsyncPipe, NgTemplateOutlet) instead of CommonModule.',
            },
          ],
        },
      ],
      'no-restricted-syntax': [
        'error',
        {
          selector: 'MethodDefinition[accessibility="private"]',
          message: 'Use native private syntax (#name) instead of the private keyword.',
        },
        {
          selector: 'PropertyDefinition[accessibility="private"]',
          message: 'Use native private syntax (#name) instead of the private keyword.',
        },
        {
          selector: 'TSParameterProperty[accessibility="private"]',
          message: 'Use inject() with #name fields instead of constructor private parameters.',
        },
      ],
    },
  },
  {
    files: ['tools/codemods/**/*.ts'],
    rules: {
      'no-restricted-syntax': 'off',
    },
  },
  {
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/eqeqeq': 'error',
      '@angular-eslint/template/prefer-control-flow': 'error',
      '@angular-eslint/template/prefer-ngsrc': 'warn',
      '@angular-eslint/template/prefer-self-closing-tags': 'warn',
      '@angular-eslint/template/use-track-by-function': 'warn',
      '@angular-eslint/template/alt-text': 'off',
      '@angular-eslint/template/click-events-have-key-events': 'off',
      '@angular-eslint/template/interactive-supports-focus': 'off',
      '@angular-eslint/template/label-has-associated-control': 'off',
      '@angular-eslint/template/no-autofocus': 'off',
      '@angular-eslint/template/elements-content': 'off',
    },
  },
  {
    files: ['**/*.json'],
    rules: {
      '@nx/dependency-checks': 'warn',
    },
    languageOptions: {
      parser: await import('jsonc-eslint-parser'),
    },
  },
  eslintConfigPrettier,
];
