<template>
  <div class="right-box">
    <div class="right-top" :class="{ 'right-top-colle': isColle }">
      <Tab
        v-for="i in tabsList"
        :key="i.title + i.id"
        :data="i"
        @change="changeTab"
      ></Tab>
      <!-- <div class="colle-open" @click="isColle = !isColle"></div> -->
    </div>
    <div class="table-box">
      <TableDom
        :data="tableData"
        :columns="columns"
        @sortFun="sortFun"
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
    <!-- <BaseTable :data="tableData" :columns="columns"></BaseTable> -->
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import Tab from "./Tab.vue";
import TableDom from "../components/TableDom.vue";
import { tableData, columns, freedData } from "./config";
import { cloneDeep } from "lodash-es";

const props = defineProps({
  filter: {
    type: Array,
    default: () => {
      return [
        {
          key: "important",
          value: "全部",
        },
        {
          key: "workImp",
          value: "全部",
        },
        {
          key: "unit",
          value: "全部",
        },
        {
          key: "status",
          value: "全部",
        },
      ];
    },
  },
  filterKey: {
    type: String,
    default: "",
  },
});
const emits = defineEmits(["change", "update:filterKey"]);

tableData.value = [...freedData];

const isColle = ref(false);

const tabsList = ref([
  {
    id: 1,
    title: "任务层级",
    active: 1,
    key: "workImp",
    list: [
      {
        id: 1,
        label: "全部",
        value: 0,
      },
      {
        id: 2,
        label: "总行/监管",
        value: 1,
      },
      {
        id: 3,
        label: "分行部门",
        value: 2,
      },
      {
        id: 4,
        label: "金融科技部",
        value: 3,
      },
      {
        id: 5,
        label: "各二级行",
        value: 4,
      },
      {
        id: 6,
        label: "分行行领导",
        value: 5,
      },
      {
        id: 7,
        label: "各科室",
        value: 6,
      },
    ],
  },
  {
    id: 2,
    title: "牵头责任科室",
    active: 1,
    key: "unit",
    list: [
      {
        id: 1,
        label: "全部",
        value: 0,
      },
      {
        id: 2,
        label: "信息统计科",
        value: 1,
      },
      {
        id: 3,
        label: "金融科技部",
        value: 2,
      },
      // {
      //   id: 4,
      //   label: "广西区分行",
      //   value: 3,
      // },
      {
        id: 5,
        label: "需求统筹科",
        value: 4,
      },
      {
        id: 6,
        label: "网络管理科",
        value: 5,
      },
      {
        id: 7,
        label: "安全合规科",
        value: 6,
      },
      {
        id: 8,
        label: "应用开发科",
        value: 7,
      },
      {
        id: 9,
        label: "系统运行科",
        value: 8,
      },
    ],
  },
  {
    id: 3,
    title: "完成状态",
    active: 1,
    key: "status",
    list: [
      {
        id: 1,
        label: "全部",
        value: 0,
      },
      {
        id: 2,
        label: "已完成",
        value: 1,
      },
      {
        id: 3,
        label: "处理中",
        value: 2,
      },
      {
        id: 4,
        label: "已办结",
        value: 3,
      },
      {
        id: 5,
        label: "强制办结",
        value: 4,
      },
    ],
  },
]);

// const freedData = cloneDeep(tableData.value);

let filterNavKey = "";
let filterLabel = "";
// const tableData = tableData;
// const tableData = ref([...freedData]);

const changeTab = (data, tabData) => {
  tabData.active = data.id;
  filterLabel = data.label;
  filterNavKey = tabData.key;
  if (data.label !== "全部") {
    emits("update:filterKey", tabData.key);
  } else {
    emits("update:filterKey", "");
  }
  emits("change", data, tabData);
};

const sortFun = ({ prop, type }) => {
  filterArrFun(props.filter);

  if (type === null) {
    // tableData.value = [...freedData];
  } else if (type === "ascending") {
    tableData.value = tableData.value.sort((a, b) => {
      if (prop === "planTime") {
        return new Date(a[prop]).getTime() - new Date(b[prop]).getTime();
      } else {
        return Number(a[prop]) - Number(b[prop]);
      }
    });
  } else if (type === "descending") {
    tableData.value = tableData.value.sort((a, b) => {
      if (prop === "planTime") {
        return new Date(b[prop]).getTime() - new Date(a[prop]).getTime();
      } else {
        return Number(b[prop]) - Number(a[prop]);
      }
    });
  }
};

function isDate(time) {
  return isNaN(time) && !isNaN(Date.parse(time));
}

let timer = null;
let scrollTop = 0;
function animate(deplay) {
  timer && clearInterval(timer);
  const dom = document.querySelector(".t-tbody");
  const react = dom.getBoundingClientRect();

  dom.scrollTop = scrollTop;
  timer = setInterval(() => {
    if (dom.scrollTop >= dom.scrollHeight - react.height) {
      timer && clearInterval(timer);
      let timerout = setTimeout(() => {
        scrollTop = 0;
        animate(20);
        clearTimeout(timerout);
      }, 2000);
    } else {
      scrollTop += 1;
      // dom.scrollTop += 1;
    }
    dom.scrollTop = scrollTop;
  }, deplay);
}
tabListSum();
function tabListSum() {
  tabsList.value.forEach((i) => {
    // if (i.key !== props.filterKey) {
    // if (i.key !== filterNavKey) {
    i.list.forEach((i) => (i.num = 0));
    // }
  });
  (freedData || []).forEach((i) => {
    tabsList.value.forEach((tab) => {
      // if (tab.key !== props.filterKey) {
      // if (tab.key !== filterNavKey) {
      const item = tab.list.find((b) => b.label.includes(i[tab.key]));
      if (item) {
        tab.list[0].num = tab.list[0].num ? tab.list[0].num + 1 : 1;
        item.num = item.num ? item.num + 1 : 1;
      }
      // }
    });
  });
}

function setTime(time) {
  if (!time) return "";
  const nowTime = new Date().getTime();
  const inTime = new Date(time).getTime();

  return Math.floor((nowTime - inTime) / (1000 * 60 * 60 * 24));
}

onMounted(() => {
  // animate(20);
});

function filterArrFun(data) {
  tableData.value = [...freedData];
  data.forEach((i) => {
    tableData.value = tableData.value.filter((item) => {
      if (i.value === "全部") return true;
      else return item[i.key] === i.value;
    });
  });
}

watch(
  () => props.filter,
  (val) => {
    val.forEach((b) => {
      const bItem = tabsList.value.find((i) => i.key === b.key);
      if (bItem) {
        const findItem = bItem.list.find((k) => k.label === b.value);
        bItem.active = findItem.id;
      }
    });
    filterArrFun(val);
  },
  {
    immediate: true,
    deep: true,
  }
);
watch(
  () => tableData.value,
  (val) => {
    // tabListSum();
  }
);
</script>

<style lang="scss" scoped>
.right-box {
  flex: 1;
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  // padding: 16px 0;
  .right-top {
    position: relative;
    display: grid;
    grid-template-columns: 98%;
    // grid-template-rows: 300px 300px 300px;
    grid-auto-flow: row;
    // display: flex;

    grid-gap: 10px;
    // grid-columns-gap: 50px;
    justify-content: space-between;
    flex-wrap: wrap;
    height: 160px;
    // background-color: #666;
    padding-bottom: 12px;
    transition: all 0.5s;
    .colle-open {
      position: absolute;
      bottom: -6px;
      left: 50%;
      width: 30px;
      height: 20px;
      transform: translateX(-50%) rotateX(180deg);
      background: url(../images/colle.png) no-repeat;
      background-size: 100% 100%;
      cursor: pointer;
    }
  }
  .right-top-colle {
    height: 50px;
    padding-bottom: 16px;
    overflow: hidden;
    transition: all 0.5s;
    // background-color: #666;
    .colle-open {
      bottom: -4px;
      transform: translateX(-50%) rotateX(0deg);
    }
  }
  .table-box {
    flex: 1;
    overflow: hidden;
    margin-top: 20px;
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
      white-space: nowrap;
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
}
</style>
