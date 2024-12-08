import { ShoppingCart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/stores/cart'
import { getCart } from '@/lib/api'
import { toast } from 'react-hot-toast'

export function CartButton() {
  const cartItems = useCartStore((state) => state.items)

  const handleViewCart = async () => {
    try {
      const cart = await getCart()
      toast.success(`Cart items: ${JSON.stringify(cart)}`)
    } catch (error) {
      toast.error('Failed to load cart')
    }
  }

  return (
    <Button variant="secondary" onClick={handleViewCart}>
      <ShoppingCart className="w-5 h-5 mr-2" />
      Cart ({cartItems.length})
    </Button>
  )
}