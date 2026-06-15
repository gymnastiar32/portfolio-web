import { useEffect, useState } from 'react'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../../components/common/EmptyState'
import { LoadingState } from '../../components/common/LoadingState'
import { Reveal } from '../../components/common/Reveal'
import { AboutSection } from '../../components/public/AboutSection'
import { ContactSection } from '../../components/public/ContactSection'
import { HeroSection } from '../../components/public/HeroSection'
import { PortfolioGrid } from '../../components/public/PortfolioGrid'
import { SkillsSection } from '../../components/public/SkillsSection'
import { useDocumentTitle } from '../../hooks/useDocumentTitle'
import { portfolioService } from '../../services/portfolioService'
import type { Portfolio } from '../../types/portfolio'

export function HomePage() {
  const [portfolios, setPortfolios] = useState<Portfolio[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useDocumentTitle('Home')

  useEffect(() => {
    async function loadPortfolio() {
      try {
        const data = await portfolioService.getPublishedPortfolios()
        const featured = data.filter((portfolio) => portfolio.featured).slice(0, 6)
        setPortfolios(featured.length > 0 ? featured : data.slice(0, 6))
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Unable to load featured portfolio.')
      } finally {
        setLoading(false)
      }
    }

    void loadPortfolio()
  }, [])

  return (
    <>
      <HeroSection featuredCount={portfolios.length} />
      <AboutSection />
      <SkillsSection />
      <section id="portfolio" className="section-shell scroll-mt-28 py-14 sm:scroll-mt-32">
        <Reveal className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="section-kicker">Portfolio</p>
            <h2 className="max-w-2xl text-3xl font-semibold text-stone-950 sm:text-4xl">Selected work I designed and developed.</h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-stone-600 sm:text-base">
              Product, commerce, and operational interface work shaped around clarity, responsive React UI, and smooth HTML, CSS, and JavaScript interactions.
            </p>
          </div>
          <Button as={Link} to="/portfolio" color="light" className="w-full border border-primary-200 bg-white sm:w-auto">
            View archive
          </Button>
        </Reveal>
        {loading ? <LoadingState label="Loading featured portfolio..." /> : null}
        {!loading && error ? (
          <EmptyState title="Featured work is unavailable" description={error} ctaLabel="Browse all work" ctaHref="/portfolio" />
        ) : null}
        {!loading && !error && portfolios.length === 0 ? (
          <EmptyState
            title="No published portfolio yet"
            description="This section only shows published records from the hosting database. Create a portfolio in the admin area, then change its status to publish."
            ctaLabel="View portfolio page"
            ctaHref="/portfolio"
          />
        ) : null}
        {!loading && !error && portfolios.length > 0 ? <PortfolioGrid portfolios={portfolios} /> : null}
      </section>
      <ContactSection />
    </>
  )
}
