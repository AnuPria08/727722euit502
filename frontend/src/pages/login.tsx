import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-hot-toast'
import { login } from '@/lib/api'
import { useAuthStore } from '@/stores/auth'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

interface LoginForm {
  username: string
  password: string
}

export function LoginPage() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const setToken = useAuthStore((state) => state.setToken) // Correct usage of store
  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()

  const onSubmit = async (data: LoginForm) => {
    try {
      setIsLoading(true)
      const response = await login(data.username, data.password)
      localStorage.setItem('token', response.token)
      // Optionally store user info
      localStorage.setItem('user', JSON.stringify(response.user))
  
      setToken(response.token) // This should properly update the store
      navigate('/products') // Navigate to the products page after successful login
    } catch (error) {
      toast.error('Invalid username or password')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow">
        <h2 className="text-3xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Input
            label="Username"
            {...register('username', { required: 'Username is required' })}
            error={errors.username?.message}
          />
          <Input
            label="Password"
            type="password"
            {...register('password', { required: 'Password is required' })}
            error={errors.password?.message}
          />
          <Button type="submit" isLoading={isLoading} className="w-full">
            Login
          </Button>
        </form>
      </div>
    </div>
  )
}
