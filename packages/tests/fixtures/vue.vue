<template>
  <!-- Missing :key on v-for — triggers vue/require-v-for-key -->
  <ul>
    <li v-for="item in items">{{ item }}</li>
  </ul>
</template>

<script setup lang="ts">
// Double quotes — triggers @stylistic/quotes (warn)
const items = ["apple", "banana", "cherry"]
</script>
