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
        v-for="item in navList[0].list"
        :key="item.label"
      >
        <div class="img w-38% h250px border-rd-8px overflow-hidden">
          <el-image
            ref="imageRef"
            style="width: 100%; height: 100%"
            :src="item.icon"
            show-progress
            :preview-src-list="[item.icon]"
            fit="cover"
          />
          <!-- <img style="width: 100%; height: 100%" :src="item.icon" alt="" srcset="" /> -->
        </div>
        <div class="item-content flex-1 h-full pl-20px py-12px flex flex-col justify-between">
          <div class="item-content-msg">
            <div class="item-content-msg-title font-size-20px font-bold mb-18px">
              {{ item.label }}
            </div>
            <div class="item-content-msg-content">简介：{{ item.content || '--' }}</div>
            <div class="item-content-msg-content">分类：{{ item.content || '--' }}</div>
            <div class="item-content-msg-content">机构：{{ item.content || '--' }}</div>
          </div>
          <div class="item-content-btns">
            <el-button plain type="primary" @click="editBigVis(item)">编辑</el-button>
            <el-tooltip
              ref="tipRef"
              :append-to="targetElement"
              effect="light"
              trigger="click"
              placement="top"
            >
              <el-button plain type="warning">删除</el-button>
              <template #content>
                <div class="tip-content px-8px py-2px">
                  <div class="tip-content-msg flex items-center font-size-12px">
                    <el-icon style="color: #e6a23c" class="delect-icon mr-4px"
                      ><WarningFilled /></el-icon
                    >请确认删除该大屏
                  </div>
                  <div class="tip-content-btns mt-10px flex justify-end">
                    <el-button size="small" plain type="primary" @click="delectOne(item)"
                      ><span class="font-size-12px">确认</span></el-button
                    >
                    <el-button size="small" type="" @click="delectOneCancel"
                      ><span class="font-size-12px">取消</span></el-button
                    >
                  </div>
                </div>
              </template>
            </el-tooltip>

            <el-button v-show="isCheckedAll">
              <el-checkbox v-model="item.checked" :label="item.checked ? '已选' : '选择'" />
            </el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
  <el-drawer v-model="drawer" direction="rtl" :title="dialogTitle" resizable>
    <MyForm
      :rules="rules"
      :btns="formBtns"
      v-model="formData"
      label-width="130px"
      :inline="false"
      :options="bigVisOptions"
    ></MyForm>
  </el-drawer>
</template>

<script setup>
import { navList } from '@/config';
import { bigVisOptions } from '../config';
import { ipv4Regex, ipv6Regex } from '@/config/regex';
import { WarningFilled } from '@element-plus/icons-vue';

const isCheckedAll = ref(false);

const drawer = ref(false);

const dialogTitle = ref('添加大屏');
const targetElement = ref('');
const tipRef = ref(null);

const formData = ref({
  name: '',
  location: '',
  status: true,
  type: null,
  img: [],
  unit: null,
  intro: '',
});
const rules = {
  name: [
    { required: true, message: '请输入大屏名称', trigger: 'blur' },
    { min: 2, max: 99, message: '名字长度为2~99个文字', trigger: 'blur' },
  ],
  location: [{ required: true, validator: validateIp, trigger: 'blur' }],
  type: [
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
  } else if (ipv4Regex.test(value) || ipv6Regex.test(value)) {
    callback();
  } else {
    callback(new Error('请输入正确的IPv4或IPv6地址'));
  }
}

const addBigVis = () => {
  drawer.value = true;
  dialogTitle.value = '添加大屏';
};

const editBigVis = (item) => {
  drawer.value = true;
  dialogTitle.value = '编辑大屏';
};
const deleteAll = () => {
  if (isCheckedAll.value) {
    isCheckedAll.value = false;
    navList.value = navList.value.map((item) => {
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
  navList.value[0].list = navList.value[0].list.map((item) => {
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
}
.tip-content {
  font-size: 14px !important;
}
</style>
