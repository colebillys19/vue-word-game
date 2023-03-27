<script setup>
import { ref } from 'vue'

import { useBoardStore } from './stores/board'
import BoardBoard from './components/BoardBoard.vue'

const boardStore = useBoardStore()
const mainRef = ref(null)

// boardStore.$subscribe((mutation) => {
//   const { events: { key, newValue } } = mutation;
//   if (key === 'lastInputIndices') {
//     if (newValue[1] !== 25) {
//       const nextCellIndices = [newValue[0], newValue[1] + 1].join('-');
//       const targetInput = mainRef.value.querySelector(`[indices="${nextCellIndices}"]`);
//       targetInput.focus();
//       // targetInput.value = '';
//       // boardStore.changeValueAtIndices('', nextCellIndices);
//     } else {
//       mainRef.value.querySelector(`[indices="${newValue.join('-')}"]`).blur();
//       boardStore.setFocusedIndices('');
//     }
//   }
// })

const handleMainClick = (target) => {
  if (target.tagName !== 'INPUT') {
    boardStore.setFocusedIndices('');
  }
}
</script>

<template>
  <main @click="handleMainClick($event.target)" ref="mainRef">
    <BoardBoard />
  </main>
</template>

<style scoped>
  main {
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content: center;
    padding-top: 24px;
  }
</style>
