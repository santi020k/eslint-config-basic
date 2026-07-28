import { useMemo, useState } from 'react'

import { ThemeContext } from './theme-context.js'

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
