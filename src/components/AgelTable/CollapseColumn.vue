<script setup>
import { CaretBottom, CaretTop } from '@element-plus/icons-vue'
import { getParentByClassName } from './utils'

const collapse = ref(false)
const columnRef = ref()

watch(collapse, () => {
  const warp = getParentByClassName(columnRef.value.$el, 'el-table__inner-wrapper')
  const tbdoy = warp.querySelector('.el-table__body-wrapper')
  tbdoy.style.display = collapse.value ? 'none' : ''
})
</script>

<template>
  <el-table-column ref="columnRef" width="55px" align="center">
    <template #header>
      <el-icon class="collapse-icon" @click="collapse = !collapse">
        <CaretBottom v-show="!collapse" />
        <CaretTop v-show="collapse" />
      </el-icon>
    </template>
  </el-table-column>
</template>

<style scoped>
/* 定位，不撑内容 */
.collapse-icon {
  color: #00d4ff;
  font-size: 28px;
  font-weight: 700;
  cursor: pointer;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
</style>
