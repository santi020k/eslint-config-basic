<script>
  let count = $state(0)
  let elem

  const increment = () => {
    count += 1
  }

  const setContent = () => {
    if (elem) elem.innerHTML = '<p>test</p>'
  }

  $effect(() => {
    console.log(`The count is now ${count}`)
  })
</script>

<main>
  <h1>Svelte Playground</h1>
  <button onclick={increment}>
    Count: {count}
  </button>
</main>

<style>
  /* Test: color rule is active - svelte-specific linting rule */
  main {
    padding: 1rem;
  }
</style>
