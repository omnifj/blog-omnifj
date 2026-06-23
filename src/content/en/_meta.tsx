import type { MetaRecord } from 'nextra'

export default {
  index: {
    type: 'page',
    title: 'Home',
    theme: {
      copyPage: false,
      timestamp: false,
      layout: 'full',
      toc: false,
    },
  },
} satisfies MetaRecord
