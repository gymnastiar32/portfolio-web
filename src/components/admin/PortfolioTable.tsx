import { Badge, Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react'
import { HiEye, HiPencilSquare, HiTrash } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import type { Portfolio } from '../../types/portfolio'
import { formatDate } from '../../utils/formatDate'

interface PortfolioTableProps {
  items: Portfolio[]
  onDelete: (portfolio: Portfolio) => void
}

export function PortfolioTable({ items, onDelete }: PortfolioTableProps) {
  return (
    <div className="overflow-x-auto rounded-3xl border border-stone-200 bg-white shadow-sm">
      <Table hoverable>
        <TableHead>
          <TableHeadCell>Project</TableHeadCell>
          <TableHeadCell>Category</TableHeadCell>
          <TableHeadCell>Status</TableHeadCell>
          <TableHeadCell>Updated</TableHeadCell>
          <TableHeadCell>Actions</TableHeadCell>
        </TableHead>
        <TableBody className="divide-y">
          {items.map((portfolio) => (
            <TableRow key={portfolio.id} className="bg-white">
              <TableCell>
                <div className="flex items-center gap-4">
                  <img src={portfolio.thumbnail_url} alt={portfolio.title} className="h-14 w-14 rounded-2xl object-cover" />
                  <div>
                    <p className="font-semibold text-stone-900">{portfolio.title}</p>
                    <p className="text-xs text-stone-500">{portfolio.short_description}</p>
                  </div>
                </div>
              </TableCell>
              <TableCell>{portfolio.category}</TableCell>
              <TableCell>
                <Badge color={portfolio.status === 'publish' ? 'success' : 'gray'} className="w-fit">
                  {portfolio.status}
                </Badge>
              </TableCell>
              <TableCell>{formatDate(portfolio.updated_at || portfolio.created_at)}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-2">
                  <Button as={Link} to={`/portfolio/${portfolio.slug}`} color="light" size="xs" target="_blank">
                    <HiEye className="mr-1 h-4 w-4" />
                    Preview
                  </Button>
                  <Button as={Link} to={`/admin/portfolio/${portfolio.id}/edit`} color="warning" size="xs">
                    <HiPencilSquare className="mr-1 h-4 w-4" />
                    Edit
                  </Button>
                  <Button color="failure" size="xs" onClick={() => onDelete(portfolio)}>
                    <HiTrash className="mr-1 h-4 w-4" />
                    Delete
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
