<template>
  <div class="top-table-dom">
    <TableDom
      :data="freedData"
      :columns="columns"
      :noSort="true"
      v-bind="$attrs"
    >
      <template #important="{ data }">
        <span
          class="slot-important"
          :class="{
            'imp-fast': data.value === '重要且紧急',
            'imp-slow': data.value === '重要且不紧急',
          }"
        >
          {{ data.value }}
        </span>
      </template>
      <template #status="{ data }">
        <span
          class="slot-status"
          :class="{
            'status-over':
              data.value.includes('已完成') ||
              data.value.includes('已办结') ||
              data.value.includes('强制办结'),
            'status-no':
              data.value.includes('处理中') || data.value.includes('未完成'),
          }"
        >
          {{ data.value
          }}<span
            v-if="
              data.value.includes('处理中') && setTime(data.row.planTime) > 0
            "
            >-已超期{{ setTime(data.row.planTime) }}天</span
          >
        </span>
      </template>
    </TableDom>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onUnmounted } from "vue";
import TableDom from "./TableDom.vue";
import { freedData, columns } from "../Right/config";

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});

let timer = null;
const deplayTime = 1;
const scrollSpeed = 0.1;
let scrollTop = -20;
let dom = null;
let react = null;
let isWheel = false;
function animate(deplay) {
  timer && clearInterval(timer);
  if (props.modelValue) return;
  if (!dom && !react) {
    dom = document.querySelector(".top-table-dom .t-tbody");
    react = dom.getBoundingClientRect();
  }
  // return;
  if (isWheel) {
    scrollTop = dom.scrollTop;
    isWheel = false;
  }

  timer = setInterval(() => {
    if (scrollTop >= dom.scrollHeight - react.height) {
      timer && clearInterval(timer);
      let timerout = setTimeout(() => {
        scrollTop = -10;
        animate(deplayTime);
        clearTimeout(timerout);
      }, 2000);
    } else {
      scrollTop += scrollSpeed;
      // dom.scrollTop += 1;
    }
    dom.scrollTop = scrollTop;
  }, deplay);
}
function setTime(time) {
  if (!time) return "";
  const nowTime = new Date().getTime();
  const inTime = new Date(time).getTime();

  return Math.floor((nowTime - inTime) / (1000 * 60 * 60 * 24));
}
watch(
  () => props.modelValue,
  () => {
    animate(deplayTime);
  }
);
onMounted(() => {
  animate(deplayTime);
  dom?.addEventListener("mouseenter", () => {
    timer && clearInterval(timer);
  });
  dom?.addEventListener("mouseleave", () => {
    animate(deplayTime);
  });
  dom?.addEventListener("wheel", () => {
    // timer && clearInterval(timer);
    isWheel = true;
    // scrollTop = dom.scrollTop;
    // console.log(dom.scrollTop, scrollTop, "88888");
  });
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "hidden") {
      timer && clearInterval(timer);
    } else {
      animate(deplayTime);
    }
  });
});
onUnmounted(() => {
  timer && clearInterval(timer);
  dom?.removeEventListener("mouseenter", () => {});
  dom?.removeEventListener("mouseleave", () => {});
  dom?.removeEventListener("wheel", () => {});
});
</script>

<style lang="scss" scoped>
.top-table-dom {
  // flex: 1;
  width: 100%;
  height: 100%;
  overflow: hidden;
  // margin-top: 20px;
  .slot-important {
    border-radius: 8px;
    background-color: #ccccccaf;
    color: #666;
    padding: 8px 16px;
  }
  .imp-fast {
    color: #ee6666;
    background-color: rgb(205, 198, 217);
  }
  .imp-slow {
    color: rgb(42, 166, 146);
    background-color: rgb(187, 216, 230);
  }
  .slot-status {
    border-radius: 8px;

    padding: 8px 10px;
  }
  .status-over {
    color: #fff;
    background-color: rgb(128, 159, 188);
  }
  .status-no {
    color: #fff;
    background-color: rgb(39, 202, 110);
  }
  :deep(.t-tbody) {
    font-size: 18px;
    // animation: roll 5s linear infinite alternate;
    // background-color: #ee6666;
  }
  @keyframes roll {
    0% {
      transform: translateY(0%);
    }
    100% {
      transform: translateY(-100%);
    }
  }
}
</style>
