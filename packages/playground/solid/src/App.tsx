import { createEffect, createSignal, onMount } from 'solid-js'

const App = () => {
  // eslint-disable-next-line no-var, @typescript-eslint/no-unused-vars
  var x = 1
  const [count, setCount] = createSignal(0)

  createEffect(() => {
    console.log('Count is now', count())
  })

  onMount(() => {
    console.log('Solid App mounted')
  })

  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return (
    <div>
      <h1>Solid Playground</h1>
      <p>
        Count:
        {count()}
      </p>
      <button onClick={() => setCount(count() + 1)}>
        Increment
      </button>
    </div>
  )
}

export default App
