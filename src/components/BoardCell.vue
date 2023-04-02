<script setup>
import { useBoardStore } from '@/stores/board'
import {
  EDGE_KEYDOWN_CODES,
  ERASE_KEYDOWN_CODES,
  VALID_INPUT_CHARS,
  VALID_KEYDOWN_CODES
} from '@/misc/constants'

const props = defineProps([
  'blurInputs',
  'cellX',
  'cellY',
  'colCharBanks',
  'findFocus',
  'findFocusX',
  'findFocusY',
  'modelValue',
  'navObj'
])
defineEmits(['update:modelValue'])

const boardStore = useBoardStore()

const isLastRow = props.cellY === 25
const isLastCell = props.cellX === 25

const handleClick = (e) => {
  e.stopPropagation()
}

const handleFocus = () => {
  if (boardStore.focusedX !== props.cellX || boardStore.focusedY !== props.cellY) {
    props.findFocus(props.cellX, props.cellY)
  }
}

const handleInput = (e) => {
  if (!VALID_INPUT_CHARS[e.data]) {
    e.preventDefault()
  } else {
    boardStore.setCharBankValue(props.cellX, e.data, false)
    if (props.navObj.right !== undefined) {
      props.findFocusX(props.navObj.right)
    } else {
      props.blurInputs()
    }
  }
}

const handleKeydown = (e, emitter) => {
  if (!VALID_KEYDOWN_CODES[e.code]) {
    e.preventDefault()
    return
  }
  // cases where nothing gets input but some logic should happen
  if (EDGE_KEYDOWN_CODES[e.code]) {
    e.preventDefault()
    switch (e.code) {
      case 'ArrowDown':
        if (props.navObj.down !== undefined) {
          props.findFocusY(props.navObj.down)
        }
        break
      case 'ArrowLeft':
        if (props.navObj.left !== undefined) {
          props.findFocusX(props.navObj.left)
        }
        break
      case 'ArrowRight':
        if (props.navObj.right !== undefined) {
          props.findFocusX(props.navObj.right)
        }
        break
      case 'ArrowUp':
        if (props.navObj.up !== undefined) {
          props.findFocusY(props.navObj.up)
        }
        break
      case 'Backspace': {
        if (e.shiftKey) {
          if (e.target.value) {
            // update bank and delete
            boardStore.setCharBankValue(props.cellX, e.target.value, true)
            emitter('update:modelValue', '')
            if (props.navObj.left !== undefined) {
              // shft | content | left
              props.findFocusX(props.navObj.left)
            } else {
              // shft | content | no left
              props.blurInputs()
            }
          } else {
            if (props.navObj.left !== undefined) {
              // shft | no content | left
              props.findFocusX(props.navObj.left)
            } else {
              // shft | no content | no left
              props.blurInputs()
            }
          }
        } else {
          if (e.target.value) {
            // no shift | content | left
            // no shift | content | no left
            // update bank and delete
            boardStore.setCharBankValue(props.cellX, e.target.value, true)
            emitter('update:modelValue', '')
          } else {
            if (props.navObj.left !== undefined) {
              // no shift | no content | left
              props.findFocusX(props.navObj.left)
            } else {
              // no shift | no content | no left
              props.blurInputs()
            }
          }
        }
        break
      }
      case 'Escape':
        props.blurInputs()
        break
      case 'Space':
        if (e.target.value) {
          // update bank and delete
          boardStore.setCharBankValue(props.cellX, e.target.value, true)
          emitter('update:modelValue', '')
        }
        if (props.navObj.right !== undefined) {
          props.findFocusX(props.navObj.right)
        } else {
          props.blurInputs()
        }
        break
    }
    return
  }
  // prevent shift/non-shift characters
  if (
    (e.code === 'Digit1' && !e.shiftKey) ||
    (e.code === 'Minus' && e.shiftKey) ||
    (e.code === 'Quote' && e.shiftKey) ||
    (e.code === 'Comma' && e.shiftKey) ||
    (e.code === 'Period' && e.shiftKey) ||
    (e.code === 'Slash' && !e.shiftKey)
  ) {
    e.preventDefault()
    return
  }
  // prevent input if char already used in column
  if (
    VALID_INPUT_CHARS[e.key] &&
    e.key.toLowerCase() !== e.target.value.toLowerCase() &&
    !props.colCharBanks[props.cellX][e.key.toLowerCase()]
  ) {
    e.preventDefault()
    return
  }
  // if a valid character is entered, allow new char to overwrite old one
  if (ERASE_KEYDOWN_CODES[e.code] && e.target.value) {
    // update bank and delete
    boardStore.setCharBankValue(props.cellX, e.target.value, true)
    emitter('update:modelValue', '')
  }
}
</script>

<template>
  <input
    maxlength="1"
    type="text"
    :class="{ 'last-row': isLastRow, 'last-cell': isLastCell }"
    :indices="`${cellX}-${cellY}`"
    :value="modelValue"
    @click="handleClick($event)"
    @focus="handleFocus($event)"
    @input="
      $emit('update:modelValue', $event.target.value),
      handleInput($event)
    "
    @keydown="handleKeydown($event, $emit)"
  />
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
  height: 22px;
  outline: none;
  padding: 0;
  text-align: center;
  text-shadow: 0 0 0 rgba(0, 0, 0, 1);
  width: 22px;
}

input:focus {
  background-color: white;
  border-bottom: 1px solid rgb(100, 138, 180);
  border-right: 1px solid rgb(100, 138, 180);
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
</style>
