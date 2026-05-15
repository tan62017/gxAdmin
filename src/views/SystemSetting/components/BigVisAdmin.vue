<template>
  <div class="big-vis-admin-contrain w-full h-full overflow-hidden flex flex-col">
    <div class="nav-box w-full mb16px flex justify-between items-center">
      <div class="nav-box-title font-size-21px font-bold">大屏系统管理</div>
      <div class="nav-box-btns">
        <el-button type="primary" @click="addBigVis">添加大屏</el-button>
        <el-button type="warning" @click="deleteAll">批量删除</el-button>
        <el-button @click="delectCancel" v-show="isCheckedAll">取消删除</el-button>
      </div>
    </div>
    <div class="big-vis-list flex-1 overflow-auto">
      <div
        class="big-vis-item flex h-300px p-20px mx16px my12px border-rd-8px"
        v-for="item in infoPagesList"
        :key="item.label"
      >
        <div class="img w-38% h250px border-rd-8px overflow-hidden">
          <el-image
            ref="imageRef"
            style="width: 100%; height: 100%"
            :src="item.img"
            show-progress
            :preview-src-list="[item.img]"
            fit="cover"
          />
          <!-- <img style="width: 100%; height: 100%" :src="item.icon" alt="" srcset="" /> -->
        </div>
        <div class="item-content flex-1 h-full pl-20px py-12px flex flex-col justify-between">
          <div class="item-content-msg">
            <div class="item-content-msg-title font-size-20px font-bold mb-18px">
              {{ item.name }}
            </div>
            <div class="item-content-msg-content">简介：{{ item.content || '--' }}</div>
            <div class="item-content-msg-content">
              分类：{{ item.typesLine.join('、') || '--' }}
            </div>
            <div class="item-content-msg-content">机构：{{ item.unit || '--' }}</div>
            <div class="item-content-msg-content">
              开放：<el-tag :type="item.is_show ? 'success' : 'danger'">
                <div class="font-size-18px">{{ item.is_show ? '✔' : '×' }}</div>
              </el-tag>
            </div>
          </div>
          <div class="item-content-btns">
            <el-button plain type="primary" @click="editBigVis(item)">编辑</el-button>
            <MyTip targetElement=".big-vis-list" @delect="delectOne(item)">
              <el-button plain type="warning">删除</el-button>
            </MyTip>
            <el-button v-show="isCheckedAll">
              <el-checkbox v-model="item.checked" :label="item.checked ? '已选' : '选择'" />
            </el-button>
          </div>
        </div>
      </div>
    </div>
    <el-drawer v-model="drawer" direction="rtl" :title="dialogTitle" resizable @close="drawerClose">
      <MyForm
        ref="myFormRef"
        :rules="rules"
        :btns="formBtns"
        v-model="formData"
        :label-width="$pxToRem(150)"
        :inline="false"
        :options="bigVisOptions"
        :key="Number(drawer)"
      ></MyForm>
    </el-drawer>
  </div>
</template>

<script setup>
// import { navList } from '@/config';
import { bigVisOptions } from '../config';
import { urlRegex, ipv4Regex, ipv6Regex } from '@/config/regex';
import { WarningFilled } from '@element-plus/icons-vue';
import { cloneDeep, isBoolean } from 'lodash-es';
import { usePagesStore } from '@/stores';
import { pageEdit, pageAdd } from '@/api/pages';
import { ElMessage } from 'element-plus';
const pagesStore = usePagesStore();
const isCheckedAll = ref(false);
pagesStore.getPagesList();

const navList = toRef(pagesStore, 'navList');
const infoPagesList = toRef(pagesStore, 'infoPagesList');
const drawer = ref(false);

const myFormRef = ref(null);

const dialogTitle = ref('添加大屏');
const targetElement = ref('');
const tipRef = ref(null);

const freedForm = {};

const formData = ref({
  name: '',
  location: '',
  is_show: true,
  type: null,
  imgs: [],
  unit: null,
  intro: '',
});
const rules = {
  label: [
    { required: true, message: '请输入大屏名称', trigger: 'blur' },
    { min: 2, max: 99, message: '名字长度为2~99个文字', trigger: 'blur' },
  ],
  location: [{ required: true, validator: validateIp, trigger: 'blur' }],
  typesLine: [
    {
      required: true,
      message: '请选择大屏分类',
      trigger: 'change',
    },
  ],
  unit: [
    {
      required: true,
      message: '请选择大屏分类',
      trigger: 'change',
    },
  ],
};

const formBtns = [
  {
    label: '提交',
    type: 'primary',
    plain: true,
    fun: async (formEl) => {
      if (!formEl) return;
      await formEl.validate((valid, fields) => {
        if (valid) {
          formData.value.is_show = formData.value.is_show ? 1 : 0;
          // formData.value.img = '';
          if (dialogTitle.value === '添加大屏') {
            // 添加逻辑
            console.log('添加大屏:', formData.value);
            const formDataInfo = updateFormData();
            pageAdd(formDataInfo).then(() => {
              pagesStore.getPagesList();
              drawer.value = false;
              ElMessage.success('添加成功');
            });
          } else {
            // 编辑逻辑
            console.log('编辑大屏:', formData.value);
            const formDataInfo = updateFormData();
            pageEdit(formData.value.id, formDataInfo).then(() => {
              pagesStore.getPagesList();
              drawer.value = false;
              ElMessage.success('修改成功');
            });
          }
          console.log('submit!');
        } else {
          console.log('error submit!', fields);
        }
      });
    },
  },
  {
    label: '重置',
    type: '',
    plain: false,
    fun: (formEl) => {
      if (!formEl) return;
      formEl.resetFields();
    },
  },
  {
    label: '取消',
    type: 'warning',
    plain: false,
    fun: (formEl) => {
      drawer.value = false;
      formEl?.resetFields();
    },
  },
];

function updateFormData() {
  //判断imgs是否是上传的文件，如果是使用new FormData重新构造数据，否则直接使用原数据

  const formDataInfo = new FormData();
  Object.keys(formData.value).forEach((k) => {
    if (k === 'imgs' && formData.value.imgs.length > 0 && formData.value.imgs[0].raw) {
      formData.value[k]?.forEach((file) => {
        formDataInfo.append('imgFile', file.raw);
      });
    } else {
      const currentValue =
        typeof formData.value[k] === 'boolean'
          ? formData.value[k]
            ? 1
            : 0
          : typeof formData.value[k] === 'object'
          ? JSON.stringify(formData.value[k])
          : formData.value[k];
      formDataInfo.append(k, currentValue);
    }
  });
  return formDataInfo;

  if (
    Array.isArray(formData.value.imgs) &&
    formData.value.imgs.length > 0 &&
    formData.value.imgs[0].raw
  ) {
  } else {
    return formData.value;
  }
}

const delectOne = (item) => {
  closeAllTips();
};
const delectOneCancel = () => {
  closeAllTips();
};

function closeAllTips() {
  if (tipRef.value) {
    tipRef.value.forEach((item) => {
      item.hide();
    });
  }
}

// 自定义校验函数：同时支持 IPv4 和 IPv6
function validateIp(rule, value, callback) {
  if (!value) {
    callback(new Error('请输入IP地址'));
  } else if (urlRegex.test(value) || ipv4Regex.test(value) || ipv6Regex.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的IPv4或IPv6地址'));
  }
}

const addBigVis = () => {
  Object.keys(formData.value).forEach((k) => {
    if (Array.isArray(formData.value[k])) {
      formData.value[k] = [];
    } else if (isBoolean(formData.value[k])) {
      formData.value[k] = false;
    } else {
      formData.value[k] = null;
    }
    freedForm[k] = formData.value[k];
  });
  drawer.value = true;
  // formData.value = {};
  dialogTitle.value = '添加大屏';
};

const editBigVis = (item) => {
  formData.value = cloneDeep(item);
  const arr = item?.img.split('/') || [];
  const imgName = arr?.[arr?.length - 1];
  formData.value.is_show = Boolean(item.is_show);
  formData.value.imgs = [{ name: imgName, url: item?.img }];
  drawer.value = true;

  dialogTitle.value = '编辑大屏';
};

const drawerClose = () => {
  myFormRef.value?.formRef?.resetFields();
};
const deleteAll = () => {
  if (isCheckedAll.value) {
    isCheckedAll.value = false;
    infoPagesList.value = infoPagesList.value.map((item) => {
      item.checked = false;
      return item;
    });
  } else {
    isCheckedAll.value = true;
  }
  [0].list;
};
const delectCancel = () => {
  isCheckedAll.value = false;
  infoPagesList.value = infoPagesList.value.map((item) => {
    item.checked = false;
    return item;
  });
};

onMounted(() => {
  targetElement.value = '.big-vis-list';
});
</script>

<style lang="scss" scoped>
.big-vis-list {
  position: relative;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(650px, 1fr));
  // grid-template-rows: 300px 300px 300px;
  grid-auto-flow: row;
  //   gap: 20px;
  //   overflow: hidden;
  .big-vis-item {
    align-items: center;
    box-shadow: 0px 1px 5px rgba(161, 161, 161, 0.516);
    &:hover {
      //   padding: 12px;
      box-shadow: 0px 1px 5px rgba(40, 40, 211, 0.685);
    }
  }
  .item-content-msg-content {
    margin: 4px 0;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3; /* 限制行数为2 */
    overflow: hidden;
  }
}
.tip-content {
  font-size: 14px !important;
}
</style>
