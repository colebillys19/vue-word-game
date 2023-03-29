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

const isVisible = computed(() => boardStore.focusedIndices[0] > -1)
const isFocusedRight = computed(() => boardStore.focusedIndices[1] > 12)
</script>

<template>
  <div class="container" :id="isVisible ? 'isVisible' : 'isHidden'" :style="isFocusedRight ? 'left: -48px;' : 'right: -48px;'">
    <div v-for="rowsData in activeBankComputed" :key="rowsData.key">
      <span v-for="lilArr in rowsData.data" :key="lilArr[0]" :style="lilArr[1]">{{ lilArr[0] }}</span>
    </div>
  </div>
</template>

<style scoped>
span:not(:last-of-type) {
  margin-right: 8px;
}

#isVisible {
  display: flex;
}

.container {
  align-items: center;
  background-color: white;
  color: rgb(65, 105, 225);
  display: none;
  flex-direction: column;
  font-family: monospace;
  font-size: 16px;
  height: 170px;
  justify-content: center;
  outline: 3px solid black;
  padding: 12px;
  pointer-events: none;
  position: absolute;
  top: 48px;
  width: 200px;
  z-index: 2;
}
</style>
