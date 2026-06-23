import type { MetaRecord } from 'nextra'

export default {
  index: {
    type: 'page',
    title: '首页',
    theme: {
      copyPage: false,
      timestamp: false,
      layout: 'full',
      toc: false,
    },
  },
  blog: {
    type: 'page',
    title: '博客',
  },
  about: {
    type: 'page',
    title: '关于',
  },
} satisfies MetaRecord
