'use client'

import { createContext, useContext } from 'react'

const GuestContext = createContext<boolean>(false)

export const GuestProvider = ({ children, isGuest }: { children: React.ReactNode, isGuest: boolean }) => {
  return (
    <GuestContext.Provider value={isGuest}>
      {children}
    </GuestContext.Provider>
  )
}

export const useGuest = () => useContext(GuestContext)
