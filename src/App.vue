<script setup>
import { ref } from 'vue'
import { useBoardStore } from './stores/board'
import BoardBoard from './components/BoardBoard.vue'

const boardStore = useBoardStore()
const mainRef = ref(null)

boardStore.$subscribe((mutation) => {
  const {
    events: { key, newValue }
  } = mutation
  if (key === 'focusedY') {
    if (newValue > -1) {
      const targetCellInput = mainRef.value.querySelector(
        `[indices="${boardStore.focusedX}-${newValue}"]`
      )
      targetCellInput.focus()
    }
  }
})

const handleMainClick = (target) => {
  if (target.tagName !== 'INPUT' && boardStore.focusedX > -1) {
    boardStore.setFocusedX(-1)
    boardStore.setFocusedY(-1)
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
