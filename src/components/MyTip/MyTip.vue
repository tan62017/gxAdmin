<template>
  <el-tooltip
    ref="tipRef"
    :append-to="target"
    :effect="effect"
    :trigger="trigger"
    :placement="placement"
  >
    <slot>
      <div class="delect cursor-pointer">删除</div>
    </slot>

    <template #content>
      <slot name="content" :domRef="tipRef">
        <div class="tip-content px-8px py-2px">
          <div class="tip-content-msg flex items-center font-size-12px">
            <el-icon style="color: #e6a23c" class="delect-icon mr-4px"><WarningFilled /></el-icon
            >请确认删除
          </div>
          <div class="tip-content-btns mt-10px flex justify-end">
            <el-button size="small" plain type="primary" @click="delect"
              ><span class="font-size-12px">确认</span></el-button
            >
            <el-button size="small" type="" @click="cancel"
              ><span class="font-size-12px">取消</span></el-button
            >
          </div>
        </div>
      </slot>
    </template>
  </el-tooltip>
</template>

<script setup>
import { WarningFilled } from '@element-plus/icons-vue';
const props = defineProps({
  targetElement: {
    type: String,
    default: '',
  },
  effect: {
    type: String,
    default: 'light',
  },
  trigger: {
    type: String,
    default: 'click',
  },
  placement: {
    type: String,
    default: 'top',
  },
});

const emits = defineEmits(['delect', 'cancel']);

const tipRef = ref(null);
const target = ref('');

const delect = () => {
  closeAllTips();
  emits('delect');
};

const cancel = () => {
  closeAllTips();
  emits('cancel');
};
function closeAllTips() {
  if (tipRef.value) {
    if (Array.isArray(tipRef.value)) {
      tipRef.value.forEach((item) => {
        item.hide();
      });
    } else {
      tipRef.value.hide();
    }
  }
}
onMounted(() => {
  target.value = props.targetElement || '';
});

defineExpose({
  tipRef,
});
</script>
<style lang="scss" scoped></style>
