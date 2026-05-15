export const systemLouy = [
  {
    id: 1,
    name: '主题名称改修',
    icon: '',
    path: '/system-setting-titles-edit',
  },
];

export const bigVisOptions = [
  {
    label: '大屏：',
    key: 'name',
    type: 'input',
    width: '100%',
    placeholder: '请输入大屏名称',
  },
  {
    label: '地址：',
    key: 'location',
    type: 'textarea',
    height: 'auto',
    width: '100%',
    placeholder: '请输入大屏访问地址',
  },
  {
    label: '状态：',
    key: 'is_show',
    type: 'switch',
    placeholder: '',
  },
  {
    label: '分类：',
    key: 'typesLine',
    type: 'select',
    width: '100%',
    multiple: true,
    placeholder: '请选择分类',
    options: [
      {
        label: '对公条线-机构业务',
        value: '对公条线-机构业务',
      },
      {
        label: '对公条线-公司业务',
        value: '对公条线-公司业务',
      },
      {
        label: '综合管理',
        value: '综合管理',
      },
      {
        label: '零售条线',
        value: '零售条线',
      },
    ],
  },
  {
    label: '缩略图：',
    key: 'imgs',
    type: 'upload',
    placeholder: '',
    height: '140px',
    width: '100%',
  },
  {
    label: '所属机构：',
    key: 'unit',
    type: 'select',
    width: '100%',
    placeholder: '请选择机构',
    options: [
      {
        label: '数据部',
        value: 1,
      },
      {
        label: '金融科技部',
        value: 2,
      },
    ],
  },
  {
    label: '简介：',
    key: 'content',
    type: 'textarea',
    placeholder: '请输入大屏介绍',
    height: 'auto',
    width: '100%',
  },
];
