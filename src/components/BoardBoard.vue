<script setup>
import { useBoardStore } from '@/stores/board'

import BoardRow from './BoardRow.vue'
import CharBank from './CharBank.vue'
import ColumnIndicators from './ColumnIndicators.vue'

const boardStore = useBoardStore()

const handleClick = (e) => {
  e.stopPropagation()
}
</script>

<template>
  <section @click="handleClick($event)">
    <BoardRow
      v-for="(row, i) in boardStore.board"
      :key="row.id"
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
  position: relative;
}
</style>
