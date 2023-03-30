<script setup>
import { useBoardStore } from '@/stores/board'

import BoardRow from './BoardRow.vue'
import CharBank from './CharBank.vue'
import ColumnIndicators from './ColumnIndicators.vue'

const boardStore = useBoardStore()
</script>

<template>
  <section>
    <BoardRow v-for="row in boardStore.board" :key="row.id" :row-data="row.data" />
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
