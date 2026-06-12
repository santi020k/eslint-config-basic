import { createContext, use, useMemo, useState } from 'react'

const ThemeContext = createContext(undefined)

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light')
  }

  const value = useMemo(() => ({
    theme,
    toggleTheme
  }), [theme])

  return (
    <ThemeContext value={value}>
      {children}
    </ThemeContext>
  )
}

export const useTheme = () => {
  const context = use(ThemeContext)

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }

  return context
}
