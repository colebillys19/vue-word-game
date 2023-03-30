<script setup>
import BoardCell from './BoardCell.vue'

defineProps(['colCharBanks', 'rowData'])
</script>

<template>
  <div>
    <BoardCell
      v-for="cellData in rowData"
      :key="cellData.id"
      v-model="cellData.val"
      :cell-indices="cellData.indices"
      :col-char-banks="colCharBanks"
      :nav-obj="cellData.navObj"
    />
  </div>
</template>
