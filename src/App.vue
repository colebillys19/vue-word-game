<script setup>
import { ref } from 'vue'
import { useBoardStore } from './stores/board'
import BoardBoard from './components/BoardBoard.vue'

const boardStore = useBoardStore()
const mainRef = ref(null)

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
    <div>
      <p>
        score: <span>{{ boardStore.score }}</span>
      </p>
      <button @click="boardStore.updateScore()">update score</button>
      <button @click="boardStore.$reset()">clear</button>
    </div>
  </main>
</template>

<style scoped>
button {
  background-color: rgba(100, 138, 180, 0.3);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 16px;
  letter-spacing: 1px;
  padding: 6px 12px;
}

button:first-of-type {
  margin-right: 48px;
}

button:active {
  background-color: white;
}

div {
  align-items: center;
  display: flex;
}

main {
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 24px;
  width: 100vw;
}

p {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 16px;
  margin-right: 48px;
}

span {
  font-family: monospace;
  font-size: 24px;
}
</style>
