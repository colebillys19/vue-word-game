<script setup>
import BoardCell from './BoardCell.vue'

defineProps(['rowData'])
</script>

<template>
  <div>
    <BoardCell
      v-for="cellData in rowData"
      :key="cellData.id"
      v-model="cellData.val"
      :cell-indices="cellData.indices"
    />
  </div>
</template>
