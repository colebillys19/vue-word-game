<script setup>
import { useBoardStore } from '@/stores/board'
import {
  EDGE_KEYDOWN_CODES,
  ERASE_KEYDOWN_CODES,
  VALID_INPUT_CHARS,
  VALID_KEYDOWN_CODES
} from '@/misc/constants'

const props = defineProps(['cellIndices', 'colCharBanks', 'modelValue', 'navObj'])
defineEmits(['update:modelValue'])

const boardStore = useBoardStore()

const isLastRow = props.cellIndices.includes('25-')
const isLastCell = props.cellIndices.includes('-25')

const handleFocus = () => {
  if ([...boardStore.focusedIndices].join('-') !== props.cellIndices) {
    boardStore.setFocusedIndices(props.cellIndices)
  }
}

const handleInput = (e) => {
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
  // prevent input if char already used in column
  if (!props.colCharBanks[parseInt(props.cellIndices.split('-')[1])][e.key.toLowerCase()]) {
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
      :class="{ 'last-row':isLastRow, 'last-cell': isLastCell }"
      :indices="cellIndices"
      :value="modelValue"
      @focus="handleFocus()"
      @input="$emit('update:modelValue', $event.target.value); handleInput($event)"
      @keydown="handleKeydown($event)"
    />
    <span />
  </span>
</template>

<style scoped>
input {
  background-color: transparent;
  border-bottom: 1px solid rgba(100, 138, 180, 0.3);
  border-left: none;
  border-radius: 0;
  border-right: 1px solid rgba(100, 138, 180, 0.3);
  border-top: none;
  color: transparent;
  cursor: default;
  font-family: monospace;
  font-size: 16px;
  height: 24px;
  outline: none;
  padding: 0;
  text-align: center;
  text-shadow: 0 0 0 rgba(0, 0, 0, 1);
  width: 24px;
}

input:focus + span {
  border: 2px solid rgba(0, 0, 0, 1) !important;
  height: 25px;
  left: -1px;
  pointer-events: none;
  position: absolute;
  top: -4px;
  width: 25px;
  z-index: 1;
}

#anchor {
  position: relative;
}

.last-row {
  border-bottom: none;
}

.last-cell {
  border-right: none;
}

/* input:hover:not(:focus) {
  background-color: rgba(248, 89, 0, 0.3);
} */

/* .no-focus:hover:not(:focus) {
  background-color: rgba(248, 89, 0, 0.3);
} */
</style>
