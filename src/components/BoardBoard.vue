<script setup>
import { useBoardStore } from '@/stores/board'

import BoardRow from './BoardRow.vue'

const boardStore = useBoardStore()
</script>

<template>
  <section>
    <BoardRow v-for="row in boardStore.board" :key="row.id" :row-data="row.data" />
  </section>
</template>

<style scoped>
section {
  display: inline-block;
}
</style>
