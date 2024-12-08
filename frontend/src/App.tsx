import { Routes, Route } from 'react-router-dom'
import { LoginPage } from './pages/login'
import { ProductsPage } from './pages/products'
import { ProtectedRoute } from './components/protected-route'

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/products"
        element={
          <ProtectedRoute>
            <ProductsPage />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  )
}

export default App