<template>
  <div class="dialog-box">
    <div class="close" @click="close">X</div>
    <main>
      <div class="left">
        <div class="left-item item" v-for="i in data.left" :key="i.label">
          <div class="label">{{ i.label }}</div>
          <div
            class="value"
            :class="{
              'value-important': i.type === 'important',
              'imp-fast': i.value === '重要且紧急',
              'imp-slow': i.value === '重要且不紧急',
            }"
            v-html="i.value"
          ></div>
        </div>
      </div>
      <div class="right">
        <div class="right-item item" v-for="i in data.right" :key="i.label">
          <div class="label">
            <i class="icon" v-if="i.type === 'time'"></i> {{ i.label }}
          </div>
          <div class="value">
            <div v-if="i.type === 'status'">
              <span
                :class="{
                  status: true,
                  'status-over': i.value.includes('已完成'),
                  'status-no':
                    i.value.includes('距完成') || i.value.includes('未完成'),
                }"
              >
                {{ i.value }}</span
              >
            </div>
            <div v-else-if="i.type === 'time'">{{ i.value }}</div>
            <div class="value-in" v-else><i></i>{{ i.value }}</div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
const props = defineProps({
  data: {
    type: Object,
    default: () => {
      return {
        left: [],
        right: [],
      };
    },
  },
  modelValue: {
    type: Boolean,
    default: false,
  },
});

const emits = defineEmits(["update:modelValue"]);
const close = () => {
  emits("update:modelValue", false);
};
</script>

<style lang="scss" scoped>
.dialog-box {
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  background-color: #00000026;
  .close {
    position: absolute;
    top: 50px;
    right: 50px;
    width: 50px;
    height: 50px;
    font-size: 50px;
    color: #fff;
    cursor: pointer;
  }
  main {
    display: flex;
    .item {
      font-size: 16px;
      line-height: 20px;
      margin-bottom: 30px;
      letter-spacing: 3px;
    }
    .left {
      width: 1200px;
      max-height: 800px;
      min-height: 600px;
      overflow: auto;
      padding: 30px;
      border-radius: 10px;
      background-color: rgb(220, 233, 250);
      .left-item {
        display: flex;

        .value-important {
          //   flex: 0;/
          margin-top: -4px;
          border-radius: 8px;
          padding: 4px 10px;
          //   color: #ee6666;
          //   background-color: rgb(205, 198, 217);
        }
        .imp-fast {
          color: #ee6666;
          background-color: rgb(205, 198, 217);
        }
        .imp-slow {
          color: rgb(42, 166, 146);
          background-color: rgb(187, 216, 230);
        }
        .value {
          //   white-space: wrap;
          max-width: calc(100% - 120px);
          //   flex: 1;
        }
      }
    }
    .right {
      width: 300px;
      max-height: 800px;
      margin-left: 24px;
      overflow: auto;
      padding: 30px;
      border-radius: 10px;
      background-color: rgb(220, 233, 250);
      .right-item {
        .label {
          display: flex;
          align-items: center;
          margin-bottom: 20px;
          .icon {
            display: inline-block;
            width: 20px;
            height: 20px;
            margin-right: 8px;
            background: url(../images/time.png) no-repeat;
            background-size: 100% 100%;
          }
        }
        .value {
          div {
            display: flex;
            align-items: center;
          }
          .status {
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
          i {
            display: inline-block;
            width: 6px;
            height: 6px;
            margin-right: 8px;
            border-radius: 50%;
            background-color: #000;
          }
        }
      }
    }
    .label {
      color: #666;
      //   width: 100px;
      margin-right: 30px;
    }
    // align-items: center;
  }
}
</style>
