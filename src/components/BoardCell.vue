<script setup>
import { useBoardStore } from '@/stores/board'
import {
  EDGE_KEYDOWN_CODES,
  ERASE_KEYDOWN_CODES,
  VALID_INPUT_CHARS,
  VALID_KEYDOWN_CODES
} from '@/misc/constants'

const props = defineProps(['cellIndices', 'modelValue', 'navObj'])
defineEmits(['update:modelValue'])

const boardStore = useBoardStore()

const isLastRow = props.cellIndices.includes('25-')
const isLastInRow = props.cellIndices.includes('-25')
// col color logic?
const borderStyles = `${isLastRow ? 'border-bottom: none;' : ''} ${
  isLastInRow ? 'border-right: none;' : ''
}`

const handleFocus = () => {
  if ([...boardStore.focusedIndices].join('-') !== props.cellIndices) {
    boardStore.setFocusedIndices(props.cellIndices)
  }
}

const handleInput = (e) => {
  // ???
  // !boardStore.colCharBanks[parseInt(props.cellIndices.split('-')[1])][e.data.toLowerCase()]
  if (!VALID_INPUT_CHARS[e.data]) {
    e.preventDefault()
  } else {
    // TODO: if valid input && true in bank
    boardStore.setCharBankValue(parseInt(props.cellIndices.split('-')[1]), e.data, false);
    if (props.navObj.right) {
      boardStore.setFocusedIndices(props.navObj.right)
    } else {
      boardStore.setFocusedIndices('')
    }
  }
}

const handleKeydown = (e) => {
  if (!VALID_KEYDOWN_CODES[e.code]) {
    e.preventDefault()
    return
  }
  // cases where nothing gets input but some logic should happen
  if (EDGE_KEYDOWN_CODES[e.code]) {
    e.preventDefault()
    switch (e.code) {
      case 'ArrowDown':
        if (props.navObj.down) {
          boardStore.setFocusedIndices(props.navObj.down)
        }
        break
      case 'ArrowLeft':
        if (props.navObj.left) {
          boardStore.setFocusedIndices(props.navObj.left)
        }
        break
      case 'ArrowRight':
        if (props.navObj.right) {
          boardStore.setFocusedIndices(props.navObj.right)
        }
        break
      case 'ArrowUp':
        if (props.navObj.up) {
          boardStore.setFocusedIndices(props.navObj.up)
        }
        break
      case 'Backspace': {
        if (e.shiftKey) {
          if (e.target.value) {
            // update bank and delete
            boardStore.setCharBankValue(parseInt(props.cellIndices.split('-')[1]), e.target.value, true)
            e.target.value = ''
            if (props.navObj.left) {
              // shft | content | left
              boardStore.setFocusedIndices(props.navObj.left)
            } else {
              // shft | content | no left
              boardStore.setFocusedIndices('')
            }
          } else {
            if (props.navObj.left) {
              // shft | no content | left
              boardStore.setFocusedIndices(props.navObj.left)
            } else {
              // shft | no content | no left
              boardStore.setFocusedIndices('')
            }
          }
        } else {
          if (e.target.value) {
            // no shift | content | left
            // no shift | content | no left
            // update bank and delete
            boardStore.setCharBankValue(parseInt(props.cellIndices.split('-')[1]), e.target.value, true)
            e.target.value = ''
          } else {
            if (props.navObj.left) {
              // no shift | no content | left
              boardStore.setFocusedIndices(props.navObj.left)
            } else {
              // no shift | no content | no left
              boardStore.setFocusedIndices('')
            }
          }
        }
        break
      }
      case 'Escape':
        boardStore.setFocusedIndices('')
        break
      case 'Space':
        if (e.target.value) {
          // update bank and delete
          boardStore.setCharBankValue(parseInt(props.cellIndices.split('-')[1]), e.target.value, true)
          e.target.value = ''
        }
        if (props.navObj.right) {
          boardStore.setFocusedIndices(props.navObj.right)
        } else {
          boardStore.setFocusedIndices('')
        }
        break
    }
    return
  }
  // prevent 1 from being entered
  if (e.code === 'Digit1' && !e.shiftKey) {
    e.preventDefault()
    return
  }
  // if a valid character is entered, allow new char to overwrite old one
  if (ERASE_KEYDOWN_CODES[e.code] && e.target.value) {
    // update bank and delete
    boardStore.setCharBankValue(parseInt(props.cellIndices.split('-')[1]), e.target.value, true)
    e.target.value = ''
  }
}
</script>

<template>
  <span id="anchor">
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
    <span />
  </span>
</template>
