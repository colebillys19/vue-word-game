<script setup>
import { useBoardStore } from '@/stores/board'

const props = defineProps(['cellIndices', 'modelValue'])
defineEmits(['update:modelValue'])

const boardStore = useBoardStore();

const isLastRow = props.cellIndices.includes('25-')
const isLastInRow = props.cellIndices.includes('-25')
const borderStyles = `${isLastRow ? 'border-bottom: none;' : ''} ${
  isLastInRow ? 'border-right: none;' : ''
}`

const handleFocus = () => {
  if ([...boardStore.focusedIndices].join('-') !== props.cellIndices) {
    boardStore.setFocusedIndices(props.cellIndices);
  }
}

</script>

<template>
  <input
    maxlength="1"
    type="text"
    :indices="cellIndices"
    :style="borderStyles"
    :value="modelValue"
    @focus="handleFocus()"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
