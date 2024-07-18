<script setup>
import { computed, ref } from "vue";
const props = defineProps(["list", "limit", "fixedHeight"]);

const startIndex = ref(0);

const displayedList = computed(() =>
  props.list.slice(startIndex.value, startIndex.value + props.limit)
);
const totalHeight = computed(() => props.list.length * props.fixedHeight);

function handleScroll(e) {
  console.log("scroll...", e.target.scrollTop); // 滚动了多少个像素
  const scrollTop = e.target.scrollTop;
  startIndex.value = ~~(scrollTop / props.fixedHeight);
}
</script>

<template>
  <h1>{{ limit }} - {{ fixedHeight }} - {{ startIndex }}</h1>
  <div class="virtual-list-fixed" @scroll="handleScroll">
    <div
      class="layout"
      :style="{
        height: totalHeight + 'px',
      }"
    ></div>
    <div class="list-container" :style="{ transform: `translateY(${startIndex * fixedHeight}px)`}">
      <div class="list-item" v-for="item in displayedList" :key="item">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<style scoped>
.virtual-list-fixed {
  height: 480px;
  width: 320px;
  border: 1px solid #777;
  overflow-y: auto;
  position: relative;
}

.layout {
}

.list-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.list-item {
  background: skyblue;
  margin-bottom: 8px;
  text-align: center;
}
</style>
