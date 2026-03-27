<script setup>
import { VChart } from '@tonyptang/components-v-chart'
import { EchartConfig } from './config'
import { useAppStore } from '@/stores'

const props = defineProps({
  request: {
    type: Function,
    required: true
  },
  option: {
    type: Object,
    required: true
  },
  dataZoom: Boolean
})

const appStore = useAppStore()

function handleOption(option, data, merge) {
  let startValue, endValue
  if (props.dataZoom) {
    try {
      const [_startValue, _endValue] = EchartConfig.createDataZoomSlice(data.xAxis[0].data, appStore.currentYear)
      startValue = _startValue
      endValue = _endValue
    } catch (error) {
      console.error(error)
    }
  }

  return merge([
    option,
    {
      ...data,
      dataZoom: props.dataZoom
        ? [
            {
              ...EchartConfig.dataZoom,
              startValue,
              endValue
            }
          ]
        : undefined
    }
  ])
}

const option = EchartConfig.createEchartsOption(props.option)
</script>

<template>
  <VChart v-bind="$attrs" :handle-option="handleOption" :request="request" :option="option">
    <template v-for="(_, name) in $slots">
      <slot :name="name"></slot>
    </template>
  </VChart>
</template>

<style lang="scss" scoped></style>
