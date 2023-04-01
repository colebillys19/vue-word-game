<script setup>
import { ref } from 'vue'
// import { useBoardStore } from '@/stores/board'
import BoardCell from './BoardCell.vue'

// const boardStore = useBoardStore()
const rowRef = ref(null)

defineProps(['colCharBanks', 'rowData', 'rowIndex'])

// boardStore.$subscribe((mutation) => {
//   const {
//     events: { key, newValue }
//   } = mutation
//   if (key === 'focusedX' && boardStore.focusedY === props.rowIndex) {
//     if (newValue > -1) {
//       const targetCellInput = rowRef.value.querySelector(
//         `[indices="${newValue}-${boardStore.focusedY}"]`
//       )
//       targetCellInput.focus()
//     }
//   }
// })

const handleClick = (e) => {
  e.stopPropagation()
}
</script>

<template>
  <div @click="handleClick($event)" ref="rowRef">
    <BoardCell
      v-for="cellData in rowData"
      :key="cellData.id"
      v-model="cellData.val"
      :cell-x="cellData.x"
      :cell-y="cellData.y"
      :col-char-banks="colCharBanks"
      :nav-obj="cellData.navObj"
    />
  </div>
</template>
