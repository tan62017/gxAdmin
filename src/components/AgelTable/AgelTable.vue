<!-- 共用 agel-table -->
<script setup>
import { ElTableColumn } from 'element-plus'
import { getExcludeAttrs, getFlatArray } from './utils'
import useAutoMerge from './autoMerge'
import useAutoScroll from './autoScroll'
import CollapseColumn from './CollapseColumn.vue'
import { useEntStore } from '@/stores'

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  columns: {
    type: Array,
    default: () => []
  },
  page: Object,
  // 合并
  merge: Object,
  loading: {
    type: Boolean,
    default: undefined
  },
  // 请求
  request: Function,
  // 自动滚动
  autoScroll: Boolean,
  // ui 风格，有需要其他样式添加对应class
  uiClass: {
    type: String,
    default: 'table-default-ui'
  },
  // 是否显示折叠列
  collapse: Boolean,
  openEntDetail: Boolean,
  entCodeKey: {
    type: String,
    default: 'creditCode'
  },
  sortType: {
    type: Object
  },
  maxHeight: {
    type: String
  }
})

const emits = defineEmits(['update:page', 'rowClick', 'cellDbClick'])

const entStore = useEntStore()

defineOptions({
  name: 'AgelTable',
  inheritAttrs: false
})

const elTable = ref(null)
// const ElTableConfig = useCrxGlobalConfig().AgelTable?.ElTable || {}
// const ElPaginationConfig = useCrxGlobalConfig().AgelTable?.ElPagination || {}

const showPagination = computed(() => {
  if (!props.page) return false
  const { currentPage, pageSize, total, pageCount } = props.page
  return (
    typeof currentPage == 'number' &&
    typeof pageSize == 'number' &&
    (typeof total == 'number' || typeof pageCount == 'number')
  )
})

const defaultSort = computed(() => {
  if (!props.page) return
  return {
    prop: props.page.sortProp,
    order: props.page.sortOrder
  }
})

const spanMethod = props.merge ? useAutoMerge(props) : undefined

const _slots = useSlots()

const AgelTableColumns = ({ columns }) => {
  return columns
    .filter(v => v.hidden !== true)
    .map((column, key) => {
      column.align ||= 'center'
      const extendPropKeys = ['hidden', 'children', 'slot']
      const columnProps = getExcludeAttrs(extendPropKeys, column)
      const columnlots = {}
      if (typeof column.label === 'function') {
        columnlots.header = column.label
        columnProps.label = ''
      }
      if (column.children && column.children.length > 0) {
        columnlots.default = () => h(AgelTableColumns, { columns: column.children })
      } else if (typeof column.slot === 'function') {
        columnlots.default = column.slot
      } else if (typeof column.slot === 'string' && _slots[column.slot]) {
        columnlots.default = _slots[column.slot]
      } else if (_slots[column.prop]) {
        columnlots.default = scope =>
          _slots[column.prop]({
            ...scope,
            cellValue: scope.row[scope.column.property]
          })
      }
      if (column.type === 'rank') {
        columnlots.default = scope => {
          const { $index } = scope
          return h('div', { class: `rank${$index}` }, $index < 3 ? undefined : $index)
        }
      }

      return h(ElTableColumn, columnProps, columnlots)
    })
}

function currentPageChange(val) {
  emits('update:page', { ...props.page, currentPage: val })
  props.request?.()
}

function pageSizeChange(val) {
  emits('update:page', { ...props.page, currentPage: 1, pageSize: val })
  props.request?.()
}

function sortChange({ column, prop, order }) {
  if (column.sortable === 'custom') {
    console.log(column, prop, order)
    let sortOrder
    order === 'descending' ? (sortOrder = 1) : order === 'ascending' ? (sortOrder = 0) : (sortOrder = order)
    emits('update:page', {
      ...props.page,
      currentPage: 1,
      sortProp: props.sortType[prop],
      sortOrder
    })
    props.request?.()
  }
}

function getRef() {
  return elTable.value
}

function sortTable() {
  nextTick(() => {
    if (elTable.value && props.data.length > 1) {
      const prop = defaultSort.value?.prop
      const order = defaultSort.value?.order
      const sortColumn = getFlatArray(props.columns).find(v => v.prop === prop)
      if (prop && order && typeof sortColumn?.sortable === 'boolean') elTable.value.sort(prop, order)
    }
  })
}

function rowClick(...args) {
  if (props.openEntDetail) {
    const [row] = args
    entStore.oneEntConfig.show = true
    entStore.oneEntConfig.entCode = row[props.entCodeKey]
  }
  // console.log(...args);
  emits('rowClick', ...args)
}

function cellDbClick(...args) {
  emits('cellDbClick', ...args)
}

// fix: invalid default-srot
// https://github.com/element-plus/element-plus/issues/10077
watch(() => props.data, sortTable)

onMounted(() => {
  if (props.autoScroll && elTable.value)
    useAutoScroll(elTable.value.$refs.scrollBarRef.wrapRef, elTable.value.$refs.tableWrapper)
})

defineExpose({ getRef })
</script>

<template>
  <div class="table-commom-ui" :class="[uiClass]">
    <ElTable
      ref="elTable"
      v-loading="loading"
      class="agel-table"
      :data="data"
      :span-method="spanMethod"
      :default-sort="defaultSort"
      v-bind="{ ...$attrs }"
      style="width: 100%"
      :max-height="maxHeight"
      @sortChange="sortChange"
      @row-click="rowClick"
      @cell-dblclick="cellDbClick"
    >
      <slot name="prepend"></slot>
      <slot>
        <AgelTableColumns :columns="columns"></AgelTableColumns>
        <CollapseColumn v-if="collapse"></CollapseColumn>
      </slot>
      <slot name="append"></slot>
      <template #empty>
        <slot name="empty"> </slot>
      </template>
      <template #append>
        <slot name="append-row"></slot>
      </template>
    </ElTable>
    <ElPagination
      v-if="showPagination"
      layout="total,prev, pager, next, sizes"
      :disabled="loading"
      v-bind="{ ...page }"
      background
      @update:current-page="currentPageChange"
      @update:page-size="pageSizeChange"
    >
      <template #total="scope"> 共 {{ scope.total }} 条 </template>
    </ElPagination>
  </div>
</template>

<style lang="scss">
// @import './ui.scss';

.agel-table {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  flex: 1;
  --el-fill-color-lighter: rgba(6, 69, 237, 0.04);
  thead {
    --el-table-header-bg-color: rgba(6, 69, 237, 0.1);
  }
  .el-table__header-wrapper {
    border-radius: 10px 10px 0 0;
  }
}

.agel-table .el-table__empty-block {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.agel-table + .el-pagination {
  margin-top: 10px;
}
</style>
