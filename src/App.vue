<script setup>
import { ref } from 'vue'

import { useBoardStore } from './stores/board'
import BoardBoard from './components/BoardBoard.vue'

const boardStore = useBoardStore()
const mainRef = ref(null)

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
