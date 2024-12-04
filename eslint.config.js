const nx = require('@nx/eslint-plugin');

const allowedFrontendExternalImports = [
  'jest-preset-angular/setup-jest',
  '@angular/*',
  '@ionic/*',
  'ionicons*',
  '@capacitor/*',
  'rxjs',
];

const allowedBackendExternalImports = ['express', '@faker-js/faker'];

module.exports = [
  ...nx.configs['flat/base'],
  ...nx.configs['flat/typescript'],
  ...nx.configs['flat/javascript'],
  {
    ignores: ['**/dist', '**/android', '**/ios'],
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: ['^.*/eslint(\\.base)?\\.config\\.[cm]?js$'],
          depConstraints: [
            {
              sourceTag: 'type:app',
              onlyDependOnLibsWithTags: [
                'type:feature',
                'type:ui',
                'type:model',
                'platform:mobile',
                'platform:web',
              ],
              allowedExternalImports: allowedFrontendExternalImports,
            },
            {
              sourceTag: 'type:api',
              onlyDependOnLibsWithTags: ['type:model', 'platform:node'],
              allowedExternalImports: allowedBackendExternalImports,
            },
            {
              sourceTag: 'type:feature',
              onlyDependOnLibsWithTags: [
                'type:data-access',
                'type:ui',
                'type:model',
              ],
              allowedExternalImports: allowedFrontendExternalImports,
            },
            {
              sourceTag: 'type:data-access',
              onlyDependOnLibsWithTags: ['type:model'],
              allowedExternalImports: allowedFrontendExternalImports,
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['type:model'],
              allowedExternalImports: allowedFrontendExternalImports,
            },
            {
              sourceTag: 'type:model',
              onlyDependOnLibsWithTags: [],
              bannedExternalImports: ['*'],
            },
            {
              sourceTag: 'platform:node',
              onlyDependOnLibsWithTags: ['platform:node'],
              allowedExternalImports: allowedBackendExternalImports,
            },
            {
              sourceTag: 'platform:mobile',
              onlyDependOnLibsWithTags: ['platform:mobile'],
              allowedExternalImports: allowedFrontendExternalImports,
            },
            {
              sourceTag: 'platform:web',
              onlyDependOnLibsWithTags: ['platform:web'],
              allowedExternalImports: allowedFrontendExternalImports,
            },
          ],
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
];
