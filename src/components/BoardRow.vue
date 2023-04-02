<script setup>
import { ref } from 'vue'
import BoardCell from './BoardCell.vue'

const rowRef = ref(null)

defineProps([
  'blurInputs',
  'colCharBanks',
  'findFocus',
  'findFocusX',
  'findFocusY',
  'rowData',
  'rowIndex'
])

const handleClick = (e) => {
  e.stopPropagation()
}
</script>

<template>
  <div @click="handleClick($event)" ref="rowRef">
    <BoardCell
      v-for="cellData in rowData"
      v-model="cellData.val"
      :key="cellData.id"
      :blurInputs="blurInputs"
      :cell-x="cellData.x"
      :cell-y="cellData.y"
      :col-char-banks="colCharBanks"
      :findFocus="findFocus"
      :findFocusX="findFocusX"
      :findFocusY="findFocusY"
      :nav-obj="cellData.navObj"
    />
  </div>
</template>
