import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

function Button({ label, onClick }: { label: string; onClick: () => void }) {
  return <button type="button" onClick={onClick}>{label}</button>
}

describe('Testing Library playground', () => {
  it('renders a button', () => {
    render(<Button label="Click me" onClick={() => {}} />)

    expect(screen.getByRole('button', { name: 'Click me' })).toBeDefined()
  })

  it('calls onClick when clicked', async () => {
    const user = userEvent.setup()
    const handleClick = vi.fn()

    render(<Button label="Click me" onClick={handleClick} />)

    await user.click(screen.getByRole('button'))

    expect(handleClick).toHaveBeenCalledOnce()
  })
})
