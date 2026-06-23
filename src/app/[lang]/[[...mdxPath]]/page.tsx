import type { I18nLangKeys } from '@/i18n'
import { generateStaticParamsFor, importPage } from 'nextra/pages'
import { useMDXComponents } from '@/mdx-components'

export const generateStaticParams = generateStaticParamsFor('mdxPath')

export async function generateMetadata(props: PageProps) {
  const params = await props.params
  const lang = (params.lang || 'zh') as I18nLangKeys
  const { metadata } = await importPage(params.mdxPath, lang)
  return metadata
}

type PageProps = Readonly<{
  params: Promise<{
    mdxPath: string[]
    lang: string
  }>
}>

// eslint-disable-next-line react/rules-of-hooks
const Wrapper = useMDXComponents().wrapper

export default async function Page(props: PageProps) {
  const params = await props.params
  const lang = (params.lang || 'zh') as I18nLangKeys
  const result = await importPage(params.mdxPath, lang)
  const { default: MDXContent, toc, metadata, sourceCode } = result

  return (
    <Wrapper toc={toc} metadata={metadata} sourceCode={sourceCode}>
      <MDXContent {...props} params={{ ...params, lang }} />
    </Wrapper>
  )
}
