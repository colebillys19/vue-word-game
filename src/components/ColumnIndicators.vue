<script setup>
import { computed } from 'vue'
import { useBoardStore } from '@/stores/board'

const boardStore = useBoardStore()

const indicatorDataArr = computed(() =>
  new Array(26).fill().map((v, i) => ({
    isVisible: boardStore.focusedIndices[1] === i,
    key: String.fromCharCode(i + 97)
  }))
)
</script>

<template>
  <div>
    <span
      v-for="data in indicatorDataArr"
      :key="data.key"
      :style="data.isVisible ? 'visibility: visible;' : 'visibility: hidden;'"
    />
  </div>
</template>

<style scoped>
div {
  left: 0;
  position: absolute;
  top: 0;
  z-index: -1;
}

span {
  background-color: rgba(248, 89, 0, 0.1);
  display: inline-block;
  height: 624px;
  width: 23px;
}

span:not(:last-of-type) {
  margin-right: 1px;
}
</style>
