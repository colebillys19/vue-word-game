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
  if (key === 'focusedX') {
    if (newValue > -1) {
      const targetCellInput = mainRef.value.querySelector(
        `[indices="${newValue}-${boardStore.focusedY}"]`
      )
      targetCellInput.focus()
    }
  }
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
    <button @click="boardStore.$reset()">clear</button>
  </main>
</template>

<style scoped>
main {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding-top: 24px;
  width: 100vw;
}

button {
  background-color: rgba(100, 138, 180, 0.3);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  letter-spacing: 1px;
  padding: 6px 12px;
}

button:active {
  background-color: white;
}
</style>
