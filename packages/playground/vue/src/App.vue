<script setup lang="ts">
import { computed, ref } from 'vue'

const count = ref(0)
const doubleCount = computed(() => count.value * 2)

const increment = () => {
  count.value++
}
</script>

<template>
  <div class="app-container">
    <h1>Vue Playground Example</h1>

    <div class="counter-card">
      <p>Current count is: {{ count }}</p>
      <p>Double count is: {{ doubleCount }}</p>

      <button @click="increment">
        Increment
      </button>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  padding: 2rem;
  font-family: system-ui, sans-serif;
}

.counter-card {
  border: 1px solid #ccc;
  padding: 1rem;
  border-radius: 8px;
  max-width: 300px;
}

button {
  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: #42b883;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #33a06f;
}
</style>
