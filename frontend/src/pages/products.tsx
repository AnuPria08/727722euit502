import { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { getItems, addToCart, checkout } from '@/lib/api'
import { CartButton } from '@/components/cart/cart-button'
import { OrderHistoryButton } from '@/components/cart/order-history-button'
import { ProductGrid } from '@/components/products/product-grid'
import { Button } from '@/components/ui/button'
import { Product } from '@/types/product'

export function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const data = await getItems()
      setProducts(data)
    } catch (error) {
      toast.error('Failed to load products')
    } finally {
      setIsLoading(false)
    }
  }

  const handleAddToCart = async (product: Product) => {
    try {
      await addToCart(product.id);
      toast.success('Added to cart');
    } catch (error: any) {
      console.error('Add to cart error:', error);  // Log error details
      toast.error('Failed to add to cart');
    }
  };
    

  const handleCheckout = async () => {
    try {
      await checkout(1)
      toast.success('Order placed successfully')
    } catch (error) {
      toast.error('Checkout failed')
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Products</h1>
        <div className="space-x-4">
          <CartButton />
          <OrderHistoryButton />
          <Button onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </div>

      <ProductGrid products={products} onAddToCart={handleAddToCart} />
    </div>
  )
}