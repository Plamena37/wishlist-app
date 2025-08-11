import React, { createContext, useEffect, useRef, useState } from 'react'
import { useLocation } from 'react-router'

type RouterHistoryContextType = {
  from: string | null
  to: string
}

export const RouterHistoryContext = createContext<
  RouterHistoryContextType | undefined
>(undefined)

export const RouterHistoryProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const location = useLocation()
  const [history, setHistory] = useState<RouterHistoryContextType>({
    from: null,
    to: location.pathname,
  })

  const prevLocationRef = useRef<string | null>(null)

  useEffect(() => {
    setHistory({
      from: prevLocationRef.current,
      to: location.pathname,
    })

    prevLocationRef.current = location.pathname
  }, [location.pathname])

  return (
    <RouterHistoryContext.Provider value={history}>
      {children}
    </RouterHistoryContext.Provider>
  )
}
