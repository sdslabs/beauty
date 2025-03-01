import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'

interface User {
  id: string
  username: string
  role: string
  token: string
}

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (user: User) => void
  logout: () => void
}

interface ConfigState {
  name: string
  about: string
  startingTime: string
  endingTime: string
  prizes: string
  logoUrl: string
  setConfig: (config: Partial<ConfigState>) => void
}

interface Store extends AuthState, ConfigState {}

const useStore = create<Store>()(
  devtools(
    persist(
      (set) => ({
        // Auth State
        user: null,
        isAuthenticated: false,
        login: (user) => set({ user, isAuthenticated: true }),
        logout: () => set({ user: null, isAuthenticated: false }),

        // Config State
        name: '',
        about: '',
        startingTime: '',
        endingTime: '',
        prizes: '',
        logoUrl: '',
        setConfig: (config) => set((state) => ({ ...state, ...config })),
      }),
      {
        name: 'ctf-storage',
      }
    )
  )
)

export default useStore