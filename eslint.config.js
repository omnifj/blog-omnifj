import antfu from '@antfu/eslint-config'
import reactHooks from 'eslint-plugin-react-hooks'

const OFF = 0
const WARN = 1
const ERROR = 2

const composer = antfu({
  ignores: [
    'public',
    'build',
    'dist',
    'node_modules',
    'coverage',
    'src/assets/**',
  ],
  stylistic: {
    indent: 2,
    quotes: 'single',
    overrides: {
      'antfu/top-level-function': 'off',
      'style/arrow-parens': 'off',
      curly: 'off',
    },
  },
  jsonc: true,
  formatters: {
    markdown: true,
  },
  typescript: true,
  react: true,
  markdown: true,
  extends: [
    'next/core-web-vitals',
  ],
  rules: {
    'antfu/top-level-function': OFF,
    'react-dom/no-unsafe-target-blank': OFF,
    'react-dom/no-missing-button-type': OFF,
    'react-hooks/exhaustive-deps': WARN,
    'react/no-useless-fragment': OFF,
    'react/no-array-index-key': OFF,
    'react-hooks/rules-of-hooks': OFF,
    'react/no-comment-textnodes': OFF,
    'react-refresh/only-export-components': OFF,
    'react-hooks-extra/no-unnecessary-use-prefix': OFF,
    'react-hooks-extra/prefer-use-state-lazy-initialization': OFF,
    'react-dom/no-dangerously-set-innerhtml': OFF,

    'unused-imports/no-unused-vars': WARN,
    curly: [ERROR, 'multi-line', 'consistent'],

    'no-multiple-empty-lines': [
      ERROR,
      {
        max: 3,
      },
    ],
    'no-console': WARN,

    'style/jsx-self-closing-comp': [ERROR, {
      component: true,
      html: false,
    }],
    'style/no-multiple-empty-lines': [ERROR, {
      max: 2,
      maxEOF: 0,
    }],
    'style/max-statements-per-line': ERROR,
    'style/quote-props': [ERROR, 'as-needed'],

    'ts/no-use-before-define': OFF,
    'ts/ban-ts-comment': OFF,
  },
})

const config = await composer

const rulesConfig = config.find(c =>
  c.rules
  && (
    'react-hooks/exhaustive-deps' in c.rules
    || 'react-hooks/rules-of-hooks' in c.rules
  ),
)

if (rulesConfig) {
  rulesConfig.plugins = {
    ...(rulesConfig.plugins || {}),
    'react-hooks': reactHooks,
  }
}

export default config
