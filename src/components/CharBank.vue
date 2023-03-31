<script setup>
import { computed } from 'vue'
import { useBoardStore } from '@/stores/board'

const boardStore = useBoardStore()

const activeBankComputed = computed(() => {
  if (boardStore.focusedX > -1) {
    const activeBank = boardStore.colCharBanks[boardStore.focusedX]
    const activeBankEntries = Object.keys(activeBank)
      .map((char) => [char, activeBank[char] ?
        'color: rgb(0, 0, 0);' : 'color: rgba(100, 138, 180, 0.1);'])
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

const isVisible = computed(() => boardStore.focusedY > -1)
const isFocusedRight = computed(() => boardStore.focusedX > 12)
</script>

<template>
  <div class="container" :id="isVisible ? 'isVisible' : 'isHidden'" :style="isFocusedRight ? 'left: -96px;' : 'right: -96px;'">
    <h1>{{ `Column ${boardStore.focusedX + 1}` }}</h1>
    <div v-for="rowsData in activeBankComputed" :key="rowsData.key">
      <span v-for="lilArr in rowsData.data" :key="lilArr[0]" :style="lilArr[1]">{{ lilArr[0] }}</span>
    </div>
  </div>
</template>

<style scoped>
h1 {
  color: rgb(100, 138, 180);
  font-family: Verdana, Geneva, Tahoma, sans-serif;
  font-size: 16px;
  margin: 0 0 10px 0;
}

span {
  font-family: monospace;
}

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
  font-size: 16px;
  height: 200px;
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
