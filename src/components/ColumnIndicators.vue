<script setup>
// import { useBoardStore } from '@/stores/board'
// const boardStore = useBoardStore()
</script>

<template>
  <div>
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
    <span />
  </div>
</template>

<style scoped>
div {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
}

span {
  height: 624px;
  width: 23px;
  display: inline-block;
}

span:not(:last-of-type) {
  margin-right: 1px;
}

span:nth-of-type(odd) {
  background-color: pink;
}
</style>
