import type { MetaRecord } from 'nextra'

export default {
  index: {
    type: 'page',
    title: '博客',
    theme: {
      toc: false,
      timestamp: false,
    },
  },
  'first-post': {
    title: '第一篇文章',
  },
} satisfies MetaRecord
