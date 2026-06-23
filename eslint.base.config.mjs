import nxPlugin from '@nx/eslint-plugin';
import globals from 'globals';

export default [
  {
    ignores: ['**/dist'],
  },
  { plugins: { '@nx': nxPlugin } },
  { languageOptions: { globals: { ...globals.es2022, ...globals.node } } },
  {
    files: ['**/*.ts', '**/*.js'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
];
