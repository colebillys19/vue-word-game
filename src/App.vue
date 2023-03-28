<script setup>
import { ref } from 'vue'

import { useBoardStore } from './stores/board'
import BoardBoard from './components/BoardBoard.vue'

const boardStore = useBoardStore()
const mainRef = ref(null)

boardStore.$subscribe((mutation) => {
  const {
    events: { key, newValue, oldValue }
  } = mutation
  if (key === 'focusedIndices') {
    if (newValue[0] > -1) {
      const targetCellInput = mainRef.value.querySelector(
        `[indices="${[newValue[0], newValue[1]].join('-')}"]`
      )
      targetCellInput.focus()
    } else if (oldValue[0] > -1) {
      const targetCellInput = mainRef.value.querySelector(
        `[indices="${[oldValue[0], oldValue[1]].join('-')}"]`
      )
      targetCellInput.blur()
    }
  }
})

const handleMainClick = (target) => {
  if (target.tagName !== 'INPUT') {
    boardStore.setFocusedIndices('')
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
  display: flex;
  height: 100vh;
  justify-content: center;
  padding-top: 24px;
  width: 100vw;
}
</style>
