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

const handleInput = (e) => {
  if (e.inputType !== 'deleteContentBackward') {
    boardStore.setLastInputIndices(props.cellIndices);
  } else {
    // stay in place
  }
}

const handleKeyDown = (e) => {
  if (![37, 38, 39, 40].includes(e.keyCode)) {
    e.target.value = '';
  }
  if (e.keyCode === 32) {
    e.preventDefault();
    boardStore.setLastInputIndices(props.cellIndices);
  }
  // how to determine if the action is actually deleting a character or not
  if (e.keyCode === 8) {
    // delete keydown logic
    console.log(e);
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
    @input="$emit('update:modelValue', $event.target.value); handleInput($event)"
    @keydown="handleKeyDown($event)"
  />
</template>
