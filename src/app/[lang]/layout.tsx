import type { Metadata } from 'next'

import type { I18nLangAsyncProps, I18nLangKeys } from '@/i18n'
import { Footer, LastUpdated, Layout, Navbar } from 'nextra-theme-docs'
import { Head, Search } from 'nextra/components'
import { getPageMap } from 'nextra/page-map'
import { Toaster } from '@/components/ui/sonner'
import { getServerLocale } from '@/hooks'
import NavbarExtras from '@/widgets/navbar-extras'

import { getDirection } from '../_dictionaries/get-dictionary'
import './styles/index.css'

const currentYear = new Date().getFullYear()

export const metadata = {
  metadataBase: new URL('https://example.com'),
  icons: '/img/favicon.svg',
} satisfies Metadata

const CustomNavbar = async ({ lang }: I18nLangAsyncProps) => {
  const { t } = await getServerLocale(lang)
  return (
    <Navbar
      logo={(
        <span>{ t('systemTitle') }</span>
      )}
      logoLink={`/${lang}`}
    >
      <NavbarExtras />
    </Navbar>
  )
}

export default async function RootLayout({ children, params }: LayoutProps<'/[lang]'>) {
  const getterParams = await params

  const { lang } = getterParams as { lang: I18nLangKeys }

  const pageMap = await getPageMap(lang)

  const title = 'My Blog'
  const description = 'A simple blog built with Next.js and Nextra'

  const { t } = await getServerLocale(lang)

  return (
    <html
      lang={lang}
      dir={getDirection(lang)}
      suppressHydrationWarning
    >
      <Head>
        <meta property="og:title" content={title} />
        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
      </Head>
      <body>
        <Layout
          copyPageButton={false}
          navbar={
            <CustomNavbar lang={lang} />
          }
          lastUpdated={(
            <LastUpdated>
              { t('lastUpdated') }
            </LastUpdated>
          )}
          editLink={null}
          footer={(
            <Footer className="bg-background py-5!">
              <p className="w-full text-center text-sm text-gray-500 dark:text-zinc-400">
                ©
                {' '}
                { currentYear }
                {' '}
                My Blog
              </p>
            </Footer>
          )}
          search={(
            <Search
              placeholder={t('search.placeholder')}
              emptyResult={t('search.noResults')}
              errorText={t('search.errorText')}
              loading={t('search.loading')}
            />
          )}
          i18n={[
            { locale: 'en', name: 'English' },
            { locale: 'zh', name: '简体中文' },
          ]}
          toc={{
            backToTop: t('backToTop'),
            title: t('pageTitle'),
          }}
          pageMap={pageMap}
          feedback={{ content: '' }}
          nextThemes={{
            attribute: 'class',
            defaultTheme: 'system',
            storageKey: 'blog-theme-provider',
            disableTransitionOnChange: true,
          }}
        >
          {children}
        </Layout>
        <Toaster position="top-center" />
      </body>
    </html>
  )
}
