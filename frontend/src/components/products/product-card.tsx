import { Button } from '@/components/ui/button'
import { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
  onAddToCart: (product: Product) => Promise<void>
}

export function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <div className="border rounded-lg p-4 shadow-sm">
      <h3 className="text-lg font-semibold">{product.name}</h3>
      <p className="text-gray-600">${product.price}</p>
      <Button
        onClick={() => onAddToCart(product)}
        className="mt-4 w-full"
      >
        Add to Cart
      </Button>
    </div>
  )
}