<script setup>
import VirtualList from './components/VirtualListFixed.vue';
import { ref } from 'vue';

const dataList = ref(Array(10000).fill(1).map((_, index) => index))
</script>

<template>
  <div class="center">
    <VirtualList :list="dataList" :fixed-height="30.5" :limit="16" />
  </div>
</template>

<style scoped>
.center {
  height: 100%;
  display: grid;
  place-content: center;
}
</style>
