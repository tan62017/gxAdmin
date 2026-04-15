<script setup>
import Top from './components/Top.vue';
import Permissions from './components/Permissions.vue';
import UserEdit from './components/UserEdit.vue';
import DelectAll from './components/DelectAll.vue';

const dialogTitle = ref('批量删除');

const dialogType = ref('delectAll');

const dialogMap = {
  edit: {
    title: '编辑角色',
    width: '40%',
    top: '30vh',
    component: UserEdit,
  },
  permissions: {
    title: '角色权限',
    width: '75%',
    top: '5vh',
    component: Permissions,
  },
  delectAll: {
    title: '批量删除',
    width: '40%',
    top: '40vh',
    component: DelectAll,
  },
};

const dialogOptions = computed(() => {
  return dialogMap[dialogType.value];
});
const dialogProps = ref(null);
const colunms = [
  {
    id: 1,
    label: '用户名',
    // width: 50,
    prop: 'name',
    // type: "index",
    // fixed: "left",
    headerAlign: 'left',
    align: 'left',
    showOverflowTooltip: true,
  },
  {
    label: '角色',
    // width: 50,
    prop: 'role',
    // type: "index",
    // fixed: "left",
    headerAlign: 'center',
    align: 'center',
    showOverflowTooltip: true,
  },
  {
    label: '部门',
    // width: 50,
    prop: 'department',
    // type: "index",
    // fixed: "left",
    headerAlign: 'center',
    align: 'center',
    showOverflowTooltip: true,
  },
  {
    label: '状态',
    // width: 50,
    prop: 'status',
    // type: "index",
    // fixed: "left",
    headerAlign: 'center',
    align: 'center',
    showOverflowTooltip: true,
  },
  {
    id: 3,
    label: '创建日期',
    // width: 50,
    prop: 'time',
    // type: "index",
    // fixed: "left",
    headerAlign: 'center',
    align: 'center',
    showOverflowTooltip: true,
  },
];

const tableData = [
  {
    time: '2016-05-03',
    name: 'admin',
    permissions: [],
    bigVis: [],
    department: '技术部',
    role: '超级管理员',
    status: true,
  },
  {
    time: '2016-05-03',
    name: '黄嘉民',
    permissions: [],
    bigVis: [],
    department: '技术部',
    role: '管理员',
    status: true,
  },
  {
    time: '2016-05-03',
    name: '张三',
    permissions: [],
    bigVis: [],
    department: '技术部',
    role: '系统补录员',
    status: true,
  },
  {
    time: '2016-05-03',
    name: '李四',
    permissions: [],
    bigVis: [],
    department: '技术部',
    role: '系统补录员',
    status: false,
  },
  {
    time: '2016-05-03',
    name: '赵五',
    permissions: [],
    bigVis: [],
    department: '技术部',
    role: '管理员',
    status: false,
  },
  {
    time: '2016-05-03',
    name: '熊大',
    permissions: [],
    bigVis: [],
    department: '技术部',
    role: '数据管理',
    status: true,
  },
  {
    time: '2016-05-03',
    name: '熊二',
    permissions: [],
    bigVis: [],
    department: '技术部',
    role: '系统补录员',
    status: true,
  },
  {
    time: '2016-05-03',
    name: '黑一',
    permissions: [],
    bigVis: [],
    department: '技术部',
    role: '数据管理',
    status: true,
  },
  {
    time: '2016-05-03',
    name: '阿大',
    permissions: [],
    bigVis: [],
    department: '技术部',
    role: '管理员',
    status: true,
  },
  {
    time: '2016-05-03',
    name: '小熊',
    permissions: [],
    bigVis: [],
    department: '技术部',
    role: '系统补录员',
    status: true,
  },
  {
    time: '2016-05-03',
    name: '雄安',
    permissions: [],
    bigVis: [],
    department: '技术部',
    role: '系统补录员',
    status: true,
  },
  {
    time: '2016-05-03',
    name: '天一',
    permissions: [],
    bigVis: [],
    department: '技术部',
    role: '管理员',
    status: false,
  },
  {
    time: '2016-05-03',
    name: '地煞',
    permissions: [],
    bigVis: [],
    department: '技术部',
    role: '数据管理',
    status: false,
  },
  {
    time: '2016-05-03',
    name: '阿飞',
    permissions: [],
    bigVis: [],
    department: '技术部',
    role: '系统补录员',
    status: false,
  },
];
const pages = ref({
  total: 10,
  currentPage: 1,
  pageSize: 10,
});
const dialogShow = ref(false);
const delectAll = (arr) => {
  dialogShow.value = true;
  dialogType.value = 'delectAll';
  dialogProps.value = arr;
};
const delectOne = (row) => {};
const actionClick = (type, row) => {
  dialogType.value = type;
  dialogProps.value = row || null;
  if (type === 'edit') {
    if (row) {
      dialogMap.edit.title = '编辑角色';
    } else {
      dialogMap.edit.title = '创建角色';
      dialogProps.value = {
        name: '',
        department: '',
        status: true,
      };
    }
  }
  dialogShow.value = true;
};

const closeDialog = () => {
  dialogShow.value = false;
};
</script>

<template>
  <Content>
    <Top @create="actionClick('edit')"></Top>
    <BaseTable
      class="table-list-box mt30px w-full overflow-hidden"
      showSelection
      :showPage="true"
      v-model:pages="pages"
      :columns="colunms"
      :data="tableData"
      @delectAll="delectAll"
    >
      <template #status="{ row }">
        <el-tag :type="row.status ? 'success' : 'danger'">
          {{ row.status ? '启用' : '禁用' }}
        </el-tag>
      </template>
      <template #action="{ row }">
        <div class="flex items-center">
          <div class="edit cursor-pointer" @click="actionClick('permissions', row)">权限</div>
          <div class="edit mx-10px cursor-pointer" @click="actionClick('edit', row)">编辑</div>
          <MyTip targetElement=".table-list-box" @delect="delectOne(row)"> </MyTip>
        </div>
      </template>
    </BaseTable>
    <DialogContent
      v-model="dialogShow"
      :title="dialogOptions.title"
      :width="dialogOptions.width"
      :top="dialogOptions.top"
      :showBtns="false"
    >
      <component
        :is="dialogOptions.component"
        v-model:data="dialogProps"
        :closeFun="closeDialog"
      ></component>
    </DialogContent>
  </Content>
</template>

<style lang="scss" scoped>
.nav-content {
  display: flex;
  // height: 880px;
  height: 100%;
  height: calc(100% - 64px);
  overflow: hidden;
  margin-top: 20px;

  border-radius: var(--border-radius-num);

  ::-webkit-scrollbar {
    width: 0px;
    height: 0px;
  }

  ::-webkit-scrollbar-thumb {
    border-radius: 1px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #a7a8a800;
  }

  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.1);
    border-radius: 0px;
    background: #adadad00;
  }
}
</style>
