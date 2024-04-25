import React, { createContext, ReactNode, useContext, useState } from 'react'

export type AuthUser = {
  fullName: string
  profilePic: string
  username: string
  _id: string
}

type AuthContextType = {
  authUser: AuthUser | undefined
  setAuthUser: React.Dispatch<React.SetStateAction<AuthUser>> // Change the type accordingly
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuthContext = () => {
  return useContext(AuthContext)
}

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const [authUser, setAuthUser] = useState<AuthUser>(
    JSON.parse(localStorage.getItem('chat-user')) || null
  )

  return (
    <AuthContext.Provider value={{ authUser, setAuthUser }}>
      {children}
    </AuthContext.Provider>
  )
}
