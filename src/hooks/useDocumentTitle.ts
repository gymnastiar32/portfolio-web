import { useEffect } from 'react'

const SITE_TITLE = 'Portfolio'

export function buildDocumentTitle(pageTitle?: string) {
  return pageTitle ? `${pageTitle} | ${SITE_TITLE}` : SITE_TITLE
}

export function useDocumentTitle(pageTitle?: string) {
  useEffect(() => {
    document.title = buildDocumentTitle(pageTitle)
  }, [pageTitle])
}
