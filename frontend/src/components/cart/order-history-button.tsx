import { Clock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getOrders } from '@/lib/api'
import { toast } from 'react-hot-toast'

export function OrderHistoryButton() {
  const handleViewOrders = async () => {
    try {
      const orders = await getOrders()
      toast.success(`Orders: ${JSON.stringify(orders)}`)
    } catch (error) {
      toast.error('Failed to load orders')
    }
  }

  return (
    <Button variant="secondary" onClick={handleViewOrders}>
      <Clock className="w-5 h-5 mr-2" />
      Order History
    </Button>
  )
}