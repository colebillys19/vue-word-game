<script setup>
import { useBoardStore } from '@/stores/board'
import { EDGE_KEYDOWN_CODES, ERASE_KEYDOWN_CODES, VALID_INPUT_CHARS, VALID_KEYDOWN_CODES } from '@/misc/constants'

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
  if (!VALID_INPUT_CHARS[e.data]) {
    e.preventDefault();
  } else {
    console.log(e.data);
  }
}

const handleKeydown = (e) => {
  if (!VALID_KEYDOWN_CODES[e.code]) {
    e.preventDefault();
    return;
  }
  // cases where nothing gets input but some logic should happen
  if (EDGE_KEYDOWN_CODES[e.code]) {
    e.preventDefault();
    switch (e.code) {
      case 'ArrowDown':
        // ...
        break;
      case 'ArrowLeft':
        // ...
        break;
      case 'ArrowRight':
        // ...
        break;
      case 'ArrowUp':
        // ...
        break;
      case 'Backspace':
        // ...
        break;
      case 'Space':
        // ...
        break;
}
    return;
  }
  // prevent 1 from being entered
  if (e.code === 'Digit1' && !e.shiftKey) {
    e.preventDefault();
    return;
  }
  // if a valid character is entered, allow new char to overwrite old one
  if (ERASE_KEYDOWN_CODES[e.code]) {
    e.target.value = '';
  }
  // console.log(e);
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
    @keydown="handleKeydown($event)"
  />
</template>
