<script setup>
import { computed, ref } from "vue";
import { throttle } from "../utils/debounce";
const props = defineProps(["list", "limit", "fixedHeight"]);

const startIndex = ref(0);
const scrollTop = ref(0);

const displayedList = computed(() =>
  props.list.slice(startIndex.value, startIndex.value + props.limit)
);
const totalHeight = computed(() => props.list.length * props.fixedHeight);

function handleScroll(e) {
  scrollTop.value = e.target.scrollTop;
  startIndex.value = ~~(e.target.scrollTop / props.fixedHeight);
}

const scrollHandler = throttle(handleScroll)
</script>

<template>
  <h1>{{ limit }} - {{ fixedHeight }} - {{ startIndex }}</h1>
  <div class="virtual-list-fixed" @scroll="scrollHandler">
    <div
      class="layout"
      :style="{
        height: totalHeight + 'px',
      }"
    ></div>
    <div
      class="list-container"
      :style="{ transform: `translateY(${scrollTop}px)` }"
    >
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
