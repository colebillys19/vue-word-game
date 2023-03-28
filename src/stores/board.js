import { defineStore } from 'pinia'

import getBoard from '@/helpers/getBoard'

export const useBoardStore = defineStore('boardStore', {
  state: () => ({ board: getBoard(), focusedIndices: [-1, -1] }),
  actions: {
    setFocusedIndices(indicesStr) {
      this.focusedIndices = indicesStr
        ? indicesStr.split('-').map((numStr) => parseInt(numStr))
        : [-1, -1]
    }
  }
})
