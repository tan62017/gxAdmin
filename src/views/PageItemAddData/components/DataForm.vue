<template>
  <div class="data-form">
    <form action=""></form>
    <el-form
      :model="form"
      label-width="auto"
      @submit="onSubmit"
      style="max-width: 600px"
    >
      <el-form-item label="表明">
        <el-select v-model="form.region" placeholder="请选择表名">
          <el-option label="广西主要业务指标" value="shanghai" />
          <el-option label="二级行数据" value="beijing" />
        </el-select>
      </el-form-item>
      <el-form-item label="日期">
        <el-col :span="11">
          <el-date-picker
            v-model="form.date1"
            type="date"
            placeholder="请选择日期"
            style="width: 100%"
          />
        </el-col>
      </el-form-item>
      <el-form-item label="内容">
        <el-input
          v-model="form.textarea"
          maxlength="300"
          style="width: 100%"
          placeholder="请输入内容"
          show-word-limit
          rows="5"
          type="textarea"
        />
      </el-form-item>
      <el-form-item label="附件">
        <el-upload
          v-model:file-list="fileList"
          class="upload-demo"
          action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
          multiple
          :on-preview="handlePreview"
          :on-remove="handleRemove"
          :before-remove="beforeRemove"
          :limit="3"
          :on-exceed="handleExceed"
        >
          <el-button type="primary">点击上传附件</el-button>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts" setup>
import { reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import type { UploadProps, UploadUserFile } from "element-plus";
import { useRouter } from "vue-router";

const router = useRouter();

const fileList = ref<UploadUserFile[]>([]);

const handleRemove: UploadProps["onRemove"] = (file, uploadFiles) => {
  console.log(file, uploadFiles);
};

const handlePreview: UploadProps["onPreview"] = (uploadFile) => {
  console.log(uploadFile);
};

const handleExceed: UploadProps["onExceed"] = (files, uploadFiles) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + uploadFiles.length
    } totally`
  );
};

const beforeRemove: UploadProps["beforeRemove"] = (uploadFile, uploadFiles) => {
  return ElMessageBox.confirm(
    `Cancel the transfer of ${uploadFile.name} ?`
  ).then(
    () => true,
    () => false
  );
};

// do not use same name with ref
const form = reactive({
  name: "",
  region: "",
  date1: "",
  textarea: "",
  delivery: false,
  type: [],
  resource: "",
  desc: "",
});

const onSubmit = () => {
  console.log("submit!");
};
const cancel = () => {
  router.go(-1);
};
</script>

<style lang="scss">
.data-form {
  margin-top: 30px;
  //   color: transparent;
  .el-form {
    --el-form-label-font-size: 20px !important;
    --el-fill-color-blank: rgb(216, 229, 246) !important;
    --el-text-color-placeholder: rgb(157, 159, 160) !important;
    .el-form-item {
      margin: 30px 0;
    }
  }
}
</style>
