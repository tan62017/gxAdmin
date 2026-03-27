<template>
  <div class="table-dom-main">
    <div class="t-thead th">
      <div
        class="tr thead-tr"
        :style="{
          width: i.width ?? '',
          flex: i.width ? '' : 1,
          textAlign: i.headerAlign,
          justifyContent: i.headerAlign ?? 'left',
        }"
        v-for="i in columns"
        :key="i.prop"
      >
        <span class="label" @click="clickSortLabel(i, $event)">{{
          i.label
        }}</span>
        <span
          class="sort-box"
          @click="clickSort(i.prop, $event)"
          v-if="i.sort && !noSort"
        >
          <i class="ascending"></i>
          <i class="descending"></i>
        </span>
      </div>
    </div>
    <div class="t-tbody">
      <div
        class="th tbody-th"
        v-for="(i, index) in data"
        :key="i.id"
        @click="clickRow(i, index)"
      >
        <div
          class="tr tbody-tr"
          v-for="col in columns"
          :key="col.prop"
          :style="{
            width: col.width ?? '',
            flex: col.width ? '' : 1,
            textAlign: col.alignText,
          }"
          @click="
            clickCol({ row: i, value: i[col.prop], index: index, col: col })
          "
        >
          <slot
            :name="col.prop"
            :data="{ row: i, value: i[col.prop], index: index }"
          >
            <template v-if="col.type === 'index'">
              <div class="type-index">{{ index + 1 }}</div>
            </template>
            <template v-else>
              <div class="t-body-column">{{ i[col.prop] }}</div>
            </template>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch } from "vue";

const props = defineProps({
  data: {
    type: Array,
    default: () => [],
  },
  columns: {
    type: Array,
    default: () => [],
  },
  page: {
    type: Object,
    default: () => {
      return {};
    },
  },
  loading: {
    type: Boolean,
    default: false,
  },
  autoScroll: {
    type: Boolean,
    default: false,
  },
  noSort: {
    type: Boolean,
    default: false,
  },
});

let freedData = [];

const sortObj = {
  type: "",
  prop: "",
};

const emits = defineEmits([
  "update:page",
  "rowClick",
  "cellDbClick",
  "sortFun",
]);

let activeTr = null;
let activeSort = null;

const clickRow = (data) => {
  // console.log(data, "row");
  emits("rowClick", data);
};
const clickCol = (data) => {
  emits("cellDbClick", data);
};

const clickSortLabel = (data, event) => {
  const eles = event.target.parentElement.childNodes;
  if (data.sort) {
    let dom = null;
    eles.forEach((d) => {
      if (d.className?.includes("sort-box")) dom = d;
    });
    if (dom) {
      // sortObj.prop = data.prop;
      if (!sortObj.type) {
        clickSort(data.prop, { target: dom.firstChild });
      } else if (sortObj.type === "ascending") {
        clickSort(data.prop, { target: dom.lastChild });
      } else if (sortObj.type === "descending") {
        clickSort(data.prop, { target: dom.lastChild });
      }
    }
    // const dom = event.target.parentElement.childNodes.find((i) =>
    //   i.className.includes("sort-box")
    // );
  }
};

const clickSort = (key, event) => {
  activeSort && activeSort.classList.remove("active-sort");
  activeTr && activeTr.classList.remove("active-tr");
  activeSort = event.target;
  sortObj.prop = key;

  const className = activeSort.className;
  if (["ascending", "descending"].includes(className)) {
    activeTr = activeSort.parentElement.parentElement;
    activeTr.classList.add("active-tr");
    activeSort.classList.add("active-sort");
    if (sortObj.type === className) {
      sortObj.type = null;
      activeSort && activeSort.classList.remove("active-sort");
      activeTr && activeTr.classList.remove("active-tr");
    } else {
      sortObj.type = className;
    }
    emits("sortFun", sortObj);
  }
};

watch(
  () => props.data,
  (val) => (freedData = val),
  {
    immediate: true,
  }
);
</script>

<style lang="scss" scoped>
.table-dom-main {
  --active-color: blue;
  display: flex;
  flex-direction: column;
  height: 100%;
  // background-color: bisque;
  overflow-x: auto;
  .th {
    display: flex;
    align-items: center;
    // padding: 0 20px;
  }
  .tr {
    padding: 0 4px;
  }
  .t-thead {
    padding: 32px 20px;
    background-color: rgb(220, 233, 250);
    border-radius: 8px;
    color: #000;
    // box-shadow: -6px -2px 16px -6px rgba(179, 179, 180, 0.26);
    box-shadow: 0px 1px 5px #d0d0d0;
    .active-tr {
      color: var(--active-color);
    }
    .thead-tr {
      display: flex;
      align-items: center;
      justify-content: center;

      font-size: 20px;
      .label {
        cursor: pointer;
      }
      .sort-box {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: center;
        margin-left: 8px;
        cursor: pointer;
        i {
          display: inline-block;
          border: 8px solid #bbb;
        }
        .active-sort {
          border-color: var(--active-color);
        }
        .ascending {
          margin-bottom: 4px;
          border-top-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
        }
        .descending {
          border-bottom-color: transparent;
          border-left-color: transparent;
          border-right-color: transparent;
        }
      }
    }
  }
  .t-tbody {
    flex: 1;
    overflow: auto;
    margin-top: 16px;
    padding: 0px 20px;
    padding-bottom: 20px;
    font-size: 16px;
    // transition: all 20ms;
    .th {
      border-bottom: 1px solid #bbb;
    }

    &::-webkit-scrollbar {
      /*滚动条整体样式*/
      width: 2px;
      /*高宽分别对应横竖滚动条的尺寸*/
      height: 2px;
      /* scrollbar-arrow-color:red; */
    }

    & ::-webkit-scrollbar-thumb {
      /*滚动条里面小方块*/
      border-radius: 2px;
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
      background: #01ccf5a3;
    }

    &::-webkit-scrollbar-track {
      /*滚动条里面轨道*/
      box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
      border-radius: 2px;
      background: #ecedee;
    }
  }
  .tbody-tr {
    padding: 30px 0;
    cursor: pointer;
  }
}
</style>
