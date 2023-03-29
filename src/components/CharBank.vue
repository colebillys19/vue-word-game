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

const activeBankComputed = computed(() => {
  if (boardStore.focusedIndices[1] > -1) {
    const activeBank = boardStore.colCharBanks[boardStore.focusedIndices[1]]
    const activeBankEntries = Object.keys(activeBank)
      .map((char) => [char, activeBank[char] ?
        'color: rgb(65, 105, 225);' : 'color: rgba(248, 89, 0, 0.3); text-decoration: line-through;'])
    let counterA = 0;
    return [2, 4, 6, 8, 6, 4, 2].map((rowCount, i) => {
      let counterB = 0;
      const rowData = [];
      while (counterB < rowCount) {
        rowData.push(activeBankEntries[counterA]);
        counterA++
        counterB++
      }
      return { data: rowData, key: String.fromCharCode(i + 97) };
    })
  }
  return [];
})
console.log(activeBankComputed)
</script>

<template>
  <div id="container">
    <div v-for="rowsData in activeBankComputed" :key="rowsData.key">
      <span v-for="lilArr in rowsData.data" :key="lilArr[0]" :style="lilArr[1]">{{ lilArr[0] }}</span>
    </div>
  </div>
</template>

<style scoped>
#container {
  align-items: center;
  background-color: white;
  color: rgb(65, 105, 225);
  display: flex;
  flex-direction: column;
  font-family: monospace;
  font-size: 16px;
  height: 170px;
  justify-content: center;
  left: 0;
  outline: 3px solid black;
  padding: 12px;
  pointer-events: none;
  position: absolute;
  top: 0;
  width: 200px;
  z-index: 2;
}

span:not(:last-of-type) {
  margin-right: 8px;
}
</style>
