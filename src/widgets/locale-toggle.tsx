'use client'

import clsx from 'clsx'
import { addBasePath } from 'next/dist/client/add-base-path'
import { usePathname, useRouter } from 'next/navigation'
import { useCallback } from 'react'
import { Toggle } from '@/components/ui/toggle'
import { useLocale } from '@/hooks'

const ONE_YEAR = 365 * 24 * 60 * 60 * 1000

export default function LocaleToggle({
  className,
}: {
  className?: string
}) {
  const { currentLocale } = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const changeLocale = useCallback(() => {
    const currentPosition = window.scrollY
    const isAtBottom = (window.innerHeight + window.scrollY) >= document.body.offsetHeight

    const nextHref = {
      value: '',
    }
    if (currentLocale === 'zh') {
      nextHref.value = addBasePath(pathname.replace(`/zh`, `/en`))
    }
    else {
      nextHref.value = addBasePath(pathname.replace(`/en`, `/zh`))
    }

    const date = new Date(Date.now() + ONE_YEAR)
    document.cookie = `NEXT_LOCALE=${currentLocale}; expires=${date.toUTCString()}; path=/`

    router.replace(nextHref.value)

    requestAnimationFrame(() => {
      if (isAtBottom) {
        window.scrollTo(0, document.body.scrollHeight)
      }
      else {
        window.scrollTo(0, currentPosition)
      }
    })
  }, [currentLocale, pathname, router])

  return (
    <Toggle
      size="sm"
      className={clsx([
        'cursor-pointer',
        className,
      ])}
      onClick={changeLocale}
    >
      {
        currentLocale === 'zh'
          ? <span className="icon-[uil--letter-chinese-a]" />
          : <span className="icon-[ri--english-input]" />
      }
    </Toggle>
  )
}
