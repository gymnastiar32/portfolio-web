import { useEffect, useState } from 'react'
import { Button } from 'flowbite-react'
import { Link } from 'react-router-dom'
import { EmptyState } from '../../components/common/EmptyState'
import { LoadingState } from '../../components/common/LoadingState'
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
      <section id="portfolio" className="section-shell py-14">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <p className="section-kicker">Featured Portfolio</p>
            <h2 className="text-3xl text-stone-900 sm:text-4xl">Selected case studies with measurable product context.</h2>
          </div>
        </div>
        {loading ? <LoadingState label="Loading featured portfolio..." /> : null}
        {!loading && error ? (
          <EmptyState title="Featured work is unavailable" description={error} ctaLabel="Browse all work" ctaHref="/portfolio" />
        ) : null}
        {!loading && !error && portfolios.length === 0 ? (
          <EmptyState
            title="No published portfolio in Supabase yet"
            description="This section only shows published records from Supabase. Create a portfolio in the admin area, then change its status to publish."
            ctaLabel="View portfolio page"
            ctaHref="/portfolio"
          />
        ) : null}
        {!loading && !error && portfolios.length > 0 ? <PortfolioGrid portfolios={portfolios} /> : null}
        <div className='flex justify-center'>
          <Button as={Link} to="/portfolio" color="yellow" className='mt-5'>
            View all portfolio
          </Button>
        </div>
      </section>
      <ContactSection />
    </>
  )
}
