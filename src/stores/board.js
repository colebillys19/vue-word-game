import { defineStore } from 'pinia'

import getBoard from '@/helpers/getBoard'
import getColCharBanks from '@/helpers/getColCharBanks'

export const useBoardStore = defineStore('boardStore', {
  state: () => ({
    board: getBoard(),
    colCharBanks: getColCharBanks(),
    focusedX: -1,
    focusedY: -1
  }),
  actions: {
    setFocusedX(x) {
      this.focusedX = x
    },
    setFocusedY(y) {
      this.focusedY = y
    },
    setCharBankValue(i, char, newVal) {
      const bankDup = { ...this.colCharBanks[i] }
      bankDup[char.toLowerCase()] = newVal
      this.colCharBanks[i] = bankDup
    }
  }
})
