import React, { createContext, useEffect, useState } from 'react'
import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged,
  User,
} from 'firebase/auth'
import { app } from '@/firebase.config'

const auth = getAuth(app)

type AuthContextType = {
  user: User | null
  loading: boolean
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        await signInAnonymously(auth)
      } else {
        setUser(firebaseUser)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
