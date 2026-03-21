<script>
  let count = $state(0)

  function increment() {
    count += 1
  }

  $effect(() => {
    console.log(`The count is now ${count}`)
  })
</script>

<main>
  <h1>Svelte Playground</h1>
  <button on:click={increment}>
    Count: {count}
  </button>
</main>

<style>
  main {
    padding: 1rem;
  }
</style>
