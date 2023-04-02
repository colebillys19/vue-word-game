<script setup>
import { ref } from 'vue'
import { useBoardStore } from '@/stores/board'

import BoardRow from './BoardRow.vue'
import CharBank from './CharBank.vue'
import ColumnIndicators from './ColumnIndicators.vue'

const boardStore = useBoardStore()
const sectionRef = ref(null)

const blurInputs = () => {
  document.activeElement.blur()
  boardStore.setFocusedX(-1)
  boardStore.setFocusedY(-1)
}

const findFocus = (x, y) => {
  if (x > -1 && y > -1) {
    const targetCellInput = sectionRef.value.querySelector(`input[indices="${x}-${y}"]`)
    targetCellInput.focus()
    boardStore.setFocusedX(x)
    boardStore.setFocusedY(y)
  }
}

const findFocusX = (x) => {
  if (x > -1) {
    const targetCellInput = sectionRef.value.querySelector(
      `input[indices="${x}-${boardStore.focusedY}"]`
    )
    targetCellInput.focus()
    boardStore.setFocusedX(x)
  }
}

const findFocusY = (y) => {
  if (y > -1) {
    const targetCellInput = sectionRef.value.querySelector(
      `[indices="${boardStore.focusedX}-${y}"]`
    )
    targetCellInput.focus()
    boardStore.setFocusedY(y)
  }
}
</script>

<template>
  <section ref="sectionRef">
    <BoardRow
      v-for="(row, i) in boardStore.board"
      :key="row.id"
      :blurInputs="blurInputs"
      :findFocus="findFocus"
      :findFocusX="findFocusX"
      :findFocusY="findFocusY"
      :row-data="row.data"
      :row-index="i"
      :col-char-banks="boardStore.colCharBanks"
    />
    <CharBank />
    <ColumnIndicators />
  </section>
</template>

<style scoped>
section {
  display: inline-block;
  margin-bottom: 24px;
  position: relative;
}
</style>
