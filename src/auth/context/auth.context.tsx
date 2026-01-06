import React, { createContext, useEffect, useState } from 'react'
import {
  signInAnonymously,
  onAuthStateChanged,
  User,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  FacebookAuthProvider,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  updateProfile,
  // sendPasswordResetEmail,
  // sendEmailVerification,
  // updatePassword,
} from 'firebase/auth'
import { auth } from '@/firebase.config'
import { FirebaseError } from 'firebase/app'

const getAuthErrorMessage = (error: FirebaseError): string => {
  const code = error?.code

  switch (code) {
    case 'auth/email-already-in-use':
      return 'This email is already registered.'
    case 'auth/invalid-credential':
      return 'Incorrect email or password.'
    case 'auth/invalid-email':
      return 'Please enter a valid email address.'
    case 'auth/weak-password':
      return 'Password is too weak.'
    case 'auth/user-not-found':
      return 'No account found with this email.'
    case 'auth/wrong-password':
      return 'Incorrect password.'
    case 'auth/popup-closed-by-user':
      return 'Sign-in was cancelled.'
    default:
      return 'Something went wrong. Please try again.'
  }
}

type AuthResult = { success: true } | { success: false; error: string }

type AuthContextType = {
  user: User | null
  loading: boolean
  authActionLoading: boolean
  isUserSignedIn: boolean
  authError: string | null
  signUpWithEmail: (
    email: string,
    password: string,
    displayName: string
  ) => Promise<AuthResult>
  signInWithEmail: (email: string, password: string) => Promise<AuthResult>
  signInWithGoogle: () => void
  signInWithFacebook: () => void
  clearAuthError: () => void
  signOut: () => void
}

export const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  authActionLoading: false,
  isUserSignedIn: false,
  authError: '',
  signUpWithEmail: (): Promise<AuthResult> =>
    Promise.resolve({ success: false, error: '' }),
  signInWithEmail: (): Promise<AuthResult> =>
    Promise.resolve({ success: false, error: '' }),
  signInWithGoogle: () => {},
  signInWithFacebook: () => {},
  clearAuthError: () => {},
  signOut: () => {},
})

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isUserSignedIn, setIsUserSignedIn] = useState(false)
  const [authActionLoading, setAuthActionLoading] = useState(false)
  const [authError, setAuthError] = useState<string | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser)
      } else {
        await signInAnonymously(auth)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const handleSignUpWithEmail = async (
    email: string,
    password: string,
    displayName: string
  ): Promise<AuthResult> => {
    setAuthActionLoading(true)
    setAuthError(null)
    setIsUserSignedIn(false)

    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )

      await updateProfile(userCredentials.user, { displayName })
      setIsUserSignedIn(true)
      return { success: true }
    } catch (error) {
      const message = getAuthErrorMessage(error as FirebaseError)
      setAuthError(message)
      setIsUserSignedIn(false)
      return { success: false, error: message }
    } finally {
      setAuthActionLoading(false)
    }
  }

  const handleSignInWithEmail = async (
    email: string,
    password: string
  ): Promise<AuthResult> => {
    setAuthActionLoading(true)
    setAuthError(null)
    setIsUserSignedIn(false)

    try {
      await signInWithEmailAndPassword(auth, email, password)
      setIsUserSignedIn(true)
      return { success: true }
    } catch (error) {
      const message = getAuthErrorMessage(error as FirebaseError)
      setAuthError(message)
      setIsUserSignedIn(false)
      return { success: false, error: message }
    } finally {
      setAuthActionLoading(false)
    }
  }

  const handleGoogleSignIn = async () => {
    setAuthActionLoading(true)
    setAuthError(null)
    setIsUserSignedIn(false)

    try {
      const provider = new GoogleAuthProvider()
      await signInWithPopup(auth, provider)
      setIsUserSignedIn(true)
    } catch (error) {
      const message = getAuthErrorMessage(error as FirebaseError)
      setAuthError(message)
      setIsUserSignedIn(false)
    } finally {
      setAuthActionLoading(false)
    }
  }

  const handleFacebookSignIn = async () => {
    setAuthActionLoading(true)
    setAuthError(null)
    setIsUserSignedIn(false)

    try {
      const provider = new FacebookAuthProvider()
      await signInWithPopup(auth, provider)
      setIsUserSignedIn(true)
    } catch (error) {
      const message = getAuthErrorMessage(error as FirebaseError)
      setAuthError(message)
      setIsUserSignedIn(false)
    } finally {
      setAuthActionLoading(false)
    }
  }

  const clearAuthError = () => {
    setAuthError(null)
  }

  // const handlePasswordReset = (email: string) => {
  //   return sendPasswordResetEmail(auth, email)
  // }

  // const handlePasswordChange = (password: string) => {
  //   if (!auth?.currentUser) return
  //   return updatePassword(auth.currentUser, password)
  // }

  // const handleSendEmailVerification = () => {
  //   if (!auth?.currentUser) return
  //   return sendEmailVerification(auth.currentUser, {
  //     url: `${window.location.origin}/home`,
  //   })
  // }

  const handleSignOut = async () => {
    await signOut(auth)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        authActionLoading,
        authError,
        isUserSignedIn,
        signUpWithEmail: handleSignUpWithEmail,
        signInWithEmail: handleSignInWithEmail,
        signInWithGoogle: handleGoogleSignIn,
        signInWithFacebook: handleFacebookSignIn,
        clearAuthError,
        signOut: handleSignOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}
