import { createSignal, createEffect, onMount } from "solid-js";

function App() {
  const [count, setCount] = createSignal(0);

  createEffect(() => {
    console.log("Count is now", count());
  });

  onMount(() => {
    console.log("Solid App mounted");
  });

  return (
    <div>
      <h1>Solid Playground</h1>
      <p>Count: {count()}</p>
      <button onClick={() => setCount(count() + 1)}>
        Increment
      </button>
    </div>
  );
}

export default App;
