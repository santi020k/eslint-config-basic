<script lang="ts">
  // Double quotes — triggers @stylistic/quotes (warn)
  let count = 0
  const unusedVar = "this variable is never used"

  const increment = () => {
    count++
  }
</script>

<button on:click={increment}>{count}</button>
