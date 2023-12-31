module.exports = {
    env: {
      commonjs: true,
      es2021: true,
      node: true,
    },
    extends: [
      'eslint:recommended',
      'plugin:node/recommended',
      'prettier',
    ],
    parserOptions: {
      ecmaVersion: 12,
    },
    rules: {
      'node/no-unsupported-features/es-syntax': ['error', { ignores: ['modules'] }],
      'prettier/prettier': 'error',
    },
    plugins: ['prettier'],
  };
  