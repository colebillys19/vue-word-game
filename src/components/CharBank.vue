<script setup>
import { computed } from 'vue'
import { useBoardStore } from '@/stores/board'

const boardStore = useBoardStore()

boardStore.$subscribe((mutation) => {
  const {
    events: { key, newValue }
  } = mutation
  if (key === 'focusedIndices' && newValue[0] > -1) {
    // ...
  }
})

const activeBank = computed(() => {
  if (boardStore.focusedIndices[1] > -1) {
    return boardStore.colCharBanks[boardStore.focusedIndices[1]];
  }
  return {};
})
</script>

<template>
  <div>{{ Object.keys(activeBank).join(' ') }}</div>
</template>

<style scoped>
div {
  background-color: white;
  color: rgb(65, 105, 225);
  font-family: monospace;
  font-size: 16px;
  height: 120px;
  left: 0;
  outline: 3px solid black;
  padding: 12px;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 220px;
  z-index: 2;
}
</style>
