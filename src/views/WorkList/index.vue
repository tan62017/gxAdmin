<template>
  <div class="work-list-contrain">
    <div class="button-ab">
      <CloseDom class="close-dom-but"></CloseDom>
      <el-button class="play" type="primary" size="large" plain @click="play"
        >{{ showType === "but" ? "播放" : "暂停" }}
      </el-button>
    </div>
    <div class="title">广西分行金融科技部重点工作推进细项表-202411</div>
    <div class="but" v-if="showType === 'but'">
      <Left :data="leftData" :active="leftActive" @change="leftChange"></Left>
      <keep-alive>
        <Right
          @rowClick="rowClick"
          @change="rightChangeTab"
          :filter="filterArr"
          v-model:filterKey="rightTabKey"
        ></Right>
      </keep-alive>
    </div>
    <div class="top-dialog" v-else-if="showType === 'topDialog'">
      <TopTableDom v-model="dialogShow" @rowClick="rowClick"></TopTableDom>
    </div>
  </div>
  <DialogDom
    :data="dialogData"
    v-model="dialogShow"
    v-if="dialogShow"
  ></DialogDom>
</template>

<script setup>
import { ref, reactive, onMounted, watch } from "vue";
import CloseDom from "./components/ClosedHtml.vue";
import Left from "./Left/index.vue";
import Right from "./Right/index.vue";
import TopTableDom from "./components/TopTableDom.vue";
import DialogDom from "./components/Dialog.vue";
import { freedData } from "./Right/config";

const dialogShow = ref(false);
const showType = ref("but");

const filterArr = ref([
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
]);

const leftActive = ref(1);
let leftTabKey = "";
let rightTabKey = ref("");

const leftData = ref([
  {
    id: 1,
    label: "全部",
    value: 0,
  },
  {
    id: 2,
    label: "重要且紧急",
    value: 1,
  },
  {
    id: 3,
    label: "重要且不紧急",
    value: 2,
  },
  {
    id: 4,
    label: "一般且紧急",
    value: 3,
  },
  {
    id: 5,
    label: "一般且不紧急",
    value: 4,
  },
]);
const rightChangeTab = (item, data) => {
  leftTabKey = "";
  const findItem = filterArr.value.find((i) => i.key === data.key);
  findItem.value = item.label;
  // tabListSum();
};
const dialogData = reactive({
  left: [
    {
      label: "事项名称",
      key: "thingName",
      value: "",
    },
    {
      label: "重要程度",
      key: "important",
      value: "",
      type: "important",
    },
    {
      label: "任务层级",
      key: "workImp",
      value: "",
    },
    {
      label: "事项详情",
      key: "workProcess",
      value: "",
    },
  ],
  right: [
    {
      label: "牵头责任科室",
      key: "unit",
      value: "",
    },
    {
      label: "责任人",
      key: "unitUser",
      value: "",
    },
    {
      label: "责任领导",
      key: "unitLeader",
      value: "",
    },
    {
      label: "完成状态",
      key: "status",
      value: "",
      type: "status",
    },
    {
      label: "计划完成时间",
      key: "planTime",
      value: "",
      type: "time",
    },
  ],
});

const leftChange = (data) => {
  rightTabKey.value = "";
  if (data.label !== "全部") leftTabKey = "important";
  else leftTabKey = "";
  // leftTabKey = "important";
  leftActive.value = data.id;
  filterArr.value[0].value = data.label;
};

const play = () => {
  showType.value = showType.value === "but" ? "topDialog" : "but";
};

const rowClick = (data) => {
  dialogData.left.forEach((i) => {
    i.value = data[i.key] || "";
  });
  dialogData.right.forEach((i) => {
    i.value = data[i.key] || "";
  });
  dialogShow.value = true;
};

tabListSum();
function tabListSum() {
  // if (leftTabKey !== "important") {
  leftData.value.forEach((i) => (i.num = 0));
  (freedData || []).forEach((i) => {
    const item = leftData.value.find((b) => b.label.includes(i.important));
    if (item) {
      leftData.value[0].num = leftData.value[0].num
        ? leftData.value[0].num + 1
        : 1;
      item.num = item.num ? item.num + 1 : 1;
    }
  });
  // }
}

onMounted(() => {
  document.title = "广西分行金融科技部重点工作推进细项表";
});
</script>

<style lang="scss" scoped>
.button-ab {
  position: absolute;
  top: 30px;
  left: 20px;
  display: flex;
  align-items: center;
  .close-dom-but {
    margin-right: 20px;
  }
  .play {
    font-size: 20px;
  }
}

.work-list-contrain {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  padding: 30px 20px;
  background: rgb(206, 223, 243);
  .title {
    width: 100%;
    text-align: center;
    font-size: 32px;
    color: #000;
    margin-bottom: 30px;
  }
  .but {
    flex: 1;
    display: flex;
    justify-content: space-between;
    // background-color: #fff;
    overflow: hidden;
  }
  .top-dialog {
    flex: 1;
    overflow: hidden;
  }
}
</style>
