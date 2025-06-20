import React, { createContext, useContext } from 'react'

interface ContainerContextType {
  containerId: string
  children: React.ReactNode
}

const ContainerContext = createContext<ContainerContextType>({
  containerId: '',
  children: null,
})

export const ContainerProvider = ({ containerId, children }: ContainerContextType) => {
  return (
    <ContainerContext.Provider value={{ containerId, children }}>
      {children}
    </ContainerContext.Provider>
  )
}

export const useContainer = () => {
  const context = useContext(ContainerContext)
  if (!context) {
    throw new Error('useContainer must be used within a ContainerProvider')
  }

  return context
}
