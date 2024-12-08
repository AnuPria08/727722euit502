import { create } from 'zustand'

interface AuthState {
  token: string | null
  setToken: (token: string) => void
  logout: () => void
  isAuthenticated: boolean
}

export const useAuthStore = create<AuthState>((set) => ({
  // Initially, load the token from localStorage
  token: localStorage.getItem('token'),
  isAuthenticated: !!localStorage.getItem('token'),
  
  // Function to set the token and update the authentication state
  setToken: (token) => {
    localStorage.setItem('token', token)
    set({ token, isAuthenticated: true })
  },
  
  // Function to log out the user by removing the token
  logout: () => {
    localStorage.removeItem('token')
    set({ token: null, isAuthenticated: false })
  },
}))
