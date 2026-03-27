<template>
  <div class="nav-content-left-box">
    <div class="nav-content-left-auto">
      <div class="nav-content-left">
        <div
          class="left-nav"
          :class="[tabActive === i.label ? 'tab-active' : '']"
          v-for="(i, index) in data"
          :key="i.label || index"
          @click="change(i)"
        >
          <!-- <div class="tab-active-i">{{ i.label }}</div> -->
          {{ i.label }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
});
const emits = defineEmits(["tabChange"]);
const tabActive = ref("");

const change = (data) => {
  tabActive.value = data.label;
  emits("tabChange", data);
};

watchEffect(() => {
  tabActive.value = props.data[0]?.label || "";
});
</script>

<style lang="scss" scoped>
.nav-content-left-box {
  width: 260px;
  height: 100%;
  margin-right: 10px;
  overflow: hidden;
  border-radius: var(--border-radius-num);
  .nav-content-left-auto {
    height: 100%;
    // padding: 10px 0;
    // padding-bottom: 0;
    overflow-y: auto;

    border-radius: var(--border-radius-num);
  }
}
.nav-content-left {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 200px;
  height: 100%;
  // height: auto;
  padding: 20px 0 20px 8px;
  background-color: rgb(216, 229, 246);
  border-radius: var(--el-border-radius-base);
  // overflow: auto;
  // overflow-y: auto;
  .left-nav {
    position: relative;
    width: 100%;
    font-size: 18px;
    padding: 20px 0;
    margin-top: 10px;
    text-align: center;
    border-radius: var(--el-border-radius-base);
    cursor: pointer;
  }
  .tab-active {
    margin-left: 30px;
    // transform: translateX(40px);
    background-color: rgb(120, 187, 255);
    transition-duration: 0.5s;
  }
  .tab-active-i {
    position: absolute;
    top: 0;
    left: 30px;
    width: 100%;
    font-size: 18px;
    padding: 20px 0;
    text-align: center;
    border-radius: var(--el-border-radius-base);
    background-color: rgb(120, 187, 255);
  }
}
</style>
