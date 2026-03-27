<template>
  <div class="titles-list-contrain p20px">
    <div class="list h-100% flex flex-col flex-1 flex-items-center pt-100px">
      <h3 class="font-size-36px mb-50px">主题名称设置</h3>
      <div
        class="list-item font-size-30px flex flex-items-center my-20px"
        v-for="(i, ind) in titlesList"
        :key="i.name + ind"
      >
        <div class="left w500px">{{ i.name }}</div>
        <div class="mx-30px">→</div>
        <div class="right ml-50px w500px">
          <el-input
            size="large"
            style="font-size: 1.25rem"
            v-model="titleMap[i.prop]"
            placeholder="请输入"
          />
        </div>
      </div>
      <div class="btns mt-100px">
        <el-button class="w-100px mx-20px" size="large" type="primary" @click="submit"
          >修改</el-button
        >
        <el-button class="w-100px mx-20px" size="large" type="default" @click="cancel"
          >取消</el-button
        >
        <!-- <el-button type="primary">修改</el-button> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import { titlesList } from './config';
const router = useRouter();

const titleMap = reactive({
  title: '',
  hzrbTitle: '',
  hzrbejhTitle: '',
  shsjTitle: '',
  qjrjgTitle: '',
});

const submit = () => {
  console.log(titleMap);
};
const cancel = () => {
  router.go(-1);
};
</script>

<style lang="scss" scoped>
.list-item {
  .left {
    color: rgb(112, 111, 111);
    cursor: not-allowed;
  }
}
</style>
