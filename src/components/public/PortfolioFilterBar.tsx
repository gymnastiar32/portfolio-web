import { Label, Select, TextInput } from 'flowbite-react'
import { HiMagnifyingGlass } from 'react-icons/hi2'

interface PortfolioFilterBarProps {
  search: string
  category: string
  categories: string[]
  onSearchChange: (value: string) => void
  onCategoryChange: (value: string) => void
}

export function PortfolioFilterBar({
  search,
  category,
  categories,
  onSearchChange,
  onCategoryChange,
}: PortfolioFilterBarProps) {
  return (
    <div className="glass-panel grid gap-4 p-5 md:grid-cols-[1.5fr_0.7fr]">
      <div>
        <Label htmlFor="portfolio-search">Search portfolio</Label>
        <TextInput
          id="portfolio-search"
          className="mt-2"
          icon={HiMagnifyingGlass}
          placeholder="Search by project title"
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
      </div>
      <div>
        <Label htmlFor="portfolio-category">Filter by category</Label>
        <Select
          id="portfolio-category"
          className="mt-2"
          value={category}
          onChange={(event) => onCategoryChange(event.target.value)}
        >
          <option value="">All categories</option>
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </div>
    </div>
  )
}
