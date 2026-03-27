<template>
  <div class="tabs-contrain">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane
        :label="item.targetName"
        :name="item.targetName"
        v-for="(item, index) in newData"
        :key="item.targetName"
      >
        <!-- {{ item }} -->
        <div class="item-one" v-for="one in culonm" :key="one.label">
          <div class="one-label">{{ one.label }}</div>
          <div class="data-deteils-item">
            <EditInput
              :label="inp.label"
              v-model="item['typeList'][0][inp.key]"
              v-for="inp in one.list"
              :key="inp.key"
              :disabled="disabled"
            ></EditInput>
          </div>
        </div>
        <template v-if="item.children">
          <DeteilsItem
            :disabled="disabled"
            v-model="item.children"
          ></DeteilsItem>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup name="DeteilsItem">
import { cloneDeep } from "lodash-es";
import { ref, reactive } from "vue";

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
  },
});

const newData = ref([]);

const activeName = ref("");

const culonm = [
  {
    label: "当前值",
    list: [
      {
        label: "金额",
        key: "nowBalance",
      },
      {
        label: "四行排名",
        key: "nowRanking",
      },
      {
        label: "系统内排名",
        key: "nowSystemRanking",
      },
    ],
  },
  {
    label: "新增额",
    list: [
      {
        label: "金额",
        key: "yearBalance",
      },
      {
        label: "四行排名",
        key: "yearRanking",
      },
      {
        label: "系统内排名",
        key: "yearSystemRanking",
      },
    ],
  },
  {
    label: "增长率",
    list: [
      {
        label: "增长率",
        key: "growthRate",
      },
      {
        label: "四行排名",
        key: "growthRateRanking",
      },
      {
        label: "系统内排名",
        key: "growthRateSystemRanking",
      },
    ],
  },
];

watch(
  () => props.modelValue,
  (val) => {
    console.log(val);

    activeName.value = activeName.value ? activeName.value : val[0]?.targetName;
    newData.value = cloneDeep(val);
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.tabs-contrain {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.data-deteils-item {
  width: 100%;
  display: grid;
  justify-content: space-around;
  grid-template-columns: 30% 30% 30%;
}

:deep(.el-tabs) {
  height: 100%;
  // padding-bottom: 20px;
  // overflow: auto;
  .el-tabs__content {
    height: 98%;
    // padding-bottom: 20px;
    overflow: auto !important;
  }
}

:deep(.el-tabs__nav-wrap) {
  // padding-bottom: 10px;
  .el-tabs__item {
    padding-bottom: 20px;
  }
}
:deep(.el-tabs__item) {
  font-size: 30px;
  padding: 10px;
}

.item-one {
  margin: 20px 0;
  height: 100%;
  // background-color: #000;
  // overflow: auto;
  .one-label {
    padding-left: 10px;
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 10px;
  }
}
</style>
