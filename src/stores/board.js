import { defineStore } from 'pinia'

import getBoard from '@/helpers/getBoard'
import getColCharBanks from '@/helpers/getColCharBanks'

export const useBoardStore = defineStore('boardStore', {
  state: () => ({ board: getBoard(), colCharBanks: getColCharBanks(), focusedIndices: [-1, -1] }),
  actions: {
    setFocusedIndices(indicesStr) {
      this.focusedIndices = indicesStr
        ? indicesStr.split('-').map((numStr) => parseInt(numStr))
        : [-1, -1]
    },
    setCharBankValue(i, char, newVal) {
      const bankDup = { ...this.colCharBanks[i] };
      bankDup[char.toLowerCase()] = newVal;
      this.colCharBanks[i] = bankDup;
    }
  }
})
