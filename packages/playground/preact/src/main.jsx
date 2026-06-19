import { render } from 'preact'

import App from './App.jsx'
import { ThemeProvider } from './ThemeContext.jsx'

const container = document.getElementById('root')

if (container) {
  render(
    <ThemeProvider>
      <App />
    </ThemeProvider>, container
  )
}
